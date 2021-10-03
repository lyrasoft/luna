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
use Windwalker\Core\Language\TranslatorTrait;
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
    
    public function __construct(protected Container $container)
    {
        //
    }

    #[ListenTo(BeforeRenderEvent::class)]
    public function beforeRender(BeforeRenderEvent $event)
    {
        try {
            $session = $this->container->get(Session::class);
        } catch (\Throwable $e) {
            return;
        }

        if (!isset($session)) {
            return;
        }
        
        $app = $this->container->get(AppContext::class);
        
        $data = $event->getData();

        $userService = $app->service(UserService::class);
        $userSwitcher = $app->service(UserSwitchService::class);
        $csrf = $app->service(CsrfService::class);
        $nav = $app->service(Navigator::class);

        $matchedRoute = $app->getMatchedRoute();

        if ($matchedRoute?->getExtraValue('namespace') === 'admin' && $userSwitcher->hasSwitched()) {
            $user = $userService->getUser();
            $keepaccess = $session->get(UserSwitchService::USER_MASK_ID);
            $msg = h(
                'span',
                ['class' => 'd-flex align-items-center'],
                [
                    h(
                        'span',
                        [],
                        $keepaccess
                            ? $this->trans('luna.user.message.switched.keepaccess.desc', $user->name)
                            : $this->trans('luna.user.message.switched.desc', $user->name)
                    ),
                    h(
                        'a',
                        [
                            'class' => 'btn btn-warning btn-sm ml-auto',
                            'href' => $nav->to(
                                'user_list',
                                [
                                    '_method' => 'PATCH',
                                    'task' => 'recover',
                                    $csrf->getToken() => '1'
                                ]
                            )
                        ],
                        $this->trans('luna.user.switch.recover.button')
                    )
                ]
            );
echo (string) $msg;
            $app->addMessage((string) $msg, 'warning');
        }
    }
}
