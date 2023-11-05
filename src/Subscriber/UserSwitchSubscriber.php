<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Closure;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\UserService;
use Throwable;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\View\Event\BeforeRenderEvent;
use Windwalker\DI\Container;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Session;

/**
 * The UserSwitchSubscriber class.
 */
#[EventSubscriber]
class UserSwitchSubscriber
{
    use TranslatorTrait;

    public function __construct(protected Container $container, protected ?Closure $messageHandler = null)
    {
        //
    }

    #[ListenTo(BeforeRenderEvent::class)]
    public function beforeRender(BeforeRenderEvent $event): void
    {
        if (!$this->container->has(Session::class)) {
            return;
        }

        $session = $this->container->get(Session::class);

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
     * @return Closure|null
     */
    public function getMessageHandler(): ?Closure
    {
        return $this->messageHandler ??=
        static function (string $message, AssetService $asset) {
            $asset->getTeleport('messages')->add('user-switch-notice', $message);
        };
    }

    /**
     * @param  Closure|null  $messageHandler
     *
     * @return  static  Return self to support chaining.
     */
    public function setMessageHandler(?Closure $messageHandler): static
    {
        $this->messageHandler = $messageHandler;

        return $this;
    }
}
