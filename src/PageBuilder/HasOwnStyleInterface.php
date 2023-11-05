<?php

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Data\Collection;
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
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareCSS(Collection $options, StyleContainer $styles): void;

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
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void;
}
