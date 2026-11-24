<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Script;

use Lyrasoft\Luna\Script\PageScript;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AssetService;

class PageScriptTest extends TestCase
{
    private function createScript(AssetService $asset, UnicornScript $unicornScript): PageScript
    {
        $script = new PageScript($unicornScript);

        $prop = new ReflectionProperty($script, 'asset');
        $prop->setValue($script, $asset);

        return $script;
    }

    public static function animationProvider(): array
    {
        return [
            ['fadeInUp', 'fade-up'],
            ['fadeInDownBig', 'fade-down'],
            ['flipInX', 'flip-up'],
            ['rotateInUpRight', 'fade-up'],
            ['zoomInLeft', 'zoom-in-left'],
            ['bounceIn', 'zoom-in'],
            ['unknownAnimation', 'fade'],
        ];
    }

    #[Test]
    #[DataProvider('animationProvider')]
    public function wowToAOS(string $animation, string $expected): void
    {
        self::assertSame($expected, PageScript::wowToAOS($animation));
    }

    #[Test]
    public function wowLoadsAssetWhenInstalled(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->with('@vendor/wow.js/dist/wow.min.js')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('js')
            ->with('@vendor/wow.js/dist/wow.min.js');
        $asset->expects($this->once())
            ->method('internalJS')
            ->with('new WOW().init();');
        $asset->expects($this->never())
            ->method('isDebug');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->wow();
    }

    #[Test]
    public function wowWarnsInDebugWhenNotInstalled(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->willReturn(false);
        $asset->expects($this->once())
            ->method('isDebug')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('internalJS')
            ->with("console.warn('Please install `wow.js` module to support animation.')");
        $asset->expects($this->never())
            ->method('js');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->wow();
    }

    #[Test]
    public function wowSilentWhenNotInstalledAndNotDebug(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->willReturn(false);
        $asset->expects($this->once())
            ->method('isDebug')
            ->willReturn(false);
        $asset->expects($this->never())
            ->method('internalJS');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->wow();
    }

    #[Test]
    public function wowRunsOnlyOncePerInstance(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('js');
        $asset->expects($this->once())
            ->method('internalJS');

        $script = $this->createScript($asset, $this->createStub(UnicornScript::class));
        $script->wow();
        $script->wow();
    }

    #[Test]
    public function jarallaxLoadsCssAndTwoScripts(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->with('@vendor/jarallax/dist/jarallax.min.js')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('css')
            ->with('@vendor/jarallax/dist/jarallax.min.css');
        $asset->expects($this->exactly(2))
            ->method('js');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->jarallax();
    }

    #[Test]
    public function jarallaxWarnsInDebugWhenMissing(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->willReturn(false);
        $asset->expects($this->once())
            ->method('isDebug')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('internalJS')
            ->with("console.warn('Please install `jarallax` module to support parallax scroll.')");

        $this->createScript($asset, $this->createStub(UnicornScript::class))->jarallax();
    }

    #[Test]
    public function animateLoadsCssWhenInstalled(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->with('@vendor/animate.css/animate.min.css')
            ->willReturn('/media/animate.min.css');
        $asset->expects($this->once())
            ->method('css')
            ->with('@vendor/animate.css/animate.min.css');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->animate();
    }

    #[Test]
    public function animateWarnsInDebugWhenMissing(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('has')
            ->willReturn(false);
        $asset->expects($this->once())
            ->method('isDebug')
            ->willReturn(true);
        $asset->expects($this->once())
            ->method('internalJS')
            ->with("console.warn('Please install `animate.css` module to support animation.')");

        $this->createScript($asset, $this->createStub(UnicornScript::class))->animate();
    }

    #[Test]
    public function aosImportsMainThenCallback(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with('u.$luna.useAOS();');

        $this->createScript($this->createStub(AssetService::class), $unicornScript)->aos();
    }
}
