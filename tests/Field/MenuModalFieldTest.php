<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Field\MenuModalField;
use Lyrasoft\Luna\Tests\TestApp;
use PHPUnit\Framework\Attributes\BeforeClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\Router;
use Windwalker\DI\Container;

/**
 * Test-only subclass of MenuModalField that exposes the protected lookup hooks and
 * replaces the database-backed item query with a fixed item.
 *
 * Used by MenuModalFieldTest to check the title fallback and the default URL logic
 * without a real menu table. Can be removed once MenuModalField no longer exposes
 * these hooks as protected, or the tests are switched to real database fixtures.
 */
class MenuModalFieldFixture extends MenuModalField
{
    public ?array $fixtureItem = null;

    public function itemTitle(): ?string
    {
        return $this->getItemTitle();
    }

    public function defaultUrl(): mixed
    {
        return $this->getDefaultUrl();
    }

    protected function getItem(): ?array
    {
        return $this->fixtureItem;
    }
}

class MenuModalFieldTest extends TestCase
{
    protected static Container $container;

    #[BeforeClass(priority: 100)]
    public static function prepareContainer(): void
    {
        if (!env('WINDWALKER_TEST_DB_DSN')) {
            self::markTestSkipped('WINDWALKER_TEST_DB_DSN is not set.');
        }

        $container = TestApp::prepareTestContext()->container;

        // Field navigation (`$this->nav->to()`) resolves the Navigator, which needs the `menu_list` route.
        $container->share(
            Router::class,
            new Router(['menu_list' => new Route('menu_list', '/admin/menu/list')])
        );

        static::$container = $container;
    }

    #[Test]
    public function constructorConfiguresMenuListRouteAndMenuTable(): void
    {
        $field = new MenuModalFieldFixture('menu');

        self::assertSame('menu_list', $field->getRoute());
        self::assertSame(Menu::class, $field->getTable());
    }

    #[Test]
    public function itemTitleReturnsTitleOfCurrentItem(): void
    {
        $field = new MenuModalFieldFixture('menu');
        $field->fixtureItem = ['id' => 3, 'title' => 'Home'];

        self::assertSame('Home', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenNoItemFound(): void
    {
        $field = new MenuModalFieldFixture('menu');
        $field->fixtureItem = null;

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenItemHasNoTitle(): void
    {
        $field = new MenuModalFieldFixture('menu');
        $field->fixtureItem = ['id' => 3];

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function defaultUrlIsNullWhenNoRouteIsSet(): void
    {
        $field = new MenuModalFieldFixture('menu');
        $field->route(null);

        self::assertNull($field->defaultUrl());
    }

    #[Test]
    public function defaultUrlUsesModalLayoutOfMenuListRoute(): void
    {
        $field = static::$container->newInstance(MenuModalFieldFixture::class, ['name' => 'menu']);

        $url = $field->defaultUrl();

        self::assertSame('modal', $url->getVar('layout'));
        self::assertStringContainsString('/admin/menu/list', (string) $url);
        self::assertSame('', $url->getVar('type'), 'Empty menuType is still passed as an empty type var');
    }

    #[Test]
    public function defaultUrlAddsMenuTypeAsTypeVar(): void
    {
        $field = static::$container->newInstance(MenuModalFieldFixture::class, ['name' => 'menu']);
        $field->menuType('post');

        $url = $field->defaultUrl();

        self::assertSame('post', $url->getVar('type'));
        self::assertSame('modal', $url->getVar('layout'));
    }

    #[Test]
    public function getUrlReturnsUrlWithCurrentMenuType(): void
    {
        $field = static::$container->newInstance(MenuModalFieldFixture::class, ['name' => 'menu']);
        $field->menuType('page');

        self::assertSame('page', $field->getUrl()->getVar('type'));
    }
}
