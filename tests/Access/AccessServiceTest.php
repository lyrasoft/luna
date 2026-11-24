<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Access;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\Rule;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;
use Windwalker\Authorization\AuthorizationInterface;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\ORM\ORM;
use Windwalker\Session\Session;

#[AllowMockObjectsWithoutExpectations]
class AccessServiceTest extends TestCase
{
    private array $config = [];

    private ApplicationInterface $app;

    private AuthorizationInterface $authorization;

    private ORM $orm;

    private Session $session;

    protected function setUp(): void
    {
        $this->config = [];

        $this->app = $this->createStub(ApplicationInterface::class);
        $this->app->method('config')
            ->willReturnCallback(fn(string $name) => $this->config[$name] ?? null);

        $this->authorization = $this->createStub(AuthorizationInterface::class);
        $this->orm = $this->createStub(ORM::class);
        $this->session = $this->createStub(Session::class);
    }

    private function createService(array $onlyMethods = []): AccessService
    {
        $args = [$this->app, $this->authorization, $this->orm, $this->session];

        if ($onlyMethods === []) {
            return new AccessService(...$args);
        }

        return $this->getMockBuilder(AccessService::class)
            ->setConstructorArgs($args)
            ->onlyMethods($onlyMethods)
            ->getMock();
    }

    private function makeRole(string|int $id, bool $published = true): UserRole
    {
        $role = new UserRole();
        $role->id = $id;
        $role->state = $published ? \Unicorn\Enum\BasicState::PUBLISHED : \Unicorn\Enum\BasicState::UNPUBLISHED;

        return $role;
    }

    private function makeRule(string|int $roleId, string $name, bool $allow): Rule
    {
        $rule = new Rule();
        $rule->roleId = $roleId;
        $rule->name = $name;
        $rule->allow = $allow;

        return $rule;
    }

    #[Test]
    public function injectIdToRolesAssignsKeysAsIdsAndWrapsRoles(): void
    {
        $admin = $this->makeRole('');

        $nodes = AccessService::injectIdToRoles(['admin' => $admin]);

        self::assertInstanceOf(Node::class, $nodes['admin']);
        self::assertSame($admin, $nodes['admin']->getValue());
        self::assertSame('admin', $admin->id);
    }

    #[Test]
    public function extractActionParsesNamespaceActionAndTarget(): void
    {
        $method = new ReflectionMethod(AccessService::class, 'extractAction');

        self::assertSame([null, 'edit', null], $method->invoke(null, 'edit'));
        self::assertSame(['article', 'edit', null], $method->invoke(null, 'article::edit'));
        self::assertSame(['article', 'edit', '5'], $method->invoke(null, 'article::edit::5'));
    }

    #[Test]
    public function unwrapRoleReturnsStringIdForSupportedInputs(): void
    {
        $service = $this->createService();

        self::assertNull($service->unwrapRole(null));
        self::assertSame('7', $service->unwrapRole(7));
        self::assertSame('admin', $service->unwrapRole('admin'));
        self::assertSame('3', $service->unwrapRole($this->makeRole('3')));
    }

    #[Test]
    public function unwrapRoleCastsIntegerRoleIdToString(): void
    {
        $service = $this->createService();

        self::assertSame('3', $service->unwrapRole($this->makeRole(3)));
    }

    #[Test]
    public function compareRolesPrivilegesSupportsAllOperators(): void
    {
        $this->config['access.actions'] = [
            'edit' => ['A' => true],
            'delete' => ['B' => true],
        ];

        // A can only edit; B can edit and delete. So A is a strict subset of B.
        $allowMap = [
            'A' => ['edit'],
            'B' => ['edit', 'delete'],
            'C' => ['edit'],
        ];

        $service = $this->createService(['checkRolesAllowAction']);
        $service->method('checkRolesAllowAction')
            ->willReturnCallback(
                static fn(array $roles, string $action) => in_array($action, $allowMap[$roles[0]] ?? [], true)
            );

        $a = ['A'];
        $b = ['B'];
        $c = ['C'];

        self::assertTrue($service->compareRolesPrivileges($a, $b, '<'));
        self::assertTrue($service->compareRolesPrivileges($a, $b, '<='));
        self::assertFalse($service->compareRolesPrivileges($a, $b, '>'));
        self::assertFalse($service->compareRolesPrivileges($a, $b, '>='));
        self::assertFalse($service->compareRolesPrivileges($a, $b, '='));

        self::assertTrue($service->compareRolesPrivileges($b, $a, '>'));
        self::assertTrue($service->compareRolesPrivileges($b, $a, '>='));
        self::assertFalse($service->compareRolesPrivileges($b, $a, '<'));

        self::assertTrue($service->compareRolesPrivileges($a, $c, '='));
        self::assertTrue($service->compareRolesPrivileges($a, $c, '>='));
        self::assertTrue($service->compareRolesPrivileges($a, $c, '<='));
        self::assertFalse($service->compareRolesPrivileges($a, $c, '>'));
        self::assertFalse($service->compareRolesPrivileges($a, $c, '<'));
    }

