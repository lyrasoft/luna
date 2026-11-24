<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Menu\SelfRenderMenuTrait;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Renderer\RendererService;

/**
 * Test-only menu view that uses SelfRenderMenuTrait. getLayout() records the arguments it
 * receives and picks the layout from $params['layout'], so the trait's delegation can be asserted.
 * Used only by SelfRenderMenuTraitTest.
 */
class SelfRenderMenuFixture
{
    use SelfRenderMenuTrait;

    public ?array $receivedVariables = null;

    public ?array $receivedParams = null;

    public function useRenderer(RendererService $rendererService): void
    {
        $this->rendererService = $rendererService;
    }

    public function getLayout(array $variables = [], array $params = []): string
    {
        $this->receivedVariables = $variables;
        $this->receivedParams = $params;

        return $params['layout'] ?? 'menu/default';
    }
}

class SelfRenderMenuTraitTest extends TestCase
{
    private SelfRenderMenuFixture $view;

    private DbMenuNode $menu;

    #[Before]
    public function prepareView(): void
    {
        $this->view = new SelfRenderMenuFixture();
        $this->menu = new DbMenuNode(new Menu());
    }

    #[Test]
    public function renderUsesDefaultLayoutWhenParamsHaveNoLayout(): void
    {
        $renderer = $this->createMock(RendererService::class);
        $renderer->expects($this->once())
            ->method('render')
            ->with('menu/default', $this->anything())
            ->willReturn('<ul>default</ul>');

        $this->view->useRenderer($renderer);

        self::assertSame(
            '<ul>default</ul>',
            $this->view->render($this->menu, ['a' => 1], [])
        );
    }

    #[Test]
    public function renderUsesLayoutFromParamsWhenProvided(): void
    {
        $renderer = $this->createMock(RendererService::class);
        $renderer->expects($this->once())
            ->method('render')
            ->with('menu/custom', $this->anything())
            ->willReturn('<nav>custom</nav>');

        $this->view->useRenderer($renderer);

        self::assertSame(
            '<nav>custom</nav>',
            $this->view->render($this->menu, [], ['layout' => 'menu/custom'])
        );
    }

    #[Test]
    public function renderPassesVariablesAndParamsToGetLayout(): void
    {
        $renderer = $this->createStub(RendererService::class);
        $renderer->method('render')->willReturn('');
        $this->view->useRenderer($renderer);

        $variables = ['items' => [1, 2]];
        $params = ['layout' => 'menu/x', 'depth' => 2];

        $this->view->render($this->menu, $variables, $params);

        self::assertSame($variables, $this->view->receivedVariables);
        self::assertSame($params, $this->view->receivedParams);
    }

    #[Test]
    public function renderSendsVariablesParamsMenuAndViewInstanceToRenderer(): void
    {
        $variables = ['items' => [1]];
        $params = ['layout' => 'menu/data'];
        $captured = [];

        $renderer = $this->createMock(RendererService::class);
        $renderer->expects($this->once())
            ->method('render')
            ->willReturnCallback(
                function (string $layout, array $data) use (&$captured): string {
                    $captured = ['layout' => $layout, 'data' => $data];

                    return 'ok';
                }
            );

        $this->view->useRenderer($renderer);

        self::assertSame('ok', $this->view->render($this->menu, $variables, $params));

        self::assertSame('menu/data', $captured['layout']);
        self::assertSame(['variables', 'params', 'menu', 'viewInstance'], array_keys($captured['data']));
        self::assertSame($variables, $captured['data']['variables']);
        self::assertSame($params, $captured['data']['params']);
        self::assertSame($this->menu, $captured['data']['menu']);
        self::assertSame($this->view, $captured['data']['viewInstance']);
    }
}
