<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget\Custom;

use Lyrasoft\Luna\Widget\AbstractWidget;
use Windwalker\Core\Language\LangService;

/**
 * The CustomTextWidget class.
 */
class CustomHtmlWidget extends AbstractWidget
{
    public static function getType(): string
    {
        return 'custom_html';
    }

    public static function getIcon(): string
    {
        return 'far fa-pencil';
    }

    public static function getDescription(LangService $lang): string
    {
        return $lang('luna.widget.custom.html.description');
    }
}
