<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Windwalker\DI\Annotation\Inject;
use Windwalker\DI\Container;
use Windwalker\DI\ContainerAwareInterface;

/**
 * The PageRendererFactory class.
 *
 * @since  1.5.2
 */
class PageRendererFactory implements ContainerAwareInterface
{
    /**
     * Property container.
     *
     * @Inject()
     *
     * @var Container
     */
    protected $container;

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
    public function create($type)
    {
        $class = sprintf(__NAMESPACE__ . '\%sRenderer', ucfirst($type));

        return $this->getContainer()->newInstance($class);
    }

    /**
     * Get the DI container.
     *
     * @return  Container
     *
     * @throws  \UnexpectedValueException May be thrown if the container has not been set.
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * Set the DI container.
     *
     * @param   Container $container The DI container.
     *
     * @return  static
     */
    public function setContainer(Container $container)
    {
        $this->container = $container;

        return $this;
    }
}
