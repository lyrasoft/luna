<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Emptyspace;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\Data\DataInterface;
use Windwalker\Structure\Structure;

/**
 * The EmptyspaceAddon class.
 *
 * @since  1.5.2
 */
class EmptyspaceAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected static $type = 'emptyspace';

    /**
     * Property icon.
     *
     * @var  string
     */
    protected static $icon = 'far fa-square';

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
        $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
            $styles->select('.c-empty-space')
                ->add('height', $options['height.' . $size], 'px');
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
}
