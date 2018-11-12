<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

/**
 * Interface PageRendererInterface
 *
 * @since  __DEPLOY_VERSION__
 */
interface PageRendererInterface
{
    /**
     * render
     *
     * @param array $content
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function render(array $content);
}
