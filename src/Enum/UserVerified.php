<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Enum;

use MyCLabs\Enum\Enum;
use UnexpectedValueException;
use Windwalker\Utilities\Contract\LanguageInterface;
use Windwalker\Utilities\Enum\EnumSingleton;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;

/**
 * The UserVerified enum class.
 *
 * @method static $this VERIFIED()
 * @method static $this UNVERIFIED()
 */
enum UserVerified: int implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    case VERIFIED = 1;

    case UNVERIFIED = 0;

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.user.verified.' . $this->getKey());
    }
}