    #[Test]
    public function compareRolesPrivilegesRejectsUnknownOperator(): void
    {
        $this->config['access.actions'] = ['edit' => ['A' => true]];

        $service = $this->createService(['checkRolesAllowAction']);
        $service->method('checkRolesAllowAction')->willReturn(true);

        $this->expectException(\InvalidArgumentException::class);

        $service->compareRolesPrivileges(['A'], ['A'], '!=');
    }

    #[Test]
    public function canSelectUserRolesIsFalseWithoutSelectableRolesOrDbRoles(): void
    {
        $service = $this->createService(['check']);
        $service->expects($this->never())->method('check');

        self::assertFalse($service->canSelectUserRoles());
    }

    #[Test]
    public function canSelectUserRolesRequiresRoleModifyPermission(): void
    {
        $this->config['access.selectable_roles'] = ['admin'];

        $service = $this->createService(['check']);
        $service->expects($this->once())
            ->method('check')
            ->with(AccessService::ROLE_MODIFY_ACTION)
            ->willReturn(true);

        self::assertTrue($service->canSelectUserRoles());
    }

    #[Test]
    public function canSelectUserRolesIsFalseWhenPermissionDenied(): void
    {
        $this->config['access.roles_db_enabled'] = true;

        $service = $this->createService(['check']);
        $service->method('check')->willReturn(false);

        self::assertFalse($service->canSelectUserRoles());
    }

    #[Test]
    public function wrapUserRoleReturnsRoleInstanceOrLooksUpById(): void
    {
        $role = $this->makeRole('editor');
        $service = $this->createService(['getRoles']);
        $service->method('getRoles')->willReturn([$role]);

        self::assertSame($role, $service->wrapUserRole($role));
        self::assertSame($role, $service->wrapUserRole('editor'));
        self::assertNull($service->wrapUserRole('missing'));
    }

    #[Test]
    public function loadStaticRulesBuildsRuleObjectsFromConfig(): void
    {
        $this->config['access.actions'] = [
            'article::edit' => [1 => true, 2 => false],
            'admin.access' => [1 => true],
        ];

        $rules = $this->createService()->loadStaticRules();

        self::assertCount(3, $rules);
        self::assertSame('article', $rules[0]->type);
        self::assertSame('edit', $rules[0]->action);
        self::assertSame('', $rules[0]->targetId);
        self::assertSame('article::edit', $rules[0]->name);
        self::assertTrue($rules[0]->allow);
        self::assertFalse($rules[1]->allow);
        self::assertSame('', $rules[2]->type);
        self::assertSame('admin.access', $rules[2]->action);
    }

    #[Test]
    public function getRulesMatchesTargetThenNamespaceThenGlobal(): void
    {
        $this->config['access.actions'] = [
            'edit' => [1 => true],
            'article::edit' => [1 => false],
            'article::edit::5' => [2 => true],
        ];

        $rules = $this->createService()->getRules('article::edit::5');

        self::assertSame(
            ['article::edit::5', 'article::edit', 'edit'],
            array_map(static fn(Rule $rule) => $rule->name, $rules)
        );
    }

    #[Test]
    public function getRulesReturnsEmptyWhenNothingMatches(): void
    {
        $this->config['access.actions'] = [
            'admin.access' => [1 => true],
        ];

        self::assertSame([], $this->createService()->getRules('article::delete'));
    }

    #[Test]
    public function checkRoleAllowForRulesReturnsNullWhenNoRuleMatches(): void
    {
        $service = $this->createService(['getRoleNodeById']);
        $service->method('getRoleNodeById')->willReturn(null);

        self::assertNull($service->checkRoleAllowForRules($this->makeRole('a'), []));
    }

