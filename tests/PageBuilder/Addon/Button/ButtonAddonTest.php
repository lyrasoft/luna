<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Addon\Button;

use Lyrasoft\Luna\PageBuilder\Addon\Button\ButtonAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Data\Collection;

class ButtonAddonTest extends TestCase
{
    #[Test]
    public function prepareCSSSetsBorderRadiusOnButton(): void
    {
        $addon = (new \ReflectionClass(ButtonAddon::class))->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(new Collection(['border_radius' => 8]), $styles);

        self::assertStringContainsString('#page .c-button', $styles->render());
        self::assertStringContainsString('border-radius: 8px;', $styles->render());
    }
}
