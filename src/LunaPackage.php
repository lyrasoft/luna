<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna;

use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Auth\AuthService;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;
use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;

/**
 * The LunaPackage class.
 *
 * @since  1.0
 */
class LunaPackage extends AbstractPackage implements ServiceProviderInterface
{
    public function register(Container $container): void
    {
        $this->registerAuthServices($container);
    }

    public function install(PackageInstaller $installer): void
    {
        //
    }

    protected function registerAuthServices(Container $container): void
    {
        $container->prepareSharedObject(AuthService::class);
        $container->prepareSharedObject(UserService::class);
    }
}