    #[Test]
    public function checkRoleAllowForRulesReturnsRoleOwnAllowance(): void
    {
        $service = $this->createService(['getRoleNodeById']);
        $service->method('getRoleNodeById')->willReturn(null);

        $rules = [$this->makeRule('a', 'edit', true)];

        self::assertTrue($service->checkRoleAllowForRules($this->makeRole('a'), $rules));
        self::assertNull($service->checkRoleAllowForRules($this->makeRole('b'), $rules));
    }

    #[Test]
    public function checkRoleAllowForRulesDenyOverridesAllow(): void
    {
        $service = $this->createService(['getRoleNodeById']);
        $service->method('getRoleNodeById')->willReturn(null);

        $rules = [
            $this->makeRule('a', 'edit', true),
            $this->makeRule('a', 'edit', false),
        ];

        self::assertFalse($service->checkRoleAllowForRules($this->makeRole('a'), $rules));
    }

    #[Test]
    public function checkRoleAllowForRulesInheritsFromParentWhenSelfUnset(): void
    {
        $parentRole = $this->makeRole('parent');
        $childRole = $this->makeRole('child');

        $parentNode = new Node($parentRole);
        $childNode = new Node($childRole);
        $parentNode->addChild($childNode);

        $service = $this->createService(['getRoleNodeById']);
        $service->method('getRoleNodeById')
            ->willReturnCallback(static fn(string|int $id) => match ((string) $id) {
                'child' => $childNode,
                'parent' => $parentNode,
                default => null,
            });

        self::assertTrue(
            $service->checkRoleAllowForRules($childRole, [$this->makeRule('parent', 'edit', true)])
        );
        self::assertFalse(
            $service->checkRoleAllowForRules($childRole, [$this->makeRule('parent', 'edit', false)])
        );
    }

    #[Test]
    public function checkRoleAllowForRulesParentDenyAlwaysDenies(): void
    {
        $parentRole = $this->makeRole('parent');
        $childRole = $this->makeRole('child');

        $parentNode = new Node($parentRole);
        $childNode = new Node($childRole);
        $parentNode->addChild($childNode);

        $service = $this->createService(['getRoleNodeById']);
        $service->method('getRoleNodeById')
            ->willReturnCallback(static fn(string|int $id) => match ((string) $id) {
                'child' => $childNode,
                'parent' => $parentNode,
                default => null,
            });

        $rules = [
            $this->makeRule('parent', 'edit', false),
            $this->makeRule('child', 'edit', true),
        ];

        self::assertFalse($service->checkRoleAllowForRules($childRole, $rules));
    }

    #[Test]
    public function checkRolesAllowActionPassesWhenAnyRoleIsAllowed(): void
    {
        $roles = [$this->makeRole('a'), $this->makeRole('b')];
        $rules = [$this->makeRule('b', 'edit', true)];

        $service = $this->createService(['getRules', 'getRoleNodeById']);
        $service->expects($this->once())
            ->method('getRules')
            ->with('edit')
            ->willReturn($rules);
        $service->method('getRoleNodeById')->willReturn(null);

        self::assertTrue($service->checkRolesAllowAction($roles, 'edit'));
    }

    #[Test]
    public function checkRolesAllowActionFailsWhenNoRoleIsAllowed(): void
    {
        $roles = [$this->makeRole('a')];
        $rules = [$this->makeRule('a', 'edit', false)];

        $service = $this->createService(['getRules', 'getRoleNodeById']);
        $service->method('getRules')->willReturn($rules);
        $service->method('getRoleNodeById')->willReturn(null);

        self::assertFalse($service->checkRolesAllowAction($roles, 'edit'));
    }

    #[Test]
    public function checkReturnsPolicyResultWhenPolicyIsRegistered(): void
    {
        $this->authorization = $this->createMock(AuthorizationInterface::class);
        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('edit')
            ->willReturn(true);
        $this->authorization->expects($this->once())
            ->method('authorize')
            ->with('edit', null)
            ->willReturn(true);

        $service = $this->createService(['getUser', 'getEnabledUserRoles']);
        $service->method('getUser')->willReturn(null);
        $service->expects($this->never())->method('getEnabledUserRoles');

        self::assertTrue($service->check('edit'));
    }

