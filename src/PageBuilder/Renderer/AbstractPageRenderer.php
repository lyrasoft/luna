<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\StyleHelper;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Structure\Structure;

/**
 * The AbstractPageRenderer class.
 *
 * @since  __DEPLOY_VERSION__
 */
abstract class AbstractPageRenderer implements PageRendererInterface
{
    /**
     * Property asset.
     *
     * @Inject()
     *
     * @var AssetManager
     */
    protected $asset;

    /**
     * Property factory.
     *
     * @Inject()
     *
     * @var PageRendererFactory
     */
    protected $factory;

    /**
     * Method to get property Factory
     *
     * @return  PageRendererFactory
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getFactory()
    {
        return $this->factory;
    }

    /**
     * prepareAssets
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareAssets(Structure $content)
    {
        $this->prepareCSS($content);
        $this->prepareJS($content);
    }

    /**
     * prepareCSS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function prepareCSS(Structure $content);

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function prepareJS(Structure $content);

    /**
     * prepareElement
     *
     * @param Structure $options
     * @param array     $classes
     * @param array     $attrs
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function prepareElement(Structure $options, array &$classes, array &$attrs)
    {
        if ($options['animation.name'] !== '') {
            LunaScript::wow(true);
            LunaScript::animate();

            $classes[] = 'wow';
            $classes[] = $options['animation.name'];

            $attrs['data-wow-duration'] = $options['animation.duration'] . 'ms';
            $attrs['data-wow-delay'] = $options['animation.delay'] . 'ms';
        }

        // Video Background
        if ($options['background.type'] === 'video') {
            LunaScript::jarallax();

            $classes[] = 'jarallax';

            if (strpos($options['background.video.url'], 'youtube.com') !== false
                || strpos($options['background.video.url'], 'vimeo.com') !== false) {
                $attrs['data-jarallax-video'] = $options['background.video.url'];
            } else {
                $attrs['data-jarallax-video'] = sprintf(
                    'mp4: %s',
                    $options['background.video.url']
                );
            }
        }

        // Use Parallax
        if ($options['background.parallax']) {
            LunaScript::jarallax();

            $classes[] = 'jarallax';

            $attrs['data-speed'] = '0.5';
            $attrs['data-jarallax'] = true;
        }
    }

    /**
     * prepareBasicCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareBasicCSS(Structure $options, StyleContainer $styles)
    {
        $styles->self()
            ->add('color', $options['text_color'])
            ->add('text-align', $options['align'])
            ;

        switch ($options['valign']) {
            case 'middle':
                $styles->select('.l-column__body')->add('align-items', 'center');
                break;

            case 'bottom':
                $styles->select('.l-column__body')->add('align-items', 'end');
                break;
        }

        // Border
        if ($options['border.enabled']) {
            $styles->rwd(function (StyleContainer $style, $size) use ($options) {
                $style->self()
                    ->add('border-width', $options['border.width.' . $size], 'px');
            });

            $styles->self()
                ->add('border-color', $options['border.color'])
                ->add('border-style', $options['border.style']);
        }

        // Radius
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->self()->add('border-radius', $options['border.radius.' . $size], 'px');
        });

        // Box shadow
        if ($options['box_shadow.enabled']) {
            $shadow = sprintf(
                '%dpx %dpx %dpx %dpx %s',
                (int) $options['box_shadow.hoffset'],
                (int) $options['box_shadow.voffset'],
                (int) $options['box_shadow.blur'],
                (int) $options['box_shadow.spread'],
                $options['box_shadow.color']
            );

            $styles->self()->add('box-shadow', $shadow);
        }
    }

    /**
     * prepareTitleCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareTitleCSS(Structure $options, StyleContainer $styles)
    {
        // Title
        $styles->select('.c-section-title')
            ->add('color', $options['title.color'])
            ->add('font-weight', $options['title.font_weight']);

        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select('.c-section-title')
                ->add('font-size', $options['title.font_size.' . $size], 'px')
                ->add('margin-top', $options['title.margin_top.' . $size], 'px')
                ->add('margin-bottom', $options['title.margin_bottom.' . $size], 'px');
        });

        // Subtitle
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select('.c-section-subtitle')
                ->add('font-size', $options['title.font_size.' . $size], 'px');
        });

        // Title & Subtitle
        $styles->select('.l-section__header')
            ->add('text-align', $options['title_align']);

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            StyleHelper::addOffsets($style->self(), 'padding', $options['padding.' . $size]);
            StyleHelper::addOffsets($style->self(), 'margin', $options['margin.' . $size]);
        });
    }

    /**
     * prepareBackgroundCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareBackgroundCSS(Structure $options, StyleContainer $styles)
    {
        $self = $styles->self();

        if ($options['background.overlay'] !== '') {
            $styles->select('.l-bg-overlay')
                ->add('background-color', $options['background.overlay']);
        }

        switch ($options['background.type']) {
            case 'color':
                $self->add('background-color', $options['background.color']);
                break;

            case 'image':
                if ($options['background.image.url'] !== '') {
                    $self->add('background-image', sprintf('url(%s)', $options['background.image.url']));
                }

                $self->add('background-size', $options['background.image.size']);
                $self->add('background-position', $options['background.image.position']);
                $self->add('background-repeat', $options['background.image.repeat']);
                $self->add('background-attachment', $options['background.image.attachment']);
                break;

            case 'gradient':
                if ($options['background.gradient.type'] === 'linear') {
                    $self->add('background-image', sprintf(
                        'linear-gradient(%sdeg, %s %s%%, %s %s%%)',
                        $options['background.gradient.angle'],
                        $options['background.gradient.start_color'],
                        $options['background.gradient.start_pos'],
                        $options['background.gradient.end_color'],
                        $options['background.gradient.end_pos']
                    ));
                } else {
                    $self->add('background-image', sprintf(
                        'radial-gradient(%s %s%%, %s %s%%)',
                        $options['background.gradient.start_color'],
                        $options['background.gradient.start_pos'],
                        $options['background.gradient.end_color'],
                        $options['background.gradient.end_pos']
                    ));
                }
                break;
        }
    }
}
