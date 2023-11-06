<?php

namespace Lyrasoft\Luna\Captcha;

/**
 * Interface CaptchaImageInterface
 *
 * @since  1.5.2
 */
interface CaptchaImageInterface
{
    /**
     * image
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function image(): string;

    /**
     * output
     *
     * @since  1.5.2
     */
    public function output(): void;

    /**
     * base64
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function base64(): string;

    /**
     * contentType
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function contentType(): string;
}
