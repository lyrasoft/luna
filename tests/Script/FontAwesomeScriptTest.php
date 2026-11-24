<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Script;

use Lyrasoft\Luna\Script\FontAwesomeScript;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Core\Asset\AssetLink;
use Windwalker\Core\Asset\AssetService;

class FontAwesomeScriptTest extends TestCase
{
    /**
     * @return  array{0: AssetService, 1: \ArrayObject<int, string>}
     */
    private function createAsset(): array
    {
        $calls = new \ArrayObject();
        $link = $this->createStub(AssetLink::class);
        $asset = $this->createStub(AssetService::class);
        $asset->method('css')
            ->willReturnCallback(static function (string $uri) use ($calls, $link): AssetLink {
                $calls[] = 'css:' . $uri;

                return $link;
            });
        $asset->method('js')
            ->willReturnCallback(static function (string $uri) use ($calls, $link): AssetLink {
                $calls[] = 'js:' . $uri;

                return $link;
            });

        return [$asset, $calls];
    }

    private function createScript(AssetService $asset): FontAwesomeScript
    {
        $script = new FontAwesomeScript();

        $prop = new ReflectionProperty($script, 'asset');
        $prop->setValue($script, $asset);

        return $script;
    }

    /**
     * @return  \Generator<string, array{0: int, 1: string[]}>
     */
    public static function cssFontProvider(): \Generator
    {
        $base = 'vendor/@fortawesome/fontawesome-free/css';

        yield 'default set' => [
            FontAwesomeScript::DEFAULT_SET,
            [
                "css:$base/fontawesome.min.css",
                "css:$base/solid.min.css",
                "css:$base/regular.min.css",
                "css:$base/brands.min.css",
            ],
        ];

        yield 'all uses all.min.css' => [
            FontAwesomeScript::ALL,
            ["css:$base/all.min.css"],
        ];

        yield 'all with v4 shims' => [
            FontAwesomeScript::ALL | FontAwesomeScript::V4_SHIMS,
            ["css:$base/all.min.css", "css:$base/v4-shims.min.css"],
        ];

        yield 'pro uses pro package' => [
            FontAwesomeScript::PRO | FontAwesomeScript::LIGHT,
            [
                'css:vendor/@fortawesome/fontawesome-pro/css/fontawesome.min.css',
                'css:vendor/@fortawesome/fontawesome-pro/css/light.min.css',
            ],
        ];

        yield 'thin and duotone only' => [
            FontAwesomeScript::THIN | FontAwesomeScript::DUOTONE,
            [
                "css:$base/fontawesome.min.css",
                "css:$base/thin.min.css",
                "css:$base/duotone.min.css",
            ],
        ];
    }

    /**
     * @param  string[]  $expected
     */
    #[Test]
    #[DataProvider('cssFontProvider')]
    public function cssFont(int $options, array $expected): void
    {
        [$asset, $calls] = $this->createAsset();

        $this->createScript($asset)->cssFont($options);

        $this->assertSame($expected, $calls->getArrayCopy());
    }

    /**
     * @return  \Generator<string, array{0: int, 1: string[]}>
     */
    public static function jsSvgProvider(): \Generator
    {
        $base = 'vendor/@fortawesome/fontawesome-free/js';

        yield 'default set' => [
            FontAwesomeScript::DEFAULT_SET,
            [
                "js:$base/fontawesome.min.js",
                "js:$base/solid.min.js",
                "js:$base/regular.min.js",
                "js:$base/brands.min.js",
            ],
        ];

        yield 'all uses all.min.js' => [
            FontAwesomeScript::ALL,
            ["js:$base/all.min.js"],
        ];

        yield 'all with v4 shims' => [
            FontAwesomeScript::ALL | FontAwesomeScript::V4_SHIMS,
            ["js:$base/all.min.js", "js:$base/v4-shims.min.js"],
        ];

        yield 'light, thin and duotone only' => [
            FontAwesomeScript::LIGHT | FontAwesomeScript::THIN | FontAwesomeScript::DUOTONE,
            [
                "js:$base/fontawesome.min.js",
                "js:$base/light.min.js",
                "js:$base/thin.min.js",
                "js:$base/duotone.min.js",
            ],
        ];

        yield 'pro uses pro package' => [
            FontAwesomeScript::PRO | FontAwesomeScript::BRANDS,
            [
                'js:vendor/@fortawesome/fontawesome-pro/js/fontawesome.min.js',
                'js:vendor/@fortawesome/fontawesome-pro/js/brands.min.js',
            ],
        ];
    }

    /**
     * @param  string[]  $expected
     */
    #[Test]
    #[DataProvider('jsSvgProvider')]
    public function jsSvg(int $options, array $expected): void
    {
        [$asset, $calls] = $this->createAsset();

        $this->createScript($asset)->jsSvg($options);

        $this->assertSame($expected, $calls->getArrayCopy());
    }

    #[Test]
    public function defaultOptionsUseDefaultSet(): void
    {
        [$asset, $calls] = $this->createAsset();

        $this->createScript($asset)->cssFont();

        $this->assertSame(
            [
                'css:vendor/@fortawesome/fontawesome-free/css/fontawesome.min.css',
                'css:vendor/@fortawesome/fontawesome-free/css/solid.min.css',
                'css:vendor/@fortawesome/fontawesome-free/css/regular.min.css',
                'css:vendor/@fortawesome/fontawesome-free/css/brands.min.css',
            ],
            $calls->getArrayCopy(),
        );
    }
}
