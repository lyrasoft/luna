<?php

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
     * @param  array   $content
     * @param  string  $i
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content, string $path): string;
}
