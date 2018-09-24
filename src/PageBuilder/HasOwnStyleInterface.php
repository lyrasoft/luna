<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Structure\Structure;

/**
 * Interface HasOwnStyleInterface
 *
 * @since  __DEPLOY_VERSION__
 */
interface HasOwnStyleInterface
{
    /**
     * prepareCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public function prepareCSS(Structure $options, StyleContainer $styles);

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
    public function prepareElement(Structure $options, array &$classes, array &$attrs);
}
