<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Enum;

use MyCLabs\Enum\Enum;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;
use Windwalker\Utilities\Contract\LanguageInterface;

/**
 * The UserEnabled enum class.
 * 
 * @method static $this ENABLED()
 * @method static $this DISABLED()
 */
class UserEnabled extends Enum implements EnumTranslatableInterface
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
     * @throws \UnexpectedValueException if incompatible type is given.
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
