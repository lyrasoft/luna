<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\AbstractPageRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleRules;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;

#[AllowMockObjectsWithoutExpectations]
class AbstractPageRendererTest extends TestCase
{
    #[Test]
    public function addOffsetsAddsAllFourSides(): void
    {
        $rules = new StyleRules();

        AbstractPageRenderer::addOffsets($rules, 'margin', '1,2,3,4');

        $css = $rules->render('.box');

        self::assertStringContainsString('margin-top: 1', $css);
        self::assertStringContainsString('margin-right: 2', $css);
        self::assertStringContainsString('margin-bottom: 3', $css);
        self::assertStringContainsString('margin-left: 4', $css);
    }

    #[Test]
    public function addOffsetsSkipsMissingSides(): void
    {
        $rules = new StyleRules();

        AbstractPageRenderer::addOffsets($rules, 'padding', '5');

        $css = $rules->render('.box');

        self::assertStringContainsString('padding-top: 5', $css);
        self::assertStringNotContainsString('padding-left', $css);
    }

    #[Test]
    public function fontSizeKeepsEmptyValues(): void
    {
        $renderer = $this->createRenderer();

        self::assertNull($renderer->fontSize(null));
        self::assertSame('', $renderer->fontSize(''));
    }

    #[Test]
    public function fontSizeConvertsNumericString(): void
    {
        $renderer = $this->createRenderer();

        self::assertSame(12.0, $renderer->fontSize('12'));
        self::assertSame(1.5, $renderer->fontSize(1.5));
    }

    #[Test]
    public function prepareElementAddsWowAnimation(): void
    {
        $renderer = $this->createRenderer('wow');
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap([
                'animation' => ['name' => 'fadeIn', 'duration' => 1000, 'delay' => 500],
            ]),
            $classes,
            $attrs
        );

