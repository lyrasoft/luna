<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Access;

use Lyrasoft\Luna\Entity\Rule;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\NodeInterface;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Authorization\AuthorizationInterface;
use Windwalker\Core\Application\AppClient;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\ORM\ORM;
use Windwalker\ORM\SelectorQuery;
use Windwalker\Query\Query;
use Windwalker\Session\Session;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

use function Windwalker\collect;
use function Windwalker\unwrap_enum;
use function Windwalker\value;

/**
 * The AccessService class.
 */
class AccessService
{
    use InstanceCacheTrait;

    public const string SUPERUSER_ACTION = 'super.user';

    public const string ADMIN_ACCESS_ACTION = 'admin.access';

    public const string ROLE_MODIFY_ACTION = 'role.modify';

    public function __construct(
        protected ApplicationInterface $app,
        protected AuthorizationInterface $authorization,
        protected ORM $orm,
        protected Session $session
    ) {
    }

    public function can(string|\UnitEnum $action, mixed $user = null, ...$args): bool
    {
        return $this->check($action, $user, ...$args);
    }

    public function check(string|\UnitEnum $action, mixed $user = null, ...$args): bool
    {
        $currentUser = $this->getUser($user);

        $action = (string) unwrap_enum($action);

        if (
            ($user === null || $user->id === $currentUser?->id)
            && $action === static::ADMIN_ACCESS_ACTION
            && $this->isAdminUserSwitched()
        ) {
            return true;
        }

        if ($this->authorization->hasPolicy($action)) {
            return $this->authorization->authorize($action, $user, ...$args);
        }

        $user = $this->getUser($user ?? $currentUser);
        $userId = $user->id;

        // Get roles
        $roles = $this->getUserRoles($userId);

        // Check for Super User
        if ($this->checkRolesAllowAction($roles, static::SUPERUSER_ACTION)) {
            return true;
        }

        // Check action rules
        if ($this->checkRolesAllowAction($roles, $action)) {
            return true;
        }

        return false;
    }

    /**
     * @param  string|\UnitEnum  $action
     *
     * @return  array<UserRole>
     */
    public function getRolesAllowAction(string|\UnitEnum $action): array
    {
        $roles = $this->getRoles();

        $allowed = [];

        // Check permissions
        foreach ($roles as $role) {
            if ($this->checkRoleAllowAction($role, $action) === true) {
                $allowed[] = $role;
            }
        }

        return $allowed;
    }

    public function checkRolesAllowAction(array $roles, string|\UnitEnum $action): bool
    {
        $rules = $this->getRules($action);

        // Check permissions
        return array_any($roles, fn($role) => $this->checkRoleAllowForRules($role, $rules) === true);
    }

    public function checkRoleAllowAction(UserRole $role, string|\UnitEnum $action): bool
    {
        $rules = $this->getRules($action);

        return (bool) $this->checkRoleAllowForRules($role, $rules);
    }

    /**
     * @param  UserRole     $role
     * @param  array<Rule>  $rules
     *
     * @return  bool|null
     */
    public function checkRoleAllowForRules(UserRole $role, array $rules): ?bool
    {
        $allow = null;

        // Check rules access
        foreach ($rules as $rule) {
            if ((string) $rule->roleId === (string) $role->id) {
                $allow = $rule->allow;

                if ($allow === false) {
                    return false;
                }
            }
        }

        $parent = $this->getRoleNodeById($role->id)?->getParent()?->getValue();

        if ($parent) {
            $parentAllow = $this->checkRoleAllowForRules($parent, $rules);

            // If parent is deny, always deny.
            if ($parentAllow === false) {
                return false;
            }

            // If self is inherited, use parent permission.
            if ($allow === null) {
                return $parentAllow;
            }
        }

        // No parent, just return self, and NULL will consider as deny.
        return $allow;
    }

    /**
     * getUserRoles
     *
     * @param  mixed  $user
     *
     * @return  array<UserRole>
     */
    public function getUserRoles(mixed $user = null): array
    {
        $user = $this->getUser($user);

        $id = $user->id;

        return $this->once(
            'user.roles.' . $id,
            function () use ($id) {
                $roleIds = $this->orm->findColumn(UserRoleMap::class, 'role_id', ['user_id' => $id])->dump();
                $roleTree = $this->getRolesTree();

                $matches = [];

                foreach ($roleTree->iterate() as $roleNode) {
                    /** @var UserRole $role */
                    $role = $roleNode->getValue();

                    if ($role && in_array($role->id, $roleIds)) {
                        $matches[] = $role;
                    }
                }

                return $matches;
            }
        );
    }

