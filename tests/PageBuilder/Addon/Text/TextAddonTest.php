<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Addon\Text;

use Lyrasoft\Luna\PageBuilder\Addon\Text\TextAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Data\Collection;

class TextAddonTest extends TestCase
{
    #[Test]
    public function prepareCSSSetsResponsiveFontSizeAndLineHeight(): void
    {
        $addon = (new \ReflectionClass(TextAddon::class))->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(
            new Collection([
                'content_font_size' => ['lg' => 16, 'md' => 14, 'xs' => 12],
                'content_line_height' => ['lg' => 24, 'md' => 20, 'xs' => 18],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('#page .c-addon__content-text', $css);
        self::assertStringContainsString('font-size: 16px;', $css);
        self::assertStringContainsString('font-size: 14px;', $css);
        self::assertStringContainsString('font-size: 12px;', $css);
        self::assertStringContainsString('line-height: 24px;', $css);
        self::assertStringContainsString('line-height: 20px;', $css);
        self::assertStringContainsString('line-height: 18px;', $css);
    }
}