    #[Test]
    public function canIsAliasOfCheck(): void
    {
        $this->authorization = $this->createMock(AuthorizationInterface::class);
        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('edit')
            ->willReturn(true);
        $this->authorization->expects($this->once())
            ->method('authorize')
            ->willReturn(false);

        $service = $this->createService(['getUser']);
        $service->method('getUser')->willReturn(null);

        self::assertFalse($service->can('edit'));
    }

    #[Test]
    public function getRolesReturnsStaticRolesKeyedById(): void
    {
        $this->config['access.roles'] = [
            'admin' => $this->makeRole(''),
            'editor' => $this->makeRole(''),
        ];

        $roles = $this->createService()->getRoles();

        self::assertCount(2, $roles);
        self::assertSame(['admin', 'editor'], array_map(static fn(UserRole $r) => $r->id, array_values($roles)));
    }

    #[Test]
    public function getRoleNodeByIdReturnsNullForUnknownRole(): void
    {
        $this->config['access.roles'] = [
            'admin' => $this->makeRole(''),
        ];

        $service = $this->createService();

        self::assertInstanceOf(Node::class, $service->getRoleNodeById('admin'));
        self::assertNull($service->getRoleNodeById('missing'));
    }

    #[Test]
    public function getBasicRolesWrapsNonArrayConfigAndUsesRoleInstances(): void
    {
        $role = $this->makeRole('basic');

        $this->config['access.basic_roles'] = $role;

        self::assertSame([$role], $this->createService()->getBasicRoles());
    }

    #[Test]
    public function getBasicRolesReturnsEmptyWhenNotConfigured(): void
    {
        self::assertSame([], $this->createService()->getBasicRoles());
    }

    #[Test]
    public function getSelectableRolesReturnsConfigOrEmptyArray(): void
    {
        $service = $this->createService();

        self::assertSame([], $service->getSelectableRoles());

        $this->config['access.selectable_roles'] = ['admin', 'editor'];

        self::assertSame(['admin', 'editor'], $service->getSelectableRoles());
    }

    #[Test]
    public function isDbRolesEnabledReadsConfig(): void
    {
        $service = $this->createService();

        self::assertFalse($service->isDbRolesEnabled());

        $this->config['access.roles_db_enabled'] = true;

        self::assertTrue($service->isDbRolesEnabled());
    }

    #[Test]
    public function isDbActionsEnabledReadsConfig(): void
    {
        $service = $this->createService();

        self::assertFalse($service->isDbActionsEnabled());

        $this->config['access.actions_db_enabled'] = true;

        self::assertTrue($service->isDbActionsEnabled());
    }

    #[Test]
    public function getUserReturnsGivenEntityWithoutLookup(): void
    {
        $user = $this->createMock(UserEntityInterface::class);

        self::assertSame($user, $this->createService()->getUser($user));
    }

    #[Test]
    public function getUserLooksUpThroughUserServiceForNonEntityInput(): void
    {
        $user = $this->createStub(UserEntityInterface::class);

        $userService = $this->createMock(UserService::class);
        $userService->expects($this->once())
            ->method('getUser')
            ->with(5)
            ->willReturn($user);

        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')->willReturn($userService);

        $service = new AccessService($app, $this->authorization, $this->orm, $this->session);

        self::assertSame($user, $service->getUser(5));
    }

    /**
     * Builds: admin (with child editor), viewer.
     *
     * @return  array{UserRole, UserRole, UserRole}
     */
    private function configureRoleTree(): array
    {
        $admin = $this->makeRole('admin');
        $editor = $this->makeRole('editor');
        $viewer = $this->makeRole('viewer');

        $adminNode = new Node($admin);
        $adminNode->addChild(new Node($editor));

        $this->config['access.roles'] = [
            'admin' => $adminNode,
            'viewer' => $viewer,
        ];

        return [$admin, $editor, $viewer];
    }

    #[Test]
    public function getParentRolesReturnsAncestorsExcludingRoot(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertSame(['admin'], array_keys($service->getParentRoles('editor')));
        self::assertSame([], $service->getParentRoles('viewer'));
    }

    #[Test]
    public function getParentRolesCanIncludeSelf(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertSame(['admin', 'editor'], array_keys($service->getParentRoles('editor', true)));
    }