    /**
     * @param  mixed                      $user
     * @param  array<UserRoleMap|string>  $roleMaps
     *
     * @return  array<UserRoleMap>
     */
    public function addRoleMapsToUser(mixed $user = null, mixed $roleMaps = []): array
    {
        $currentRoleIds = collect($this->getUserRoles($user))
            ->map(fn(UserRole $map) => $map->id)
            ->map('strval');

        $user = $this->getUser($user);

        $maps = [];

        if (!is_array($roleMaps)) {
            $roleMaps = [$roleMaps];
        }

        foreach ($roleMaps as $roleMap) {
            if (!$roleMap instanceof UserRoleMap) {
                $map = new UserRoleMap();
                $map->userId = $user->id;
                $map->roleId = $roleMap->roleId;

                $roleMap = $map;
            }

            if ($currentRoleIds->contains($roleMap->roleId)) {
                continue;
            }

            $maps[] = $this->orm->createOne(UserRoleMap::class, $roleMap);
        }

        $this->cacheRemove('user.roles.' . $user->id);

        return $maps;
    }

    /**
     * @param  mixed                   $user
     * @param  array<UserRole|string>  $roles  Can be an array or single role string|int|entity|enum
     * @param  array                   $extra
     *
     * @return  array<UserRoleMap>
     * @throws \ReflectionException
     */
    public function addRolesToUser(mixed $user = null, mixed $roles = [], array $extra = []): array
    {
        $currentRoleIds = collect($this->getUserRoles($user))
            ->map(fn(UserRole $map) => $map->id)
            ->map('strval');

        $user = $this->getUser($user);

        $maps = [];

        if (!is_array($roles)) {
            $roles = [$roles];
        }

        foreach ($roles as $role) {
            $roleId = $this->unwrapRole($role);

            if ($currentRoleIds->contains($roleId)) {
                continue;
            }

            $map = new UserRoleMap();
            $map->userId = $user->id;
            $map->roleId = $roleId;

            if ($extra !== []) {
                $map = $this->orm->hydrateEntity($extra, $map);
            }

            $maps[] = $this->orm->createOne(UserRoleMap::class, $map);
        }

        $this->cacheRemove('user.roles.' . $user->id);

        return $maps;
    }

    public function removeRoleFromUser(mixed $user = null, mixed $roles = []): void
    {
        $user = $this->getUser($user);

        if (!is_array($roles)) {
            $roles = [$roles];
        }

        if ($roles === []) {
            return;
        }

        $roleIds = array_map([$this, 'unwrapRole'], $roles);

        $this->orm->deleteWhere(
            UserRoleMap::class,
            [
                'user_id' => $user->id,
                'role_id' => $roleIds,
            ]
        );

        $this->cacheRemove('user.roles.' . $user->id);
    }

    public function userIsRole(mixed $user = null, mixed $role = null): bool
    {
        $user ??= $this->getUser();
        $roleId = $this->unwrapRole($role);

        $roles = $this->getUserRoles($user);

        return array_any($roles, fn($userRole) => (string) $userRole->id === (string) $roleId);
    }

    public function userInRoles(mixed $user = null, mixed $roles = []): bool
    {
        $user ??= $this->getUser();

        if (!is_array($roles)) {
            $roles = [$roles];
        }

        return array_any($roles, fn($role) => $this->userIsRole($user, $role));
    }

    public function isSuperUser(mixed $user = null): bool
    {
        return $this->check(static::SUPERUSER_ACTION, $user);
    }

    public function isSuperUserRole(mixed $role): bool
    {
        return $this->checkRoleAllowAction(
            $this->wrapUserRole($role),
            static::SUPERUSER_ACTION
        );
    }

    public function getSuperUserRoles(): array
    {
        return $this->getRolesAllowAction(static::SUPERUSER_ACTION);
    }

