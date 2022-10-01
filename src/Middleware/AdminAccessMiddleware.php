<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Exception\RouteNotFoundException;

/**
 * The AdminAccessMiddleware class.
 */
class AdminAccessMiddleware implements MiddlewareInterface
{
    use TranslatorTrait;

    public function __construct(protected UserService $userService)
    {
    }

    /**
     * @inheritDoc
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $this->userService->on(
            LoginAuthEvent::class,
            function (LoginAuthEvent $event) {
                /** @var User $user */
                $user = $event->getUser();

                if (!$this->userService->can(AccessService::ADMIN_ACCESS_ACTION, $user)) {
                    throw new AuthenticateFailException(
                        $this->trans('luna.login.message.authorize.fail'),
                        403
                    );
                }
            }
        );

        if ($this->userService->isLogin() && !$this->userService->can(AccessService::ADMIN_ACCESS_ACTION)) {
            throw new RouteNotFoundException();
        }

        return $handler->handle($request);
    }
}
