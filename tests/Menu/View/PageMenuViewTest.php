<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\View\PageMenuView;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\ORM\ORM;

/**
 * Covers PageMenuView, which routes to a page by path, resolves the page path from its id, rejects
 * menus with neither id nor path, and checks active state through MenuHelper.
 *
 * ORM is a mock so that no database is needed. LangService echoes translation keys so that the
 * exception message can be asserted exactly, and it is injected through reflection.
 */
class PageMenuViewTest extends TestCase
{
    private ORM $orm;

    private PageMenuView $view;

    #[Before]
    protected function createView(): void
    {
        $this->orm = $this->createStub(ORM::class);
        $this->view = $this->createViewWith($this->orm);
    }

    private function createViewWith(ORM $orm): PageMenuView
    {
        $view = new PageMenuView($orm);

        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturnCallback(
            static fn(string $id): string => 'T:' . $id
        );

        $property = new \ReflectionProperty(PageMenuView::class, 'lang');
        $property->setValue($view, $lang);

        return $view;
    }

    #[Test]
    public function routeBuildsPageUriFromPath(): void
    {
        $expected = $this->createStub(RouteUri::class);
        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('page', ['path' => 'about/us'])
            ->willReturn($expected);

        $uri = $this->view->route($nav, ['path' => 'about/us'], []);

        self::assertSame($expected, $uri);
    }

    #[Test]
    public function prepareVariablesStoreResolvesPathFromPageId(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('findOne')
            ->with(\Lyrasoft\Luna\Entity\Page::class, 8)
            ->willReturn(new class () {
                public string $alias = 'about/us';
            });

        $view = $this->createViewWith($orm);
        $variables = ['id' => 8, 'path' => ''];
        $view->prepareVariablesStore($variables);

        self::assertSame('about/us', $variables['path']);
    }

    #[Test]
    public function prepareVariablesStoreSetsEmptyPathWhenPageIsNotFound(): void
    {
        $orm = $this->createStub(ORM::class);
        $orm->method('findOne')->willReturn(null);

        $view = $this->createViewWith($orm);
        $variables = ['id' => 99, 'path' => 'old'];
        $view->prepareVariablesStore($variables);

        self::assertSame('', $variables['path']);
    }

    #[Test]
    public function prepareVariablesStoreKeepsManualPathWhenIdIsEmpty(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->never())->method('findOne');

        $view = $this->createViewWith($orm);
        $variables = ['id' => 0, 'path' => 'manual/path'];
        $view->prepareVariablesStore($variables);

        self::assertSame('manual/path', $variables['path']);
    }

    #[Test]
    public function prepareVariablesStoreThrowsWhenIdAndPathAreBothEmpty(): void
    {
        $view = $this->createViewWith($this->createStub(ORM::class));
        $variables = ['id' => 0, 'path' => ''];

        $this->expectException(ValidateFailException::class);
        $this->expectExceptionMessageIs('T:luna.menu.message.page.id.and.path.require');

        $view->prepareVariablesStore($variables);
    }

    #[Test]
    public function isActiveChecksPageRouteWithPath(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('page', ['path' => 'about/us'])
            ->willReturn(true);

        $property = new \ReflectionProperty(AbstractMenuView::class, 'menuHelper');
        $property->setValue($this->view, $menuHelper);

        self::assertTrue($this->view->isActive(['path' => 'about/us'], []));
    }
}