    /**
     * @param  mixed  $roles
     * @param  bool   $includeSelf
     *
     * @return  array<UserRole>
     */
    public function getParentRoles(mixed $roles, bool $includeSelf = false): array
    {
        if (!is_array($roles)) {
            $roles = [$roles];
        }

        /** @var UserRole[] $roles */
        $roles = array_map($this->wrapUserRole(...), $roles);

        $parents = [];

        foreach ($roles as $role) {
            $roleNode = $this->getRoleNodeById($role->id);

            if (!$roleNode) {
                return [];
            }

            foreach ($roleNode->getAncestors() as $ancestor) {
                if ($ancestor->isRoot()) {
                    continue;
                }

                $parentRole = $ancestor->getValue();
                $parents[$parentRole->id] = $parentRole;
            }

            if ($includeSelf) {
                $parents[$role->id] = $role;
            }
        }

        return $parents;
    }

    public function isParentRole(UserRole|string|int $parentRole, UserRole|string|int $role): bool
    {
        $parentRole = (string) $this->unwrapRole($parentRole);

        $targetNode = $this->getRoleNodeById($parentRole);

        if ($targetNode->isLeaf()) {
            return false;
        }

        foreach ($this->getParentRoles($role) as $ancestor) {
            if ($ancestor->id === $targetNode->getValue()->id) {
                return true;
            }
        }

        return false;
    }

    public function getDescendantRoles(mixed $roles, bool $includeSelf = false): array
    {
        if (!is_array($roles)) {
            $roles = [$roles];
        }

        /** @var UserRole[] $roles */
        $roles = array_map($this->wrapUserRole(...), $roles);

        $descendants = [];

        foreach ($roles as $role) {
            $roleNode = $this->getRoleNodeById($role->id);

            if (!$roleNode) {
                return [];
            }

            if ($includeSelf) {
                $descendants[$role->id] = $role;
            }

            foreach ($roleNode->iterate() as $descendant) {
                if ($descendant->isRoot()) {
                    continue;
                }

                $descendantRole = $descendant->getValue();

                $descendants[$descendantRole->id] = $descendantRole;
            }
        }

        return $descendants;
    }

    public function isChildRole(UserRole|string|int $childRole, UserRole|string|int $role): bool
    {
        $role = (string) $this->unwrapRole($role);

        $roleNode = $this->getRoleNodeById($role);

        if ($roleNode->isLeaf()) {
            return false;
        }

        foreach ($this->getParentRoles($childRole) as $ancestor) {
            if ($ancestor->id === $roleNode->getValue()->id) {
                return true;
            }
        }

        return false;
    }

    public function isSuperior(UserRole|string|int $superiorRole, UserRole|string|int $role): bool
    {
        $superiorRole = (string) $this->unwrapRole($superiorRole);

        $targetNode = $this->getRoleNodeById($superiorRole);

        if ($targetNode->isLeaf()) {
            return false;
        }

        return array_any(
            $this->getDescendantRoles($role),
            fn($descendantRole) => $descendantRole->getId() === $targetNode->getValue()->id
        );
    }

    /**
     * @param  mixed  $user
     *
     * @return  array<UserRole>
     */
    public function getAllowedRolesForUser(mixed $user = null): array
    {
        $user ??= $this->getUser();
        $roles = $this->getRoles();
        $userRoles = $this->getUserRoles($user);
        $allowed = [];

        foreach ($userRoles as $userRole) {
            foreach ($roles as $role) {
                if (
                    !isset($allowed[$role->id])
                    && (
                        $this->unwrapRole($userRole) === $this->unwrapRole($role)
                        || $this->isChildRole($userRole, $role)
                    )
                ) {
                    $allowed[$role->id] = $role;
                }
            }
        }

        return $allowed;
    }

    /**
     * getRoles
     *
     * @return  NodeInterface|NodeInterface[]
     */
    public function getRolesTree(): NodeInterface
    {
        return $this->once(
            'roles.tree',
            function () {
                $roles = $this->loadStaticRoles();

                if ($this->app->config('access.roles_db_enabled') ?? false) {
                    $dbRoles = $this->loadDBRoles();

                    // Merge nodes
                    foreach ($dbRoles->getChildren() as $child) {
                        $roles->addChild($child);
                    }
                }

                return $roles;
            }
        );
    }

    /**
     * getRoles
     *
     * @return  array<UserRole>
     */
    public function getRoles(): array
    {
        return $this->once(
            'roles',
            function () {
                return array_map(static fn($node) => $node->getValue(), $this->getRoleFlatNodes());
            }
        );
    }

