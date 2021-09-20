<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    MIT
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
 * @since  2.0.0
 */
class UserProvider implements ServiceProviderInterface
{
    public function register(Container $container): void
    {
        $container->prepareSharedObject(UserService::class);
    }
}
