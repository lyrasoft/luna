<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Captcha;

use DomainException;
use Gregwar\Captcha\CaptchaBuilder;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\State\AppState;
use Windwalker\Utilities\Arr;
use Windwalker\Utilities\Options\OptionAccessTrait;

use function Windwalker\chronos;

/**
 * The GregwarDriver class.
 *
 * @since  1.5.2
 */
class GregwarDriver implements CaptchaDriverInterface, CaptchaImageInterface
{
    use OptionAccessTrait;
    use TranslatorTrait;

    protected CaptchaBuilder $builder;

    public function __construct(
        protected AppState $state,
        protected RendererService $rendererService,
        array $options = []
    ) {
        if (!class_exists(CaptchaBuilder::class)) {
            throw new DomainException('Please install gregwar/captcha first.');
        }

        $this->builder = new CaptchaBuilder();
        $this->options = $options;
    }

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
    public function input(array $attrs = [], array $options = []): string
    {
        $attrs['placeholder'] = $attrs['placeholder'] ??= $this->trans('luna.captcha.gregwar.input.placeholder');

        return $this->rendererService->render(
            '@theme::captcha.gregwar',
            [
                'attrs' => $attrs,
                'options' => Arr::mergeRecursive($this->options, $options),
            ],
        );
    }

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
    public function verify(mixed $value, array $options = []): bool
    {
        $key = $this->getOption('session_key', 'captcha');
        $lifetime = $this->getOption('lifetime', 300);

        $content = $this->state->get($key) ?: [];

        $phrase = (string) ($content['phrase'] ?? '');
        $time = (int) ($content['time'] ?? 0);

        if ($phrase === '' || !$time) {
            return false;
        }

        // Phase check
        if (strtolower($value) !== strtolower($phrase)) {
            return false;
        }

        $now = chronos('now');
        $expired = chronos($time)->modify('+' . $lifetime . 'seconds');

        // Is Expired
        return $expired > $now;
    }

    /**
     * image
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function image(): string
    {
        return $this->build()->get($this->getOption('quality', 90));
    }

    /**
     * output
     *
     * @since  1.5.2
     */
    public function output(): void
    {
        $builder = $this->build();

        header('Content-Type: ' . $this->contentType());

        $builder->output($this->getOption('quality', 90));
    }

    /**
     * base64
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function base64(): string
    {
        return $this->build()->inline($this->getOption('quality', 90));
    }

    /**
     * build
     *
     * @return CaptchaBuilder
     *
     * @since  1.5.2
     */
    protected function build(): CaptchaBuilder
    {
        $builder = $this->getBuilder();
        $builder->build();

        $key = $this->getOption('session_key', 'captcha');

        $this->state->remember($key, [
            'phrase' => $builder->getPhrase(),
            'time' => chronos()->toUnix(),
        ]);

        return $builder;
    }

    /**
     * contentType
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function contentType(): string
    {
        return 'image/jpeg';
    }

    /**
     * Method to get property Builder
     *
     * @return  CaptchaBuilder
     *
     * @since  1.5.2
     */
    public function getBuilder(): CaptchaBuilder
    {
        return $this->builder;
    }

    /**
     * Method to set property builder
     *
     * @param  CaptchaBuilder  $builder
     *
     * @return  static  Return self to support chaining.
     *
     * @since  1.5.2
     */
    public function setBuilder(CaptchaBuilder $builder): static
    {
        $this->builder = $builder;

        return $this;
    }
}
