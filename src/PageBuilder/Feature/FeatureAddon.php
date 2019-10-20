<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Feature;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\AbstractPageRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\Data\DataInterface;
use Windwalker\Structure\Structure;

/**
 * The FeatureAddon class.
 *
 * @since  1.5.2
 */
class FeatureAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected static $type = 'feature';

    /**
     * Property icon.
     *
     * @var  string
     */
    protected static $icon = 'fa fa-rocket';

    /**
     * prepareData
     *
     * @param DataInterface $data
     *
     * @return  void
     */
    protected function prepareData(DataInterface $data)
    {
    }

    /**
     * prepareCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareCSS(Structure $options, StyleContainer $styles)
    {
        if ($options['layout_type'] === 'icon') {
            $styles->select('.c-feature-icon__wrapper')
                ->add('border-color', $options['icon.border.color'])
                ->add('border-style', $options['icon.border.style'])
                ->add('color', $options['icon.color'])
                ->add('background-color', $options['icon.bg_color']);

            $styles->select('.c-feature-icon__wrapper')
                ->add('border-color', $options['icon.border.color'])
                ->add('border-style', $options['icon.border.style']);

            $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
                $styles->select('.c-feature-icon__wrapper')
                    ->add('border-width', $options['icon.border.width.' . $size], 'px')
                    ->add('border-radius', $options['icon.border.radius.' . $size], 'px')
                    ->add('margin-top', $options['icon.margin_top.' . $size], 'px')
                    ->add('margin-bottom', $options['icon.margin_bottom.' . $size], 'px');

                AbstractPageRenderer::addOffsets(
                    $styles->select('.c-feature-icon__wrapper'),
                    'padding',
                    $options['icon.padding.' . $size]
                );

                $styles->select('.c-feature-icon__wrapper > span')
                    ->add('font-size', $options['icon.font_size.' . $size], 'px')
                    ->add('width', $options['icon.font_size.' . $size], 'px')
                    ->add('height', $options['icon.font_size.' . $size], 'px')
                    ->add('line-height', $options['icon.font_size.' . $size], 'px');
            });
        }

        $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
            $styles->select('.c-addon__content-text')
                ->add('font-size', $options['content_font_size.' . $size], 'px')
                ->add('line-height', $options['content_line_height.' . $size], 'px');
        });
    }

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
    public function prepareElement(Structure $options, array &$classes, array &$attrs)
    {
    }

    /**
     * loadVueComponent
     *
     * @param AssetManager $asset
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function loadVueComponent(AssetManager $asset)
    {
    }
}
