<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Windwalker\DI\Container;

/**
 * The PageRendererFactory class.
 *
 * @since  1.5.2
 */
class PageRendererFactory
{
    /**
     * PageRendererFactory constructor.
     */
    public function __construct(protected Container $container)
    {
    }

    /**
     * create
     *
     * @param string $type
     *
     * @return  PageRendererInterface
     *
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  1.5.2
     */
    public function create(string $type): PageRendererInterface
    {
        $class = sprintf(__NAMESPACE__ . '\%sRenderer', ucfirst($type));

        return $this->container->newInstance($class);
    }
}