    #[Test]
    public function getDescendantRolesReturnsChildrenAndOptionallySelf(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertSame(['editor'], array_keys($service->getDescendantRoles('admin')));
        self::assertSame(['admin', 'editor'], array_keys($service->getDescendantRoles('admin', true)));
        self::assertSame([], $service->getDescendantRoles('editor'));
    }

    #[Test]
    public function isParentRoleDetectsDirectAncestor(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertTrue($service->isParentRole('admin', 'editor'));
        self::assertFalse($service->isParentRole('admin', 'viewer'));
        self::assertFalse($service->isParentRole('editor', 'admin'));
    }

    #[Test]
    public function isChildRoleDetectsDescendantOfRole(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertTrue($service->isChildRole('editor', 'admin'));
        self::assertFalse($service->isChildRole('viewer', 'admin'));
        self::assertFalse($service->isChildRole('admin', 'editor'));
    }

    #[Test]
    public function isSuperiorDetectsAncestorRole(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertTrue($service->isSuperior('admin', 'editor'));
        self::assertFalse($service->isSuperior('editor', 'admin'));
        self::assertFalse($service->isSuperior('admin', 'viewer'));
    }

    #[Test]
    public function unknownRolesAreIgnoredWithoutErrors(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertSame([], $service->getParentRoles('missing'));
        self::assertSame([], $service->getDescendantRoles('missing'));
        self::assertSame(['admin'], array_keys($service->getParentRoles(['missing', 'editor'])));
        self::assertSame(['editor'], array_keys($service->getDescendantRoles(['missing', 'admin'])));
        self::assertFalse($service->isParentRole('missing', 'editor'));
        self::assertFalse($service->isChildRole('editor', 'missing'));
        self::assertFalse($service->isSuperior('admin', 'missing'));
    }

    #[Test]
    public function getEnabledUserRolesFiltersUnpublishedRoles(): void
    {
        $service = $this->createService(['getUserRoles']);
        $service->method('getUserRoles')->willReturn([
            $this->makeRole('a'),
            $this->makeRole('b', false),
        ]);

        $roles = array_values($service->getEnabledUserRoles($this->createStub(UserEntityInterface::class)));

        self::assertCount(1, $roles);
        self::assertSame('a', $roles[0]->id);
    }

    #[Test]
    public function userIsRoleMatchesRoleIdAsStringOrInt(): void
    {
        $user = $this->createStub(UserEntityInterface::class);

        $service = $this->createService(['getUserRoles']);
        $service->method('getUserRoles')->willReturn([$this->makeRole(3)]);

        self::assertTrue($service->userIsRole($user, 3));
        self::assertTrue($service->userIsRole($user, '3'));
        self::assertFalse($service->userIsRole($user, '4'));
    }

    #[Test]
    public function userInRolesReturnsTrueWhenAnyRoleMatches(): void
    {
        $user = $this->createStub(UserEntityInterface::class);

        $service = $this->createService(['getUserRoles']);
        $service->method('getUserRoles')->willReturn([$this->makeRole('admin')]);

        self::assertTrue($service->userInRoles($user, ['viewer', 'admin']));
        self::assertTrue($service->userInRoles($user, 'admin'));
        self::assertFalse($service->userInRoles($user, ['viewer']));
        self::assertFalse($service->userInRoles($user, []));
    }

    #[Test]
    public function isSuperUserChecksSuperUserActionForUser(): void
    {
        $service = $this->createService(['check']);
        $service->expects($this->once())
            ->method('check')
            ->with(AccessService::SUPERUSER_ACTION, null)
            ->willReturn(true);

        self::assertTrue($service->isSuperUser());
    }

    #[Test]
    public function isSuperUserRoleResolvesRoleBeforeChecking(): void
    {
        $this->configureRoleTree();

        $service = $this->createService(['checkRoleAllowAction']);
        $service->expects($this->once())
            ->method('checkRoleAllowAction')
            ->with(
                $this->callback(static fn(UserRole $role) => $role->id === 'admin'),
                AccessService::SUPERUSER_ACTION
            )
            ->willReturn(true);

        self::assertTrue($service->isSuperUserRole('admin'));
    }

