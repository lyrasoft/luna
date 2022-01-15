<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Captcha;

/**
 * Interface CaptchaDriverInterface
 *
 * @since  1.5.1
 */
interface CaptchaDriverInterface
{
    /**
     * input
     *
     * @param  array  $attrs
     * @param  array  $options
     *
     * @return  string
     *
     * @since  1.5.1
     */
    public function input(array $attrs = [], array $options = []): string;

    /**
     * verify
     *
     * @param  mixed  $value
     * @param  array  $options
     *
     * @return  bool
     *
     * @since  1.5.1
     */
    public function verify(mixed $value, array $options = []): bool;
}
