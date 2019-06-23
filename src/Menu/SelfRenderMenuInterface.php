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
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public function render(MenuNode $menu, array $variables, array $params): string;
}