    #[Test]
    public function compareUserPrivilegesComparesUsersByActionPermissions(): void
    {
        $this->config['access.actions'] = [
            'edit' => ['A' => true],
            'delete' => ['B' => true],
        ];

        $permissions = [
            'A' => ['edit'],
            'B' => ['edit', 'delete'],
            'C' => ['edit'],
        ];

        $service = $this->createService(['check']);
        $service->method('check')
            ->willReturnCallback(
                static fn(string $action, mixed $user = null) => in_array($action, $permissions[$user] ?? [], true)
            );

        self::assertTrue($service->compareUserPrivileges('A', 'B', '<'));
        self::assertTrue($service->compareUserPrivileges('B', 'A', '>'));
        self::assertTrue($service->compareUserPrivileges('A', 'C', '='));
        self::assertFalse($service->compareUserPrivileges('A', 'B', '>'));
    }

    #[Test]
    public function getBasicRolesWrapsConfiguredRoleIds(): void
    {
        $this->configureRoleTree();
        $service = $this->createService();

        self::assertSame([], $service->getBasicRoles());

        $this->config['access.basic_roles'] = 'viewer';

        self::assertSame(['viewer'], array_map(static fn(UserRole $role) => $role->id, $service->getBasicRoles()));

        $this->config['access.basic_roles'] = ['admin', 'viewer'];

        self::assertSame(
            ['admin', 'viewer'],
            array_map(static fn(UserRole $role) => $role->id, $service->getBasicRoles())
        );
    }

    #[Test]
    public function getSelectableRolesReadsConfigOrDefaultsToEmpty(): void
    {
        $service = $this->createService();

        self::assertSame([], $service->getSelectableRoles());

        $this->config['access.selectable_roles'] = ['admin', 'editor'];

        self::assertSame(['admin', 'editor'], $service->getSelectableRoles());
    }

    private function makeUser(int $id): UserEntityInterface
    {
        return new class ($id) implements UserEntityInterface {
            public function __construct(public int $id) {}

            public function getId(): mixed
            {
                return $this->id;
            }

            public function getName(): string
            {
                return 'user' . $this->id;
            }

            public function isLogin(): bool
            {
                return true;
            }

            public function isEnabled(): bool
            {
                return true;
            }

            public function isVerified(): bool
            {
                return true;
            }
        };
    }

    #[Test]
    public function checkDelegatesToAuthorizationPolicyWhenDefined(): void
    {
        $this->authorization = $this->createMock(AuthorizationInterface::class);
        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('article.edit')
            ->willReturn(true);
        $this->authorization->expects($this->once())
            ->method('authorize')
            ->with('article.edit')
            ->willReturn(false);

        $service = $this->createService();

        self::assertFalse($service->check('article.edit', $this->makeUser(1)));
    }

    #[Test]
    public function checkReturnsTrueWhenSuperUserRoleAllowsAction(): void
    {
        $service = $this->createService(['getEnabledUserRoles', 'checkRolesAllowAction']);
        $service->method('getEnabledUserRoles')->willReturn([$this->makeRole('admin')]);
        $service->method('checkRolesAllowAction')->willReturn(true);

        self::assertTrue($service->check('article.edit', $this->makeUser(1)));
    }

    #[Test]
    public function checkReturnsTrueWhenActionRulesAllowAfterSuperUserDenies(): void
    {
        $service = $this->createService(['getEnabledUserRoles', 'checkRolesAllowAction']);
        $service->method('getEnabledUserRoles')->willReturn([$this->makeRole('editor')]);
        $service->method('checkRolesAllowAction')->willReturnOnConsecutiveCalls(false, true);

        self::assertTrue($service->check('article.edit', $this->makeUser(1)));
    }

    #[Test]
    public function checkReturnsFalseWhenNeitherSuperUserNorRulesAllow(): void
    {
        $service = $this->createService(['getEnabledUserRoles', 'checkRolesAllowAction']);
        $service->method('getEnabledUserRoles')->willReturn([$this->makeRole('viewer')]);
        $service->method('checkRolesAllowAction')->willReturn(false);

        self::assertFalse($service->check('article.edit', $this->makeUser(1)));
    }

    #[Test]
    public function getAllowedRolesForUserIncludesUserRoleItself(): void
    {
        $this->configureRoleTree();
        $service = $this->createService(['getUserRoles']);
        $service->method('getUserRoles')->willReturn([$this->makeRole('editor')]);

        $allowed = $service->getAllowedRolesForUser($this->makeUser(1));

        self::assertArrayHasKey('editor', $allowed);
    }
}
