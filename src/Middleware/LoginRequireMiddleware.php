<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Lyrasoft\Luna\User\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DI\Container;
use Windwalker\DI\DICreateTrait;
use Windwalker\Http\Response\RedirectResponse;

/**
 * The LoginRequireMiddleware class.
 */
class LoginRequireMiddleware implements MiddlewareInterface
{
    use DICreateTrait;

    #[Inject]
    protected UserService $userService;

    #[Inject]
    protected Container $container;

    /**
     * LoginRequireMiddleware constructor.
     */
    public function __construct(protected array|\Closure $excludes = [])
    {
        //
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (!$this->userService->getUser()->isLogin()) {
            $nav = $this->container->get(Navigator::class);

            $route = $nav->getMatchedRoute();

            if (is_array($this->excludes)) {
                if (!in_array($route?->getName(), $this->excludes, true)) {
                    return $this->getRedirectResponse($nav);
                }
            } else {
                $result = $this->container->call($this->excludes, ['route' => $route]);

                if (!$result) {
                    return $this->getRedirectResponse($nav);
                }

                if ($result instanceof RouteUri) {
                    return new RedirectResponse($result);
                }
            }
        }

        return $handler->handle($request);
    }

    /**
     * getRedirectResponse
     *
     * @param  Navigator  $nav
     *
     * @return  RedirectResponse
     */
    public function getRedirectResponse(Navigator $nav): RedirectResponse
    {
        return $nav->to('login')->withReturn()->toResponse();
    }
}
