<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Legacy\Structure\Structure;

/**
 * Interface HasOwnStyleInterface
 *
 * @since  1.5.2
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
     * @since  1.5.2
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
     * @since  1.5.2
     */
    public function prepareElement(Structure $options, array &$classes, array &$attrs);
}
