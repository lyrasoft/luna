<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Field\UserModalField;
use Lyrasoft\Luna\Tests\TestApp;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\Router;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\DI\Container;

/**
 * Covers UserModalField's own configuration: the `user_list` route and User table bound in configure(),
 * the `name` title field that overrides ModalField's default, and the item lookup that reads those
 * users from the real test database. Generic ModalField behavior is covered by the parent's own tests.
 */
class UserModalFieldTest extends TestCase
{
    use DatabaseTestTrait;

    private Container $diContainer;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(User::class)->getTableName());
    }

    #[Before]
    protected function prepareContainer(): void
    {
        $container = TestApp::prepareTestContext()->container;

        // Field navigation resolves the Navigator, which needs the `user_list` route.
        $container->share(
            Router::class,
            new Router(['user_list' => new Route('user_list', '/admin/user/list')])
        );

        $this->diContainer = $container;
    }

    private function createField(): UserModalField
    {
        return $this->diContainer->newInstance(UserModalField::class, ['name' => 'user']);
    }

    private function saveUser(string $name): User
    {
        $user = new User();
        $user->username = strtolower($name);
        $user->email = strtolower($name) . '@example.com';
        $user->name = $name;

        return self::$orm->createOne(User::class, $user);
    }

    #[Test]
    public function configureBindsUserListRouteAndUserTable(): void
    {
        $field = $this->createField();

        self::assertSame('user_list', $field->getRoute());
        self::assertSame(User::class, $field->getTable());
    }

    #[Test]
    public function titleFieldIsNameInsteadOfParentTitle(): void
    {
        self::assertSame('name', $this->createField()->getTitleField());
    }

    #[Test]
    public function defaultUrlResolvesUserListRouteInModalLayout(): void
    {
        $url = (string) $this->createField()->getUrl();

        self::assertStringContainsString('/user/list', $url);
        self::assertStringContainsString('layout=modal', $url);
    }

    #[Test]
    public function getItemsReturnsUsersKeyedByValueWithNameAsTitle(): void
    {
        $alice = $this->saveUser('Alice');
        $bob = $this->saveUser('Bob');

        $field = $this->createField();
        $field->setValue([$alice->id, $bob->id]);

        $items = $field->getItems();

        self::assertCount(2, $items);
        self::assertSame(
            [
                ['title' => 'Alice', 'value' => $alice->id, 'image' => null],
                ['title' => 'Bob', 'value' => $bob->id, 'image' => null],
            ],
            $this->normalizeItems($items),
        );
    }

    #[Test]
    public function getItemsFollowsValueOrderWhenSortable(): void
    {
        $alice = $this->saveUser('Alice');
        $bob = $this->saveUser('Bob');

        $field = $this->createField();
        $field->sortable(true);
        $field->setValue([$bob->id, $alice->id]);

        $titles = array_column($field->getItems(), 'title');

        self::assertSame(['Bob', 'Alice'], $titles);
    }

    #[Test]
    public function getItemsAcceptsCommaSeparatedValue(): void
    {
        $alice = $this->saveUser('Alice');
        $this->saveUser('Bob');

        $field = $this->createField();
        $field->setValue((string) $alice->id);

        self::assertSame(['Alice'], array_column($field->getItems(), 'title'));
    }

    #[Test]
    public function getItemsReturnsEmptyListWhenNoValueIsSet(): void
    {
        $this->saveUser('Alice');

        $field = $this->createField();
        $field->setValue('');

        self::assertSame([], $field->getItems());
    }

    #[Test]
    public function getItemTitleReadsNameOfSelectedUser(): void
    {
        $alice = $this->saveUser('Alice');

        $field = $this->createField();
        $field->setValue($alice->id);

        $method = new ReflectionMethod(UserModalField::class, 'getItemTitle');

        self::assertSame('Alice', $method->invoke($field));
    }

    /**
     * @return  array<int, array{title: mixed, value: mixed, image: mixed}>
     */
    private function normalizeItems(array $items): array
    {
        return array_map(
            static fn(array $item): array => [
                'title' => $item['title'],
                'value' => (int) $item['value'],
                'image' => $item['image'],
            ],
            $items,
        );
    }
}
