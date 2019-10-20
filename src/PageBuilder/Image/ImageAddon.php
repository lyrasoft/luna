<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Image;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\Data\DataInterface;
use Windwalker\Structure\Structure;

/**
 * The ImageAddon class.
 *
 * @since  1.5.2
 */
class ImageAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected static $type = 'image';

    /**
     * Property icon.
     *
     * @var  string
     */
    protected static $icon = 'fa fa-image';

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
        $styles->select('.c-image')
            ->add('border-radius', $options['border_radius'], 'px');
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
}
