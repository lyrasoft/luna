<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Renderer\RendererService;

/**
 * The AbstractWidget class.
 */
abstract class AbstractWidget
{
    abstract public static function getType(): string;

    abstract public static function getIcon(): string;

    abstract public static function getDescription(LangService $lang): string;

    public function render(RendererService $renderer)
    {
        //
    }

    public function prepare(Widget $widget)
    {

    }
}
