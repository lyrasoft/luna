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
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public function create($type)
    {
        $class = sprintf(__NAMESPACE__ . '\%sRenderer', ucfirst($type));

        /** @var PageRendererInterface $result */
        return $result = $this->getContainer()->createSharedObject($class);
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