        self::assertContains('wow', $classes);
        self::assertContains('fadeIn', $classes);
        self::assertSame('1s', $attrs['data-wow-duration']);
        self::assertSame('0.5s', $attrs['data-wow-delay']);
    }

    #[Test]
    public function prepareElementAddsAosAttribute(): void
    {
        $renderer = $this->createRenderer('aos');
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap(['animation' => ['name' => 'fadeIn']]),
            $classes,
            $attrs
        );

        self::assertArrayHasKey('data-aos', $attrs);
        self::assertSame([], $classes);
    }

    #[Test]
    public function prepareElementIgnoresEmptyAnimation(): void
    {
        $renderer = $this->createRenderer('wow');
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(Collection::wrap([]), $classes, $attrs);

        self::assertSame([], $classes);
        self::assertSame([], $attrs);
    }

    #[Test]
    public function prepareElementUsesEmbedVideoUrlDirectly(): void
    {
        $renderer = $this->createRenderer();
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap([
                'background' => [
                    'type' => 'video',
                    'video' => ['url' => 'https://www.youtube.com/watch?v=abc'],
                ],
            ]),
            $classes,
            $attrs
        );

        self::assertContains('jarallax', $classes);
        self::assertSame('https://www.youtube.com/watch?v=abc', $attrs['data-jarallax-video']);
    }

    #[Test]
    public function prepareElementWrapsDirectVideoAsMp4(): void
    {
        $renderer = $this->createRenderer();
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap([
                'background' => [
                    'type' => 'video',
                    'video' => ['url' => '/media/clip.webm'],
                ],
            ]),
            $classes,
            $attrs
        );

        self::assertSame('mp4: /media/clip.webm', $attrs['data-jarallax-video']);
    }

    #[Test]
    public function prepareElementAddsParallax(): void
    {
        $renderer = $this->createRenderer();
        $classes = [];
        $attrs = [];

        $renderer->prepareElement(
            Collection::wrap(['background' => ['parallax' => true]]),
            $classes,
            $attrs
        );

        self::assertContains('jarallax', $classes);
        self::assertSame('0.5', $attrs['data-speed']);
        self::assertTrue($attrs['data-jarallax']);
    }

    #[Test]
    public function handleContentAlignMiddle(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->alignForTest(Collection::wrap(['valign' => 'middle']), $styles);

        self::assertStringContainsString('align-self: center', $styles->render());
    }

    #[Test]
    public function handleContentAlignBottom(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->alignForTest(Collection::wrap(['valign' => 'bottom']), $styles);

        self::assertStringContainsString('align-self: end', $styles->render());
    }

    #[Test]
    public function handleContentAlignDefaultAddsNothing(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->alignForTest(Collection::wrap(['valign' => 'top']), $styles);

        self::assertStringNotContainsString('align-self', $styles->render());
    }

    #[Test]
    public function prepareBasicCSSAddsBorderAndBoxShadow(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->basicForTest(
            Collection::wrap([
                'border' => ['enabled' => true, 'color' => 'red', 'style' => 'solid'],
                'box_shadow' => [
                    'enabled' => true,
                    'hoffset' => 1,
                    'voffset' => 2,
                    'blur' => 3,
                    'spread' => 4,
                    'color' => '#000',
                ],
                'padding' => ['lg' => '1', 'md' => '1', 'xs' => '1'],
                'margin' => ['lg' => '2', 'md' => '2', 'xs' => '2'],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('border-color: red', $css);
        self::assertStringContainsString('border-style: solid', $css);
        self::assertStringContainsString('box-shadow: 1px 2px 3px 4px #000', $css);
    }

    #[Test]
    public function prepareBasicCSSSkipsDisabledBorderAndShadow(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->basicForTest(
            Collection::wrap([
                'border' => ['enabled' => false, 'color' => 'red'],
                'box_shadow' => ['enabled' => false, 'color' => '#000'],
                'padding' => ['lg' => '1', 'md' => '1', 'xs' => '1'],
                'margin' => ['lg' => '2', 'md' => '2', 'xs' => '2'],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringNotContainsString('border-color', $css);
        self::assertStringNotContainsString('box-shadow', $css);
    }

    #[Test]
    public function prepareBackgroundCSSAddsOverlayAndImage(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->backgroundForTest(
            Collection::wrap([
                'background' => [
                    'overlay' => 'rgba(0,0,0,.5)',
                    'type' => 'image',
                    'color' => '#fff',
                    'image' => [
                        'url' => '/img/bg.jpg',
                        'size' => 'cover',
                        'position' => 'center',
                        'repeat' => 'no-repeat',
                        'attachment' => 'fixed',
                    ],
                ],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('.l-bg-overlay', $css);
        self::assertStringContainsString('background-color: rgba(0,0,0,.5)', $css);
        self::assertStringContainsString('background-image: url(/img/bg.jpg)', $css);
        self::assertStringContainsString('background-size: cover', $css);
        self::assertStringContainsString('background-attachment: fixed', $css);
    }

    #[Test]
    public function prepareBackgroundCSSAddsLinearGradient(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->backgroundForTest(
            Collection::wrap([
                'background' => [
                    'type' => 'gradient',
                    'gradient' => [
                        'type' => 'linear',
                        'angle' => 90,
                        'start_color' => '#fff',
                        'start_pos' => 0,
                        'end_color' => '#000',
                        'end_pos' => 100,
                    ],
                ],
            ]),
            $styles
        );

        self::assertStringContainsString(
            'linear-gradient(90deg, #fff 0%, #000 100%)',
            $styles->render()
        );
    }

    #[Test]
    public function prepareBackgroundCSSAddsRadialGradient(): void
    {
        $renderer = $this->createRenderer();
        $styles = new StyleContainer('.page');

        $renderer->backgroundForTest(
            Collection::wrap([
                'background' => [
                    'type' => 'gradient',
                    'gradient' => [
                        'type' => 'radial',
                        'start_color' => '#fff',
                        'start_pos' => 10,
                        'end_color' => '#000',
                        'end_pos' => 90,
                    ],
                ],
            ]),
            $styles
        );

        self::assertStringContainsString(
            'radial-gradient(#fff 10%, #000 90%)',
            $styles->render()
        );
    }

    #[Test]
    public function renderCustomCSSPushesCompiledCss(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects(self::once())
            ->method('internalCSS')
            ->with(self::stringContains('#my-id'));

        $renderer = $this->createRenderer(asset: $asset);

        $renderer->customCssForTest(
            Collection::wrap([
                'options' => ['html_id' => 'my-id', 'html_css' => 'color: red;'],
            ])
        );
    }

    #[Test]
    public function renderCustomCSSIgnoresInvalidScss(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects(self::never())->method('internalCSS');

        $renderer = $this->createRenderer(asset: $asset);

        $renderer->customCssForTest(
            Collection::wrap([
                'options' => ['html_id' => 'my-id', 'html_css' => '{{{ invalid'],
            ])
        );
    }

    private function createRenderer(
        string $animationDriver = 'none',
        ?AssetService $asset = null,
    ): TestPageRenderer {
        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAnimationDriver')->willReturn($animationDriver);

        if ($asset !== null) {
            $factory->method('getAsset')->willReturn($asset);
        }

        return new TestPageRenderer($factory, $this->createStub(RendererService::class));
    }
}

class TestPageRenderer extends AbstractPageRenderer
{
    protected string $cssPrefix = '.test';

    public function render(array $content, string $path): string
    {
        return '';
    }

    protected function prepareCSS(Collection $content): void {}

    protected function prepareJS(Collection $content): void {}

    public function alignForTest(Collection $options, StyleContainer $styles): void
    {
        $this->handleContentAlign($options, $styles);
    }

    public function basicForTest(Collection $options, StyleContainer $styles): void
    {
        $this->prepareBasicCSS($options, $styles);
    }

    public function backgroundForTest(Collection $options, StyleContainer $styles): void
    {
        $this->prepareBackgroundCSS($options, $styles);
    }

    public function customCssForTest(Collection $content): void
    {
        $this->renderCustomCSS($content);
    }
}
