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
class UserEnabled extends EnumSingleton implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    public const ENABLED = 1;

    public const DISABLED = 0;

    /**
     * Creates a new value of some type
     *
     * @psalm-pure
     *
     * @param  mixed  $value
     *
     * @psalm-param T $value
     * @throws UnexpectedValueException if incompatible type is given.
     */
    public function __construct(mixed $value)
    {
        parent::__construct($value);
    }

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.user.enabled.' . $this->getKey());
    }
}
