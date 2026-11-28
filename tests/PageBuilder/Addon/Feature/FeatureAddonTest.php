<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Addon\Feature;

use Lyrasoft\Luna\PageBuilder\Addon\Feature\FeatureAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Data\Collection;

class FeatureAddonTest extends TestCase
{
    #[Test]
    public function prepareCSSAddsIconStylesWhenLayoutIsIcon(): void
    {
        $addon = new \ReflectionClass(FeatureAddon::class)->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(
            new Collection([
                'layout_type' => 'icon',
                'icon' => [
                    'color' => '#111111',
                    'bg_color' => '#222222',
                    'border' => [
                        'color' => '#333333',
                        'style' => 'solid',
                        'width' => ['lg' => 2, 'md' => 3, 'xs' => 4],
                        'radius' => ['lg' => 10, 'md' => 8, 'xs' => 6],
                    ],
                    'margin_top' => ['lg' => 5, 'md' => 5, 'xs' => 5],
                    'margin_bottom' => ['lg' => 7, 'md' => 7, 'xs' => 7],
                    'padding' => ['lg' => '9,10,9,10', 'md' => '9,10,9,10', 'xs' => '9,10,9,10'],
                    'font_size' => ['lg' => 30, 'md' => 26, 'xs' => 22],
                ],
                'content_font_size' => ['lg' => 16, 'md' => 14, 'xs' => 12],
                'content_line_height' => ['lg' => 24, 'md' => 20, 'xs' => 18],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('#page .c-feature-icon__wrapper', $css);
        self::assertStringContainsString('border-color: #333333;', $css);
        self::assertStringContainsString('border-style: solid;', $css);
        self::assertStringContainsString('color: #111111;', $css);
        self::assertStringContainsString('background-color: #222222;', $css);
        self::assertStringContainsString('border-width: 3px;', $css);
        self::assertStringContainsString('border-radius: 8px;', $css);
        self::assertStringContainsString('margin-top: 5px;', $css);
        self::assertStringContainsString('margin-bottom: 7px;', $css);
        self::assertStringContainsString('padding-top: 9;', $css);
        self::assertStringContainsString('padding-right: 10;', $css);
        self::assertStringContainsString('#page .c-feature-icon__wrapper > span', $css);
        self::assertStringContainsString('font-size: 30px;', $css);
        self::assertStringContainsString('font-size: 22px;', $css);
        self::assertStringContainsString('#page .c-addon__content-text', $css);
        self::assertStringContainsString('line-height: 18px;', $css);
    }

    #[Test]
    public function prepareCSSSkipsIconStylesForOtherLayouts(): void
    {
        $addon = new \ReflectionClass(FeatureAddon::class)->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(
            new Collection([
                'layout_type' => 'box',
                'content_font_size' => ['lg' => 16, 'md' => 14, 'xs' => 12],
                'content_line_height' => ['lg' => 24, 'md' => 20, 'xs' => 18],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringNotContainsString('c-feature-icon__wrapper', $css);
        self::assertStringContainsString('#page .c-addon__content-text', $css);
    }
}
