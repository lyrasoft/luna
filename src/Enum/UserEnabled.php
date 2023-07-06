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
 * The UserEnabled enum class.
 *
 * @method static $this ENABLED()
 * @method static $this DISABLED()
 */
enum UserEnabled: int implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    case ENABLED = 1;

    case DISABLED = 0;

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.user.enabled.' . $this->getKey());
    }
}
