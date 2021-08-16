<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\User;

use App\Entity\User;
use Firebase\JWT\JWT;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Mailer\Mailer;
use Windwalker\Core\Mailer\MailMessage;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\CoreRouter;
use Windwalker\Core\Router\Navigator;
use Windwalker\ORM\ORM;

/**
 * The ActivationService class.
 *
 * @since  1.7
 */
class ActivationService
{
    use TranslatorTrait;

    public const RE_ACTIVATE_SESSION_KEY = 'reactivate.mail';

    /**
     * ActivationService constructor.
     */
    public function __construct(
        protected UserService $userService,
        protected AppContext $app,
        protected ORM $orm,
        protected Mailer $mailer,
        protected Navigator $nav,
        protected RendererService $rendererService
    ) {
    }

    /**
     * resendUserActivateMail
     *
     * @param  array  $conditions
     *
     * @return  void
     *
     * @throws \ReflectionException
     *
     * @since  1.7
     */
    public function sendActivateMail(mixed $conditions = []): void
    {
        /** @var User $user */
        $user = $this->userService->getUser($conditions);

        $token = JWT::encode(
            ['email' => $user->getEmail(), 'id' => $user->getId()],
            $this->app->config('app.secret')
        );

        $user->setActivation($token);

        $this->orm->updateOne(User::class, $user);
        $link = $this->nav->to(
            'registration_activate',
            ['token' => $token]
        )
            ->full();

        $message = $this->mailer->createMessage(
            $this->trans('warder.registration.mail.subject')
        )
            ->to("{$user->getName()} <{$user->getEmail()}>")
            ->html(
                $this->rendererService->render(
                    'mail.registration',
                    compact('user', 'link', 'token'),
                )
            );

        $this->mailer->send($message);
    }
}
