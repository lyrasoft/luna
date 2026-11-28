<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\RowRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\Renderer\CompositeRenderer;

class RowRendererTest extends TestCase
{
    #[Test]
    public function handleContentAlignCentersContainerForMiddle(): void
    {
        $styles = new StyleContainer('#row');

        $this->createRenderer()->alignForTest(new Collection(['valign' => 'middle']), $styles);

        self::assertStringContainsString('#row .l-section__container', $styles->render());
        self::assertStringContainsString('align-items: center;', $styles->render());
    }

    #[Test]
    public function handleContentAlignEndsContainerForBottom(): void
    {
        $styles = new StyleContainer('#row');

        $this->createRenderer()->alignForTest(new Collection(['valign' => 'bottom']), $styles);

        self::assertStringContainsString('align-items: end;', $styles->render());
    }

    #[Test]
    public function handleContentAlignAddsNothingForTop(): void
    {
        $styles = new StyleContainer('#row');

        $this->createRenderer()->alignForTest(new Collection(['valign' => 'top']), $styles);

        self::assertSame('', $styles->render());
    }

    #[Test]
    public function prepareBasicCSSSetsColorWidthAndResponsiveOffsets(): void
    {
        $styles = new StyleContainer('#row');

        $this->createRenderer()->basicForTest(
            new Collection([
                'text_color' => '#333333',
                'padding' => ['lg' => '1,2,3,4', 'md' => '5,5,5,5', 'xs' => '6,6,6,6'],
                'margin' => ['lg' => '7,7,7,7', 'md' => '8,8,8,8', 'xs' => '9,9,9,9'],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('#row {', $css);
        self::assertStringContainsString('color: #333333;', $css);
        self::assertStringContainsString('width: 100%;', $css);
        self::assertStringContainsString('padding-top: 1;', $css);
        self::assertStringContainsString('margin-left: 7;', $css);
        self::assertStringContainsString('padding-top: 5;', $css);
        self::assertStringContainsString('margin-left: 8;', $css);
        self::assertStringContainsString('padding-top: 6;', $css);
        self::assertStringContainsString('margin-left: 9;', $css);
    }

    #[Test]
    public function prepareCSSPushesRowStylesToAssets(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('internalCSS')
            ->with($this->logicalAnd(
                $this->stringContains('#luna-9 .l-section__container'),
                $this->stringContains('align-items: center;'),
                $this->stringContains('#luna-9 .l-section__header'),
                $this->stringContains('text-align: center;'),
            ));

        $renderer = $this->createRenderer($asset);

        $renderer->callPrepareCSS(
            new Collection([
                'id' => 9,
                'options' => [
                    'html_id' => 'luna-9',
                    'text_color' => '#111111',
                    'valign' => 'middle',
                    'title_align' => 'center',
                    'padding' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'margin' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'html_css' => '',
                ],
            ])
        );
    }

    #[Test]
    public function prepareCSSRendersCustomCssWhenProvided(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->atLeastOnce())
            ->method('internalCSS')
            ->with($this->logicalOr(
                $this->stringContains('#luna-5'),
                $this->stringContains('color: red'),
            ));

        $renderer = $this->createRenderer($asset);

        $renderer->callPrepareCSS(
            new Collection([
                'id' => 5,
                'options' => [
                    'html_id' => 'luna-5',
                    'text_color' => '',
                    'valign' => 'top',
                    'title_align' => 'left',
                    'padding' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'margin' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'html_css' => 'color: red;',
                ],
            ])
        );
    }

    #[Test]
    public function renderWrapsRowInPageRowLayoutWithDefaultHtmlId(): void
    {
        $composite = $this->createMock(CompositeRenderer::class);
        $composite->expects($this->once())
            ->method('render')
            ->with(
                'resolved-row-layout',
                $this->callback(
                    fn(array $data): bool => $data['row']->getDeep('options.html_id') === 'luna-7'
                        && $data['path'] === '/row/path'
                        && $data['pageRenderer'] instanceof RowRenderer
                )
            )
            ->willReturn('<section>row</section>');

        $rendererService = $this->createStub(RendererService::class);
        $rendererService->method('resolveLayout')->willReturn('resolved-row-layout');
        $rendererService->method('createRenderer')->willReturn($composite);

        $renderer = $this->createRenderer(rendererService: $rendererService);

        $html = $renderer->render(
            [
                'id' => 7,
                'options' => [
                    'html_id' => '',
                    'text_color' => '',
                    'valign' => 'top',
                    'title_align' => 'left',
                    'padding' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'margin' => ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'],
                    'html_css' => '',
                ],
            ],
            '/row/path'
        );

        self::assertSame('<section>row</section>', $html);
    }

    private function createRenderer(
        ?AssetService $asset = null,
        ?RendererService $rendererService = null,
    ): TestRowRenderer {
        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAnimationDriver')->willReturn('none');
        $factory->method('getAsset')->willReturn($asset ?? $this->createStub(AssetService::class));

        return new TestRowRenderer($factory, $rendererService ?? $this->createStub(RendererService::class));
    }
}

class TestRowRenderer extends RowRenderer
{
    public function alignForTest(Collection $options, StyleContainer $styles): void
    {
        $this->handleContentAlign($options, $styles);
    }

    public function basicForTest(Collection $options, StyleContainer $styles): void
    {
        $this->prepareBasicCSS($options, $styles);
    }

    public function callPrepareCSS(Collection $content): void
    {
        $this->prepareCSS($content);
    }
}
