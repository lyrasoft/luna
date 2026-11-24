<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Script;

use Lyrasoft\Luna\Script\SRPScript;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AssetLink;
use Windwalker\Core\Asset\AssetService;

class SRPScriptTest extends TestCase
{
    private function createScript(AssetService $asset, UnicornScript $unicornScript): SRPScript
    {
        $script = new SRPScript($unicornScript);

        $prop = new ReflectionProperty($script, 'asset');
        $prop->setValue($script, $asset);

        return $script;
    }

    #[Test]
    public function loadRegisterAssetsLoadsSrpScripts(): void
    {
        $calls = [];
        $link = $this->createStub(AssetLink::class);
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->exactly(2))
            ->method('js')
            ->willReturnCallback(static function (string $uri) use (&$calls, $link): AssetLink {
                $calls[] = $uri;

                return $link;
            });

        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->expects($this->never())->method('addRoute');

        $this->createScript($asset, $unicornScript)->loadRegisterAssets();

        $this->assertSame(
            [
                '@vendor/@windwalker-io/srp/dist/client.min.js',
                '@vendor/lyrasoft/luna/dist/srp.js',
            ],
            $calls,
        );
    }

    #[Test]
    public function loadLoginAssetsAddsAuthRouteAndLoadsSrpScripts(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->exactly(2))
            ->method('js')
            ->with(
                $this->logicalOr(
                    '@vendor/@windwalker-io/srp/dist/client.min.js',
                    '@vendor/lyrasoft/luna/dist/srp.js',
                ),
            );

        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->expects($this->once())
            ->method('addRoute')
            ->with('@auth_ajax')
            ->willReturnSelf();

        $this->createScript($asset, $unicornScript)->loadLoginAssets();
    }
}
