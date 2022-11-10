<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleRules;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Exception\SassException;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Renderer\CompositeRenderer;

/**
 * The AbstractPageRenderer class.
 *
 * @since  1.5.2
 */
abstract class AbstractPageRenderer implements PageRendererInterface
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected string $cssPrefix = 'unknown';

    #[Inject]
    protected AssetService $asset;

    #[Inject]
    protected PageRendererFactory $factory;

    #[Inject]
    protected RendererService $rendererService;

    /**
     * addOffsets
     *
     * @param  StyleRules  $rules
     * @param  string      $rule
     * @param  string      $value
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function addOffsets(StyleRules $rules, string $rule, string $value): void
    {
        [$top, $right, $bottom, $left] = array_pad(explode(',', $value), 4, '');

        $rules->add($rule . '-top', $top);
        $rules->add($rule . '-right', $right);
        $rules->add($rule . '-bottom', $bottom);
        $rules->add($rule . '-left', $left);
    }

    /**
     * Method to get property Factory
     *
     * @return  PageRendererFactory
     *
     * @since  1.5.2
     */
    public function getFactory(): PageRendererFactory
    {
        return $this->factory;
    }

    /**
     * prepareAssets
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareAssets(Collection $content): void
    {
        $this->prepareCSS($content);
        $this->prepareJS($content);
    }

    /**
     * prepareCSS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    abstract protected function prepareCSS(Collection $content): void;

    /**
     * prepareJS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    abstract protected function prepareJS(Collection $content): void;

    /**
     * prepareElement
     *
     * @param  Collection  $options
     * @param  array       $classes
     * @param  array       $attrs
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
        if ($options->getDeep('animation.name') !== '') {
            $classes[] = 'wow';
            $classes[] = $options->getDeep('animation.name');
            $classes[] = 'animate__animated animate__' . $options->getDeep('animation.name');

            $attrs['data-wow-duration'] = ($options->getDeep('animation.duration') / 1000) . 's';
            $attrs['data-wow-delay'] = ($options->getDeep('animation.delay') / 1000) . 's';
        }

        // Video Background
        if ($options->getDeep('background.type') === 'video') {
            $this->factory->getScript()->jarallax();

            $classes[] = 'jarallax';

            if (
                str_contains($options->getDeep('background.video.url'), 'youtube.com')
                || str_contains($options->getDeep('background.video.url'), 'vimeo.com')
            ) {
                $attrs['data-jarallax-video'] = $options->getDeep('background.video.url');
            } else {
                $attrs['data-jarallax-video'] = sprintf(
                    'mp4: %s',
                    $options->getDeep('background.video.url')
                );
            }
        }

        // Use Parallax
        if ($options->getDeep('background.parallax')) {
            $this->factory->getScript()->jarallax();

            $classes[] = 'jarallax';

            $attrs['data-speed'] = '0.5';
            $attrs['data-jarallax'] = true;
        }
    }

    /**
     * prepareBasicCSS
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareBasicCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->self()
            ->add('color', $options->getDeep('text_color'))
            ->add('text-align', $options->getDeep('align'))
            ->add('width', '100%');

        $this->handleContentAlign($options, $styles);

        // Border
        if ($options->getDeep('border.enabled')) {
            $styles->rwd(function (StyleContainer $style, $size) use ($options) {
                $style->self()
                    ->add('border-width', $options->getDeep('border.width.' . $size), 'px');
            });

            $styles->self()
                ->add('border-color', $options->getDeep('border.color'))
                ->add('border-style', $options->getDeep('border.style'));
        }

        // Radius
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->self()->add('border-radius', $options->getDeep('border.radius.' . $size), 'px');
        });

        // Box shadow
        if ($options->getDeep('box_shadow.enabled')) {
            $shadow = sprintf(
                '%dpx %dpx %dpx %dpx %s',
                (int) $options->getDeep('box_shadow.hoffset'),
                (int) $options->getDeep('box_shadow.voffset'),
                (int) $options->getDeep('box_shadow.blur'),
                (int) $options->getDeep('box_shadow.spread'),
                $options->getDeep('box_shadow.color')
            );

            $styles->self()->add('box-shadow', $shadow);
        }

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            static::addOffsets($style->self(), 'padding', $options->getDeep('padding.' . $size));
            static::addOffsets($style->self(), 'margin', $options->getDeep('margin.' . $size));
        });
    }

    /**
     * prepareTitleCSS
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareTitleCSS(Collection $options, StyleContainer $styles): void
    {
        // Title
        $styles->select($this->cssPrefix . '__title')
            ->add('color', $options->getDeep('title.color'))
            ->add('font-weight', $options->getDeep('title.font_weight'));

        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select($this->cssPrefix . '__title')
                ->add(
                    'font-size',
                    $this->fontSize($options->getDeep('title.font_size.' . $size)),
                    $this->fontSizeUnit()
                )
                ->add('margin-top', $options->getDeep('title.margin_top.' . $size), 'px')
                ->add('margin-bottom', $options->getDeep('title.margin_bottom.' . $size), 'px');
        });

        // Subtitle
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select($this->cssPrefix . '__subtitle')
                ->add(
                    'font-size',
                    $this->fontSize($options->getDeep('title.font_size.' . $size)),
                    $this->fontSizeUnit()
                );
        });
    }

    /**
     * prepareBackgroundCSS
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareBackgroundCSS(Collection $options, StyleContainer $styles): void
    {
        $self = $styles->self();

        if ($options->getDeep('background.overlay') !== '') {
            $styles->select('.l-bg-overlay')
                ->add('background-color', $options->getDeep('background.overlay'));
        }

        switch ($options->getDeep('background.type')) {
            case 'color':
                $self->add('background-color', $options->getDeep('background.color'));
                break;

            case 'image':
                if ($options->getDeep('background.image.url') !== '') {
                    $self->add('background-image', sprintf('url(%s)', $options->getDeep('background.image.url')));
                }

                $self->add('background-size', $options->getDeep('background.image.size'));
                $self->add('background-position', $options->getDeep('background.image.position'));
                $self->add('background-repeat', $options->getDeep('background.image.repeat'));
                $self->add('background-attachment', $options->getDeep('background.image.attachment'));

                $self->add('background-color', $options->getDeep('background.color'));
                break;

            case 'gradient':
                if ($options->getDeep('background.gradient.type') === 'linear') {
                    $self->add(
                        'background-image',
                        sprintf(
                            'linear-gradient(%sdeg, %s %s%%, %s %s%%)',
                            $options->getDeep('background.gradient.angle'),
                            $options->getDeep('background.gradient.start_color'),
                            $options->getDeep('background.gradient.start_pos'),
                            $options->getDeep('background.gradient.end_color'),
                            $options->getDeep('background.gradient.end_pos')
                        )
                    );
                } else {
                    $self->add(
                        'background-image',
                        sprintf(
                            'radial-gradient(%s %s%%, %s %s%%)',
                            $options->getDeep('background.gradient.start_color'),
                            $options->getDeep('background.gradient.start_pos'),
                            $options->getDeep('background.gradient.end_color'),
                            $options->getDeep('background.gradient.end_pos')
                        )
                    );
                }
                break;
        }
    }

    /**
     * fontSize
     *
     * @param  float|string|null  $size
     *
     * @return  float|string|null
     *
     * @since  1.7.33
     */
    public function fontSize(float|string|null $size): float|string|null
    {
        if ($size === null || $size === '') {
            return $size;
        }

        return $size * 1; // static::getLuna()->get('page.styles.font_size_scale', 1);
    }

    /**
     * fontSizeUnit
     *
     * @return  string
     *
     * @since  1.7.33
     */
    public function fontSizeUnit(): string
    {
        return 'px'; // static::getLuna()->get('page.styles.font_size_unit', 'px');
    }

    /**
     * handleContentAlign
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.8.5
     */
    protected function handleContentAlign(Collection $options, StyleContainer $styles): void
    {
        switch ($options->getDeep('valign')) {
            case 'middle':
                $styles->selectAppend($this->cssPrefix . '__body')->add('align-self', 'center');
                break;

            case 'bottom':
                $styles->selectAppend($this->cssPrefix . '__body')->add('align-self', 'end');
                break;
        }
    }

    /**
     * internalCSS
     *
     * @param  string  $css
     *
     * @return  void
     *
     * @since  1.8.5
     */
    protected function internalCSS(string $css): void
    {
        if (trim($css)) {
            $this->asset->internalCSS($css);
        }
    }

    protected function doRender(string $layout, array $data): string
    {
        return $this->createRenderer()->render(
            $this->rendererService->resolveLayout($layout),
            $data
        );
    }

    public function createRenderer(): CompositeRenderer
    {
        return $this->rendererService->createRenderer();
    }

    /**
     * @param  Collection  $content
     *
     * @return  void
     *
     * @throws SassException
     */
    protected function renderCustomCSS(Collection $content): void
    {
        $scss = new Compiler();

        try {
            $css = $scss->compileString(
                "#{$content->getDeep('options.html_id')} { {$content->getDeep('options.html_css')} }"
            );

            $this->internalCSS($css->getCss());
        } catch (\Throwable) {
            //
        }
    }
}
