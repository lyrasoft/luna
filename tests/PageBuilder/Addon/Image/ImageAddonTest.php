<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Addon\Image;

use Lyrasoft\Luna\PageBuilder\Addon\Image\ImageAddon;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Data\Collection;

class ImageAddonTest extends TestCase
{
    #[Test]
    public function prepareCSSSetsBorderRadiusOnImage(): void
    {
        $addon = (new \ReflectionClass(ImageAddon::class))->newInstanceWithoutConstructor();
        $styles = new StyleContainer('#page');

        $addon->prepareCSS(new Collection(['border_radius' => 12]), $styles);

        self::assertStringContainsString('#page .c-image', $styles->render());
        self::assertStringContainsString('border-radius: 12px;', $styles->render());
    }
}
