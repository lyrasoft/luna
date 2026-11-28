<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\ColumnRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\Renderer\CompositeRenderer;

class ColumnRendererTest extends TestCase
{
    #[Test]
    public function prepareElementConvertsBlockDisplayToFlex(): void
    {
        $renderer = new ColumnRenderer(
            $this->createStub(PageRendererFactory::class),
            $this->createStub(RendererService::class)
        );

        $classes = ['l-column'];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap(['display' => ['block', 'd-none']]),
            $classes,
            $attrs
        );

        self::assertSame(['l-column', 'flex', 'd-none'], $classes);
    }

    #[Test]
    public function renderDefaultsHtmlIdAndRendersColumnLayout(): void
    {
        $composite = $this->createMock(CompositeRenderer::class);
        $composite->expects($this->once())
            ->method('render')
            ->with(
                'resolved-layout',
                $this->callback(
                    fn(array $data): bool => (string) $data['col']->getDeep('options.html_id') === 'luna-3'
                        && $data['path'] === 'page-1'
                )
            )
            ->willReturn('COL-HTML');

        $rendererService = $this->createMock(RendererService::class);
        $rendererService->expects($this->once())
            ->method('resolveLayout')
            ->with('page.column')
            ->willReturn('resolved-layout');
        $rendererService->expects($this->once())
            ->method('createRenderer')
            ->willReturn($composite);

        $renderer = new ColumnRenderer($this->createStub(PageRendererFactory::class), $rendererService);

        self::assertSame(
            'COL-HTML',
            $renderer->render(['id' => 3, 'options' => self::offsets()], 'page-1')
        );
    }

    #[Test]
    public function renderCompilesCustomCssScopedToHtmlId(): void
    {
        $css = [];

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->atLeastOnce())
            ->method('internalCSS')
            ->willReturnCallback(function (string $output) use (&$css, &$asset): AssetService {
                $css[] = $output;

                return $asset;
            });

        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($asset);

        $rendererService = $this->createStub(RendererService::class);
        $rendererService->method('createRenderer')->willReturn($this->createStub(CompositeRenderer::class));

        $renderer = new ColumnRenderer($factory, $rendererService);
        $renderer->render(['id' => 3, 'options' => ['html_css' => 'color: blue', ...self::offsets()]], 'page-1');

        self::assertStringContainsString('#luna-3', implode("\n", $css));
        self::assertStringContainsString('color: blue', implode("\n", $css));
    }

    /**
     * Minimal options that the render paths read; padding and margin are needed per breakpoint by prepareBasicCSS.
     */
    private static function offsets(): array
    {
        $offset = ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'];

        return ['padding' => $offset, 'margin' => $offset, 'display' => []];
    }
}
