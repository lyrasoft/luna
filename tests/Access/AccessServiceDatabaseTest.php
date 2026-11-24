<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Access;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\Rule;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Authorization\AuthorizationInterface;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Session\Session;

/**
 * Runs AccessService's DB-backed roles and rules against the real MySQL test DB.
 */
#[AllowMockObjectsWithoutExpectations]
class AccessServiceDatabaseTest extends TestCase
{
    use DatabaseTestTrait;

    private array $config = [];

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        $orm = self::$orm;

        foreach ([UserRoleMap::class, Rule::class, UserRole::class, User::class] as $entity) {
            static::truncateTables($orm->getEntityMetadata($entity)->getTableName());
        }
    }

    private function createService(): AccessService
    {
        $this->config = [];

        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')
            ->willReturnCallback(fn(string $name) => $this->config[$name] ?? null);

        return new AccessService(
            $app,
            $this->createStub(AuthorizationInterface::class),
            self::$orm,
            $this->createStub(Session::class),
        );
    }

    private function saveRole(string $title, ?UserRole $parent = null, string|int|null $id = null): UserRole
    {
        $role = new UserRole();
        $role->title = $title;
        $role->state = BasicState::PUBLISHED;

        if ($id !== null) {
            $role->id = $id;
        }

        if ($parent) {
            $role->parentId = $parent->id;
        } else {
            // TreeBuilder::create() defaults its synthetic root to id 1, so top-level roles hang under it.
            self::$orm->mapper(UserRole::class)->createRootIfNotExist(
                ['title' => 'Root', 'state' => BasicState::PUBLISHED],
                ['title']
            );
            $role->parentId = 1;
        }

        return self::$orm->createOne(UserRole::class, $role);
    }

    private function saveRule(string|int $roleId, string $name, bool $allow, string $type = '', string $action = '', string $targetId = ''): Rule
    {
        $rule = new Rule();
        $rule->roleId = (string) $roleId;
        $rule->name = $name;
        $rule->type = $type;
        $rule->action = $action;
        $rule->targetId = $targetId;
        $rule->allow = $allow;

        return self::$orm->createOne(Rule::class, $rule);
    }

    private function saveUser(string $username): User
    {
        $user = new User();
        $user->username = $username;
        $user->email = $username . '@example.com';
        $user->name = $username;

        return self::$orm->createOne(User::class, $user);
    }

    private function mapUserToRole(User $user, UserRole $role): void
    {
        $map = new UserRoleMap();
        $map->userId = $user->id;
        $map->roleId = $role->id;

        self::$orm->createOne(UserRoleMap::class, $map);
    }

    #[Test]
    public function loadDBRolesBuildsTreeFromDatabase(): void
    {
        $root = $this->saveRole('Root');
        $child = $this->saveRole('Child', $root);

        $tree = $this->createService()->loadDBRoles();

        $rootNode = $tree->getChildren()[0];

        self::assertEquals($root->id, $rootNode->getValue()->id);
        self::assertEquals($child->id, $rootNode->getChildren()[0]->getValue()->id);
    }

    #[Test]
    public function getRolesTreeMergesDbRolesWhenEnabled(): void
    {
        $dbRole = $this->saveRole('DB Role');

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = true;
        $this->config['access.roles'] = [
            'static' => new UserRole(),
        ];

        $ids = [];
        $collect = static function ($node) use (&$collect, &$ids): void {
            $ids[] = $node->getValue()?->id;
            foreach ($node->getChildren() as $child) {
                $collect($child);
            }
        };
        $collect($service->getRolesTree());

        self::assertContains('static', $ids);
        self::assertContains((string) $dbRole->id, array_map('strval', $ids));
    }

    #[Test]
    public function getRolesTreeIgnoresDbRolesWhenDisabled(): void
    {
        $this->saveRole('DB Role');

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = false;
        $this->config['access.roles'] = [];

        self::assertCount(0, $service->getRolesTree()->getChildren());
    }

    #[Test]
    public function staticRoleAndDbRoleWithSameIdCollideInFlatNodes(): void
    {
        // Static key '5' becomes int id 5; the DB row also uses id 5.
        $staticRole = new UserRole();
        $staticRole->title = 'Static';
        $staticRole->state = BasicState::PUBLISHED;

        $dbRole = $this->saveRole('DB Role', null, 5);

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = true;
        $this->config['access.roles'] = ['5' => $staticRole];

        $tree = $service->getRolesTree();

        // Both nodes are kept in the tree (addChild does not dedupe)...
        $matching = array_filter(
            $tree->getChildren(),
            static fn($node) => (string) $node->getValue()?->id === '5'
        );
        self::assertCount(2, $matching);

        // ...but the flat lookup by id resolves to the DB node, which is merged last.
        $node = $service->getRoleNodeById(5);

        self::assertNotNull($node);
        self::assertSame($dbRole->title, $node->getValue()->title);
    }

    #[Test]
    public function addRolesToUserCreatesMapsAndSkipsExisting(): void
    {
        $editor = $this->saveRole('Editor');
        $viewer = $this->saveRole('Viewer');
        $alice = $this->saveUser('alice');
        $this->mapUserToRole($alice, $editor);

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = true;
        $maps = $service->addRolesToUser($alice, [$editor, $viewer]);

        // Editor is already mapped, so only Viewer is created.
        self::assertCount(1, $maps);
        self::assertTrue($service->userIsRole($alice, $viewer));
        self::assertTrue($service->userIsRole($alice, $editor));
    }

    #[Test]
    public function removeRoleFromUserDeletesMapping(): void
    {
        $editor = $this->saveRole('Editor');
        $alice = $this->saveUser('alice');
        $this->mapUserToRole($alice, $editor);

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = true;
        self::assertTrue($service->userIsRole($alice, $editor));

        $service->removeRoleFromUser($alice, [$editor]);

        self::assertFalse($service->userIsRole($alice, $editor));
    }

    #[Test]
    public function getUserByRolesQueryReturnsOnlyUsersOfGivenRole(): void
    {
        $editor = $this->saveRole('Editor');
        $viewer = $this->saveRole('Viewer');

        $alice = $this->saveUser('alice');
        $bob = $this->saveUser('bob');
        $this->mapUserToRole($alice, $editor);
        $this->mapUserToRole($bob, $viewer);

        $users = $this->createService()->getUserByRoles($editor->id)->dump();

        self::assertCount(1, $users);
        self::assertSame('alice', $users[0]->username);
    }

    #[Test]
    public function loadDBRulesFiltersByActionAndTarget(): void
    {
        $role = $this->saveRole('Editor');

        $this->saveRule($role->id, 'article::edit::1', true, 'article', 'edit', '1');
        $this->saveRule($role->id, 'article::view::1', true, 'article', 'view', '1');
        $this->saveRule($role->id, 'article::edit::2', true, 'article', 'edit', '2');

        $rules = $this->createService()->loadDBRules('article::edit::1');

        self::assertCount(1, $rules);
        self::assertSame('article', $rules[0]->type);
        self::assertSame('edit', $rules[0]->action);
        self::assertSame('1', (string) $rules[0]->targetId);
    }

    #[Test]
    public function loadDBRulesMatchesExactNameRule(): void
    {
        $role = $this->saveRole('Editor');

        $this->saveRule($role->id, 'custom::action', false);

        $rules = $this->createService()->loadDBRules('custom::action');

        self::assertCount(1, $rules);
        self::assertFalse($rules[0]->allow);
    }

    #[Test]
    public function getRulesMergesDbRulesWhenActionsEnabled(): void
    {
        $role = $this->saveRole('Editor');
        $this->saveRule($role->id, 'article::edit', true, 'article', 'edit');

        $service = $this->createService();
        $this->config['access.actions_db_enabled'] = true;
        $this->config['access.actions'] = [];

        $rules = $service->getRules('article::edit');

        self::assertCount(1, $rules);
        self::assertSame((string) $role->id, (string) $rules[0]->roleId);
    }

    #[Test]
    public function getRulesIgnoresDbRulesWhenDisabled(): void
    {
        $role = $this->saveRole('Editor');
        $this->saveRule($role->id, 'article.edit', true, 'article', 'edit');

        $service = $this->createService();
        $this->config['access.actions_db_enabled'] = false;
        $this->config['access.actions'] = [];

        self::assertSame([], $service->getRules('article.edit'));
    }

    #[Test]
    public function getUserByRolesQueryReturnsUsersMappedToRole(): void
    {
        $editor = $this->saveRole('Editor');
        $viewer = $this->saveRole('Viewer');

        $alice = $this->saveUser('alice');
        $bob = $this->saveUser('bob');

        $this->mapUserToRole($alice, $editor);
        $this->mapUserToRole($bob, $viewer);

        $users = $this->createService()->getUserByRoles($editor->id)->dump();

        self::assertCount(1, $users);
        self::assertSame('alice', $users[0]->username);
    }

    #[Test]
    public function getUserByRolesIncludesSuperiorRoleUsers(): void
    {
        $root = $this->saveRole('Root');
        $child = $this->saveRole('Child', $root);

        $rootUser = $this->saveUser('root-user');
        $childUser = $this->saveUser('child-user');

        $this->mapUserToRole($rootUser, $root);
        $this->mapUserToRole($childUser, $child);

        $service = $this->createService();
        $this->config['access.roles_db_enabled'] = true;
        $this->config['access.roles'] = [];

        $users = $service->getUserByRoles($root->id, includesSuperior: true)->dump();
        $usernames = array_map(static fn(User $u) => $u->username, $users);

        self::assertContains('root-user', $usernames);
        self::assertContains('child-user', $usernames);
    }
}
