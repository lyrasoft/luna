<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\PageBuilder\PageBuilder;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererInterface;
use Lyrasoft\Luna\Script\PageScript;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Asset\AssetService;
use Windwalker\ORM\ORM;

class PageBuilderTest extends TestCase
{
    #[Test]
    public function renderLayoutSkipsDisabledRowsAndUsesIndexAsPath(): void
    {
        $factory = $this->createMock(PageRendererFactory::class);
        $factory->expects(self::once())->method('resetAssets');
        $factory->method('getAsset')->willReturn($this->createAssetStub(['.a{}']));

        $rowRenderer = $this->createMock(PageRendererInterface::class);
        $rowRenderer->expects(self::once())
            ->method('render')
            ->with(['id' => 2, 'disabled' => false], '1')
            ->willReturn('<row-2>');

        $factory->expects(self::once())
            ->method('createRenderer')
            ->with('row')
            ->willReturn($rowRenderer);

        $builder = $this->createBuilder($factory);

        $html = $builder->renderLayout(
            [
                ['id' => 1, 'disabled' => true],
                ['id' => 2, 'disabled' => false],
            ]
        );

        self::assertSame('<style>.a{}</style><row-2>', $html);
    }

    #[Test]
    public function renderLayoutCompilesCustomScssBeforeInternalCss(): void
    {
        $builder = $this->createBuilder($this->createRowFactory(['.a{}']));

        $html = $builder->renderLayout([], '$c: red; .x { color: $c; }');

        self::assertStringContainsString('.x', $html);
        self::assertStringContainsString('color: red', $html);
        self::assertStringNotContainsString('$c', $html);
        self::assertStringContainsString('.a{}', $html);
    }

    #[Test]
    public function renderLayoutKeepsRawCustomCssWhenScssFails(): void
    {
        $builder = $this->createBuilder($this->createRowFactory([]));

        $html = $builder->renderLayout([], '.x { color: ');

        self::assertStringContainsString('.x { color: ', $html);
    }

    #[Test]
    public function prepareAssetsUsesAosByDefault(): void
    {
        $script = $this->createMock(PageScript::class);
        $script->expects(self::once())->method('aos');
        $script->expects(self::never())->method('wow');
        $script->expects(self::never())->method('animate');
        $script->expects(self::never())->method('jarallax');

        $builder = $this->createBuilder(
            $this->createFactoryWithScript($script, 'aos'),
            $this->createAssetCssMock()
        );

        $builder->prepareAssets();
    }

    #[Test]
    public function prepareAssetsUsesWowAndAnimateForWowDriver(): void
    {
        $script = $this->createMock(PageScript::class);
        $script->expects(self::once())->method('wow');
        $script->expects(self::once())->method('animate');
        $script->expects(self::never())->method('aos');

        $builder = $this->createBuilder(
            $this->createFactoryWithScript($script, 'wow'),
            $this->createAssetCssMock()
        );

        $builder->prepareAssets();
    }

    #[Test]
    public function prepareAssetsLoadsJarallaxOnlyWhenHtmlUsesIt(): void
    {
        $script = $this->createMock(PageScript::class);
        $script->expects(self::once())->method('jarallax');

        $builder = $this->createBuilder(
            $this->createFactoryWithScript($script, 'aos'),
            $this->createAssetCssMock()
        );

        $builder->prepareAssets('<div class="jarallax"></div>');
    }

    #[Test]
    public function prepareAssetsSkipsJarallaxWithoutMarker(): void
    {
        $script = $this->createMock(PageScript::class);
        $script->expects(self::never())->method('jarallax');

        $builder = $this->createBuilder(
            $this->createFactoryWithScript($script, 'aos'),
            $this->createAssetCssMock()
        );

        $builder->prepareAssets('<div></div>');
    }

    #[Test]
    public function renderByEntityRendersPageContent(): void
    {
        $builder = $this->createBuilder($this->createRowFactory(['.a{}']));

        $page = new Page();
        $page->content = [];
        $page->css = '';

        self::assertSame('<style>.a{}</style>', $builder->renderByEntity($page));
    }

    #[Test]
    public function getCacheFileUsesPageIdUnderRendererCache(): void
    {
        $builder = $this->createBuilder($this->createRowFactory([]));

        $path = str_replace('\\', '/', $builder->getCacheFile(7)->getPathname());

        self::assertStringEndsWith('/renderer/pages/7.data', $path);
    }

    private function createBuilder(
        PageRendererFactory $factory,
        ?AssetService $asset = null,
    ): PageBuilder {
        $builder = new PageBuilder($this->createStub(ORM::class));

        $ref = new \ReflectionClass($builder);
        $ref->getProperty('rendererFactory')->setValue($builder, $factory);
        $ref->getProperty('asset')->setValue($builder, $asset ?? $this->createAssetStub([]));

        return $builder;
    }

    /**
     * @param  string[]  $styles
     */
    private function createRowFactory(array $styles): PageRendererFactory
    {
        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($this->createAssetStub($styles));
        $factory->method('getScript')->willReturn($this->createStub(PageScript::class));
        $factory->method('getAnimationDriver')->willReturn('aos');

        return $factory;
    }

    private function createFactoryWithScript(PageScript $script, string $driver): PageRendererFactory
    {
        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getScript')->willReturn($script);
        $factory->method('getAnimationDriver')->willReturn($driver);
        $factory->method('getAsset')->willReturn($this->createAssetStub([]));

        return $factory;
    }

    private function createAssetCssMock(): AssetService
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects(self::once())->method('css')->with('@luna/dist/page.css');

        return $asset;
    }

    /**
     * @param  string[]  $styles
     */
    private function createAssetStub(array $styles): AssetService
    {
        $asset = $this->createStub(AssetService::class);
        $asset->method('getInternalStyles')->willReturn($styles);

        return $asset;
    }
}
