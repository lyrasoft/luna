<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna;

use Hybridauth\Hybridauth;
use Lyrasoft\Luna\Auth\SocialAuthService;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\Password;
use Lyrasoft\Luna\User\PasswordInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;
use Windwalker\Core\Runtime\Config;
use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;

/**
 * The LunaPackage class.
 *
 * @since  1.0
 */
class LunaPackage extends AbstractPackage implements ServiceProviderInterface
{
    public function __construct(protected Config $config)
    {
    }

    public function register(Container $container): void
    {
        $container->share(static::class, $this);

        $this->registerAuthServices($container);

        $container->mergeParameters(
            'renderer.paths',
            [
                static::path('views'),
            ]
        );
    }

    public function install(PackageInstaller $installer): void
    {
        //
    }

    protected function registerAuthServices(Container $container): void
    {
        $container->prepareSharedObject(UserService::class);
        $container->prepareSharedObject(ActivationService::class);
        $container->prepareSharedObject(SocialAuthService::class);
        $container->prepareSharedObject(Password::class)
            ->alias(PasswordInterface::class, Password::class);
    }

    public function getLoginName(): string
    {
        return $this->config->getDeep('user.login_name') ?? 'username';
    }
}
