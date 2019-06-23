<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu;

/**
 * Interface SeldRenderMenuInterface
 *
 * @since  1.7
 */
interface SelfRenderMenuInterface
{
    /**
     * render
     *
     * @param MenuNode $menu
     * @param array    $variables
     * @param array    $params
     *
     * @return  string
     *
     * @since  1.7
     */
    public function render(MenuNode $menu, array $variables, array $params): string;
}
