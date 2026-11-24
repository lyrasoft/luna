<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Addon\Emptyspace;

use Lyrasoft\Luna\PageBuilder\Addon\Emptyspace\EmptyspaceAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Data\Collection;

class EmptyspaceAddonTest extends TestCase
{
    #[Test]
    public function prepareCSSSetsResponsiveHeight(): void
    {
        $addon = (new \ReflectionClass(EmptyspaceAddon::class))->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(
            new Collection([
                'height' => ['lg' => 120, 'md' => 80, 'xs' => 40],
            ]),
            $styles
        );

        $css = $styles->render();

        self::assertStringContainsString('#page .c-empty-space', $css);
        self::assertStringContainsString('height: 120px;', $css);
        self::assertStringContainsString('height: 80px;', $css);
        self::assertStringContainsString('height: 40px;', $css);
        self::assertStringContainsString('@media (max-width: 991px) and (min-width: 768px)', $css);
        self::assertStringContainsString('@media (max-width: 767px)', $css);
    }
}