    /**
     * getRoleFlatNodes
     *
     * @return  array<NodeInterface>
     */
    public function getRoleFlatNodes(): array
    {
        return $this->once(
            'role.nodes',
            function () {
                $roles = [];

                foreach ($this->getRolesTree()->iterate() as $node) {
                    $role = $node->getValue();

                    if ($role) {
                        $roles[$role->getId()] = $node;
                    }
                }

                return $roles;
            }
        );
    }

    /**
     * @param  string|int  $id
     *
     * @return  NodeInterface<UserRole>|null
     */
    public function getRoleNodeById(string|int $id): ?NodeInterface
    {
        return $this->getRoleFlatNodes()[$id] ?? null;
    }

    public function loadStaticRoles(): NodeInterface
    {
        return $this->once(
            'roles.static',
            fn() => new Node(
                null,
                static::injectIdToRoles(static::getConfigRoles())
            )
        );
    }

    protected function getConfigRoles(): array
    {
        return $this->cacheStorage['roles.static'] ??= $this->stripValue($this->app->config('access.roles')) ?: [];
    }

    protected function stripValue(mixed $value): mixed
    {
        if ($value instanceof \Closure) {
            return $this->app->call($value);
        }

        return $value;
    }

    public function loadDBRoles(): NodeInterface
    {
        return $this->once(
            'roles.db',
            function () {
                $items = $this->orm->findList(UserRole::class)->all();

                return TreeBuilder::create(
                    $items,
                    static fn(UserRole $role) => $role->id,
                    static fn(UserRole $role) => $role->parentId,
                );
            }
        );
    }

    /**
     * getRules
     *
     * @return  array<Rule>
     */
    public function getRules(string|\UnitEnum $action): array
    {
        return $this->once(
            'rules:' . unwrap_enum($action),
            function () use ($action) {
                [$ns, $act, $id] = static::extractAction($action);
                $result = [];

                // Static rules
                $rules = $this->loadStaticRules();

                if ($this->app->config('access.actions_db_enabled') ?? false) {
                    // DB Rules
                    $rules = array_merge(
                        $rules,
                        $this->loadDBRules($action)
                    );
                }

                if ($id) {
                    foreach ($rules as $rule) {
                        if (
                            $rule->type === $ns
                            && $rule->action === $act
                            && (string) $rule->targetId === $id
                        ) {
                            $result[] = $rule;
                        }
                    }
                }

                if ($ns) {
                    foreach ($rules as $rule) {
                        // Get global access
                        if ($rule->type === $ns && $rule->action === $act && !$rule->targetId) {
                            $result[] = $rule;
                        }
                    }
                }

                foreach ($rules as $rule) {
                    // Get global access
                    if (!$rule->type && $rule->action === $act && !$rule->targetId) {
                        $result[] = $rule;
                    }
                }

                return $result;
            }
        );
    }

    public function wrapUserRole(string|int|UserRole $role): ?UserRole
    {
        if ($role instanceof UserRole) {
            return $role;
        }

        return array_find($this->getRoles(), fn($userRole) => (string) $userRole->id === (string) $role);
    }

    public function unwrapRole(mixed $role): ?string
    {
        if ($role === null) {
            return null;
        }

        if ($role instanceof UserRole) {
            return $role->id;
        }

        if ($role instanceof UserRoleMap) {
            return (string) $role->roleId;
        }

        return (string) value($role);
    }

    /**
     * loadStaticRules
     *
     * @return  array<Rule>
     */
    public function loadStaticRules(): array
    {
        return $this->once(
            'rules.static',
            function () {
                $result = [];
                $actions = $this->app->config('access.actions');

                foreach ($actions as $name => $rules) {
                    foreach ($rules as $roleId => $allow) {
                        [$ns, $action, $id] = static::extractAction($name);

                        $rule = new Rule();
                        $rule->roleId = $roleId;
                        $rule->type = (string) $ns;
                        $rule->name = $name;
                        $rule->targetId = $id ?? '';
                        $rule->action = $action ?? '';
                        $rule->allow = $allow;

                        $result[] = $rule;
                    }
                }

                return $result;
            }
        );
    }

