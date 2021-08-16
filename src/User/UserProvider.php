<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\User;

use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;
use Windwalker\Edge\Edge;
use Windwalker\Renderer\CompositeRenderer;
use Windwalker\Renderer\EdgeRenderer;
use Windwalker\Renderer\RendererInterface;

/**
 * The UserProvider class.
 *
 * @since  __DEPLOY_VERSION__
 */
class UserProvider implements ServiceProviderInterface
{
    public function register(Container $container): void
    {
        $container->prepareSharedObject(UserService::class);
    }
}
