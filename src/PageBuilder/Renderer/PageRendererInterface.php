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
 * @since  1.5.2
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
     * @since  1.5.2
     */
    public function render(array $content);
}
