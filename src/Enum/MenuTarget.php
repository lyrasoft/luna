<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Enum;

use MyCLabs\Enum\Enum;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;
use Windwalker\Utilities\Contract\LanguageInterface;

/**
 * The MenuTarget enum class.
 * 
 * @method static $this BLANK()
 * @method static $this SELF()
 * @method static $this PARENT()
 * @method static $this TOP()
 */
class MenuTarget extends Enum implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    public const BLANK = '_blank';
    public const SELF = '_self';
    public const PARENT = '_parent';
    public const TOP = '_top';

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
        parent::__construct($value ?: static::SELF);
    }

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $lang->trans('luna.menu.field.target.option.' . $this->getKey());
    }
}
