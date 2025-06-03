<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Enum;

use Windwalker\Utilities\Contract\LanguageInterface;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;

/**
 * The MenuTarget enum class.
 */
enum MenuTarget: string implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    case BLANK = '_blank';

    case SELF = '_self';

    case PARENT = '_parent';

    case TOP = '_top';

    public static function preprocessValue(mixed $value): mixed
    {
        return $value ?: self::SELF;
    }

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.menu.field.target.option.' . $this->name);
    }
}
