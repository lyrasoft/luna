<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Security\CsrfService;
use Windwalker\Core\View\Event\BeforeRenderEvent;
use Windwalker\DI\Container;
use Windwalker\DI\Exception\DependencyResolutionException;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Session;

use function Windwalker\DOM\h;

/**
 * The UserSwitchSubscriber class.
 */
#[EventSubscriber]
class UserSwitchSubscriber
{
    use TranslatorTrait;
    
    public function __construct(protected Container $container, protected ?\Closure $messageHandler = null)
    {
        //
    }

    #[ListenTo(BeforeRenderEvent::class)]
    public function beforeRender(BeforeRenderEvent $event): void
    {
        try {
            $session = $this->container->get(Session::class);
        } catch (\Throwable $e) {
            return;
        }

        if (!isset($session)) {
            return;
        }

        /** @var AppContext $app */
        $app = $this->container->get(AppContext::class);

        $userSwitcher = $app->service(UserSwitchService::class);
        $matchedRoute = $app->getMatchedRoute();

        if ($matchedRoute?->getExtraValue('namespace') === 'admin' && $userSwitcher->hasSwitched()) {
            $userService = $app->service(UserService::class);
            $user = $userService->getUser();
            $keepaccess = $session->get(UserSwitchService::USER_MASK_ID);
            $rendererService = $app->service(RendererService::class);

            $message = $rendererService->render(
                'widget.user-switch-notice',
                compact('user', 'keepaccess')
            );

            $this->container->call($this->getMessageHandler(), compact('message'));
        }
    }

    /**
     * @return \Closure|null
     */
    public function getMessageHandler(): ?\Closure
    {
        return $this->messageHandler
            ??= function (string $message, AssetService $asset) {
                $asset->getTeleport('messages')->add('user-switch-notice', $message);
            };
    }

    /**
     * @param  \Closure|null  $messageHandler
     *
     * @return  static  Return self to support chaining.
     */
    public function setMessageHandler(?\Closure $messageHandler): static
    {
        $this->messageHandler = $messageHandler;

        return $this;
    }
}