    public function loadDBRules(string|\UnitEnum $action): array
    {
        $action = unwrap_enum($action);

        return $this->once(
            'rules.db:' . $action,
            function () use ($action) {
                [$ns, $act, $id] = static::extractAction($action);

                return $this->orm->from(Rule::class)
                    ->where('name', $action)
                    ->orWhere(
                        function (Query $query) use ($ns, $act, $id) {
                            if ($id) {
                                $query->whereRaw('type = :ns AND action = :action AND target_id = :target')
                                    ->bind('ns', $ns)
                                    ->bind('action', $act)
                                    ->bind('target', $id);

                                return;
                            }

                            if ($ns) {
                                $query->whereRaw('type = :ns AND action = :action AND target_id = :target')
                                    ->bind('ns', $ns)
                                    ->bind('action', $act)
                                    ->bind('target', (string) $id);

                                return;
                            }

                            $query->whereRaw('type = \'\' AND action = :action AND target_id = \'\'')
                                ->bind('action', $act);
                        }
                    )
                    ->all(Rule::class)
                    ->dump();
            }
        );
    }

    /**
     * injectIdToRoles
     *
     * @param  iterable<NodeInterface>  $nodes
     *
     * @return  iterable<NodeInterface>
     */
    public static function injectIdToRoles(iterable $nodes): iterable
    {
        foreach ($nodes as $roleId => $child) {
            if ($child instanceof UserRole && is_array($nodes)) {
                $nodes[$roleId] = $child = new Node($child);
            }

            if ($child instanceof NodeInterface && ($role = $child->getValue()) instanceof UserRole) {
                /** @var UserRole $role */
                $role->id = $roleId;
            }
        }

        return $nodes;
    }

    /**
     * @param  string|\UnitEnum  $action
     *
     * @return  array<?string>
     */
    protected static function extractAction(string|\UnitEnum $action): array
    {
        $extracted = explode('::', unwrap_enum($action), 3);

        return match (count($extracted)) {
            1 => [null, $extracted[0], null],
            2 => [$extracted[0], $extracted[1], null],
            3 => $extracted
        };
    }

    /**
     * isUserSwitched
     *
     * @return  bool
     */
    protected function isAdminUserSwitched(): bool
    {
        if ($this->app->getClient() === AppClient::WEB) {
            $userSwitcher = $this->app->service(UserSwitchService::class);
            $luna = $this->app->service(LunaPackage::class);

            if ($luna->isAdmin() && $userSwitcher->getOriginUserId()) {
                return true;
            }
        }

        return false;
    }

    public function getUser(mixed $conditions = null): ?UserEntityInterface
    {
        if ($conditions instanceof UserEntityInterface) {
            return $conditions;
        }

        return $this->app->service(UserService::class)->getUser($conditions);
    }

    /**
     * @return  array<UserRole>
     */
    public function getBasicRoles(): array
    {
        $roles = $this->app->config('access.basic_roles') ?: [];

        if (!is_array($roles)) {
            $roles = [$roles];
        }

        return array_map([$this, 'wrapUserRole'], $roles);
    }

    /**
     * @return  array<string|\BackedEnum>
     */
    public function getSelectableRoles(): array
    {
        return $this->app->config('access.selectable_roles') ?: [];
    }

    public function canSelectUserRoles(): bool
    {
        $roles = $this->getSelectableRoles();

        return $roles !== [] && $this->check(static::ROLE_MODIFY_ACTION);
    }

    public function getUserByRolesQuery(
        mixed $roles,
        bool $includesSuperior = false,
        bool $includeSuperUser = false
    ): SelectorQuery {
        if (!is_array($roles)) {
            $roles = [$roles];
        }

        if ($includesSuperior) {
            $roles = $this->getDescendantRoles($roles, true);
        }

        if ($includeSuperUser) {
            $roles = [
                ...$roles,
                ...$this->getSuperUserRoles()
            ];
        }

        $roleIds = array_map($this->unwrapRole(...), $roles);
        $roleIds = array_unique($roleIds);

        return $this->orm->from(User::class, 'user')
            ->whereExists(
                function (Query $query) use ($roleIds) {
                    $query->from(UserRoleMap::class)
                        ->whereRaw('user_id = user.id')
                        ->whereRaw('role_id IN (:...roles)')
                        ->bind('roles', $roleIds);
                }
            );
    }
}
