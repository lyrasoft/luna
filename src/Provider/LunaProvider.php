<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Provider;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\PageBuilder;
use Windwalker\Core\Renderer\RendererManager;
use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;
use Windwalker\Utilities\Queue\PriorityQueue;

/**
 * The LunaProvider class.
 *
 * @since  1.0
 */
class LunaProvider implements ServiceProviderInterface
{
    /**
     * Property luna.
     *
     * @var  LunaPackage
     */
    protected $luna;

    /**
     * LunaProvider constructor.
     *
     * @param  LunaPackage $luna
     */
    public function __construct(LunaPackage $luna)
    {
        $this->luna = $luna;
    }

    /**
     * Registers the service provider with a DI container.
     *
     * @param   Container $container The DI container.
     *
     * @return  void
     */
    public function register(Container $container)
    {
        if ($container->get('application')->isConsole()) {
            return;
        }

        $container->getParent()->extend(
            RendererManager::class,
            function (RendererManager $manager, Container $container) {
                $manager->addGlobalPath($this->luna->getDir() . '/Resources/templates', PriorityQueue::LOW - 25);

                return $manager;
            }
        );

        $container->prepareSharedObject(PageBuilder::class);

        $this->registerClassAlias();
    }

    /**
     * registerClassAlias
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function registerClassAlias()
    {
        class_alias(\Lyrasoft\Luna\Repository\CategoriesRepository::class, \Lyrasoft\Luna\Repository\CategoriesModel::class);
        class_alias(\Lyrasoft\Luna\Repository\ArticlesRepository::class, \Lyrasoft\Luna\Repository\ArticlesModel::class);
    }
}
