<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleRules;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Structure\Structure;

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
    protected $cssPrefix = 'unlnown';

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
     * addOffsets
     *
     * @param StyleRules $rules
     * @param string     $rule
     * @param string     $value
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function addOffsets(StyleRules $rules, $rule, $value)
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
     * @since  1.5.2
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
     * @since  1.5.2
     */
    abstract protected function prepareCSS(Structure $content);

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  1.5.2
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
     * @since  1.5.2
     */
    public static function prepareElement(Structure $options, array &$classes, array &$attrs)
    {
        if ($options['animation.name'] !== '') {
            LunaScript::wow(true);
            LunaScript::animate();

            $classes[] = 'wow';
            $classes[] = $options['animation.name'];

            $attrs['data-wow-duration'] = ($options['animation.duration'] / 1000) . 's';
            $attrs['data-wow-delay']    = ($options['animation.delay'] / 1000) . 's';
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

            $attrs['data-speed']    = '0.5';
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
     * @since  1.5.2
     */
    protected function prepareBasicCSS(Structure $options, StyleContainer $styles)
    {
        $styles->self()
            ->add('color', $options['text_color'])
            ->add('text-align', $options['align'])
            ->add('width', '100%');

        $this->handleContentAlign($options, $styles);

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

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            static::addOffsets($style->self(), 'padding', $options['padding.' . $size]);
            static::addOffsets($style->self(), 'margin', $options['margin.' . $size]);
        });
    }

    /**
     * prepareTitleCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareTitleCSS(Structure $options, StyleContainer $styles)
    {
        // Title
        $styles->select($this->cssPrefix . '__title')
            ->add('color', $options['title.color'])
            ->add('font-weight', $options['title.font_weight']);

        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select($this->cssPrefix . '__title')
                ->add('font-size', $this->fontSize($options['title.font_size.' . $size]), $this->fontSizeUnit())
                ->add('margin-top', $options['title.margin_top.' . $size], 'px')
                ->add('margin-bottom', $options['title.margin_bottom.' . $size], 'px');
        });

        // Subtitle
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select($this->cssPrefix . '__subtitle')
                ->add('font-size', $this->fontSize($options['title.font_size.' . $size]), $this->fontSizeUnit());
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
     * @since  1.5.2
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

    /**
     * getLuna
     *
     * @return  LunaPackage
     *
     * @since  1.7.33
     */
    public static function getLuna(): LunaPackage
    {
        return LunaHelper::getPackage();
    }

    /**
     * fontSize
     *
     * @param float|string|null $size
     *
     * @return  float|string|null
     *
     * @since  1.7.33
     */
    public function fontSize($size)
    {
        if ($size === null || $size === '') {
            return $size;
        }

        return $size * static::getLuna()->get('page.styles.font_size_scale', 1);
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
        return static::getLuna()->get('page.styles.font_size_unit', 'px');
    }

    /**
     * handleContentAlign
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  1.8.5
     */
    protected function handleContentAlign(Structure $options, StyleContainer $styles): void
    {
        switch ($options['valign']) {
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
     * @param string $css
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
}
