<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Enum;

use MyCLabs\Enum\Enum;
use UnexpectedValueException;
use Windwalker\Utilities\Contract\LanguageInterface;
use Windwalker\Utilities\Enum\EnumSingleton;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;

/**
 * The MenuTarget enum class.
 *
 * @method static $this BLANK()
 * @method static $this SELF()
 * @method static $this PARENT()
 * @method static $this TOP()
 */
enum MenuTarget: string implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    case BLANK = '_blank';

    case SELF = '_self';

    case PARENT = '_parent';

    case TOP = '_top';

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.menu.field.target.option.' . $this->getKey());
    }
}
