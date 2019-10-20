<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Provider;

use Lyrasoft\Luna\Config\ConfigService;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Menu\MenuService;
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
        $parentContainer = $container->getParent();

        $parentContainer->prepareSharedObject(ConfigService::class);

        $this->registerClassAlias();

        if ($container->get('application')->isConsole()) {
            return;
        }

        $parentContainer->extend(
            RendererManager::class,
            function (RendererManager $manager, Container $container) {
                $manager->addGlobalPath($this->luna->getDir() . '/Resources/templates', PriorityQueue::LOW - 25);

                return $manager;
            }
        );

        $parentContainer->prepareSharedObject(PageBuilder::class);
        $parentContainer->prepareSharedObject(MenuService::class);
    }

    /**
     * registerClassAlias
     *
     * @return  void
     *
     * @since  1.5.5
     */
    protected function registerClassAlias()
    {
        static $registered = false;

        if (!$registered) {
            class_alias(\Lyrasoft\Luna\Repository\CategoriesRepository::class, \Lyrasoft\Luna\Model\CategoriesModel::class);
            class_alias(\Lyrasoft\Luna\Repository\ArticlesRepository::class, \Lyrasoft\Luna\Model\ArticlesModel::class);
        }

        $registered = true;
    }
}
