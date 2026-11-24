<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\Renderer\CompositeRenderer;

class AddonRendererTest extends TestCase
{
    #[Test]
    public function prepareElementAddsDisplayAndHtmlClasses(): void
    {
        $renderer = new AddonRenderer(
            $this->createStub(PageRendererFactory::class),
            $this->createStub(RendererService::class)
        );

        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap(['display' => ['text-center', 'd-none'], 'html_class' => 'my-addon']),
            $classes,
            $attrs
        );

        self::assertSame(['text-center', 'd-none', 'my-addon'], $classes);
    }

    #[Test]
    public function renderDefaultsHtmlIdAndCreatesAddonInstance(): void
    {
        $addon = $this->createStub(AbstractAddon::class);
        $addon->method('render')->willReturn('ADDON-HTML');

        $factory = $this->createMock(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($this->createStub(AssetService::class));
        $factory->expects($this->once())
            ->method('createAddonInstance')
            ->with(
                'text',
                $this->callback(
                    fn (array $data): bool => (string) $data['options']['html_id'] === 'luna-7'
                        && $data['path'] === 'page-1'
                )
            )
            ->willReturn($addon);

        $renderer = $this->createAddonRenderer($factory);

        self::assertSame(
            'ADDON-HTML',
            $renderer->render(['id' => 7, 'type' => 'text', 'options' => self::offsets()], 'page-1')
        );
    }

    #[Test]
    public function renderKeepsExistingHtmlId(): void
    {
        $addon = $this->createStub(AbstractAddon::class);
        $addon->method('render')->willReturn('');

        $factory = $this->createMock(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($this->createStub(AssetService::class));
        $factory->expects($this->once())
            ->method('createAddonInstance')
            ->with(
                'text',
                $this->callback(
                    fn (array $data): bool => (string) $data['options']['html_id'] === 'custom-id'
                )
            )
            ->willReturn($addon);

        $this->createAddonRenderer($factory)->render(
            ['id' => 7, 'type' => 'text', 'options' => ['html_id' => 'custom-id', ...self::offsets()]],
            'page-1'
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

        $addon = $this->createStub(AbstractAddon::class);
        $addon->method('render')->willReturn('');

        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($asset);
        $factory->method('createAddonInstance')->willReturn($addon);

        $this->createAddonRenderer($factory)->render(
            ['id' => 7, 'type' => 'text', 'options' => ['html_css' => 'color: red', ...self::offsets()]],
            'page-1'
        );

        self::assertStringContainsString('#luna-7', implode("\n", $css));
        self::assertStringContainsString('color: red', implode("\n", $css));
    }

    /**
     * Minimal options that the render paths read; padding and margin are needed per breakpoint by prepareBasicCSS.
     */
    private static function offsets(): array
    {
        $offset = ['lg' => '0,0,0,0', 'md' => '0,0,0,0', 'xs' => '0,0,0,0'];

        return ['padding' => $offset, 'margin' => $offset, 'display' => []];
    }

    private function createAddonRenderer(PageRendererFactory $factory): AddonRenderer
    {
        $rendererService = $this->createStub(RendererService::class);
        $rendererService->method('createRenderer')->willReturn($this->createStub(CompositeRenderer::class));

        return new AddonRenderer($factory, $rendererService);
    }
}
