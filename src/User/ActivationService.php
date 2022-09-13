<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    MIT
 */

namespace Lyrasoft\Luna\User;

use Firebase\JWT\JWT;
use Lyrasoft\Luna\Entity\User;
use ReflectionException;
use Symfony\Component\Mailer\SentMessage;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Mailer\Mailer;
use Windwalker\Core\Renderer\RendererService;
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
     * @var callable
     */
    protected $userInfoGetter;

    public string $tokenAlgo = 'HS256';

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

    public function createToken(object $user): string
    {
        return JWT::encode(
            $this->getUserInfo($user),
            $this->app->config('app.secret'),
            $this->tokenAlgo
        );
    }

    public function decodeToken(string $token): array
    {
        return (array) JWT::decode($token, $this->app->config('app.secret'), [$this->tokenAlgo]);
    }

    /**
     * resendUserActivateMail
     *
     * @param  array  $conditions
     *
     * @return  void
     *
     * @throws ReflectionException
     *
     * @since  1.7
     */
    public function sendActivateMail(mixed $conditions = []): SentMessage
    {
        /** @var User $user */
        $user = $this->userService->getUser($conditions);

        $token = $this->createToken($user);

        $user->setActivation($token);

        $this->orm->updateOne(User::class, $user);
        $link = $this->nav->to(
            'front::registration_activate',
            ['token' => $token]
        )
            ->full();

        $site = $this->app->config('company.site_name') ?: 'Confirm';

        $message = $this->mailer->createMessage(
            $this->trans('luna.registration.mail.subject', site: $site)
        )
            ->to("{$user->getName()} <{$user->getEmail()}>")
            ->html(
                $this->rendererService->render(
                    'mail.registration',
                    compact('user', 'link', 'token'),
                )
            );

        return $this->mailer->send($message);
    }

    public function getUserInfo(object $user): array
    {
        return $this->getUserInfoGetter()($user);
    }

    /**
     * @return callable
     */
    public function getUserInfoGetter(): callable
    {
        return $this->userInfoGetter ?? static function (object $user) {
            /** @var User $user */
            return [
                'email' => $user->getEmail(),
                'id' => $user->getId(),
            ];
        };
    }

    /**
     * @param  callable  $userInfoGetter
     *
     * @return  static  Return self to support chaining.
     */
    public function setUserInfoGetter(callable $userInfoGetter): static
    {
        $this->userInfoGetter = $userInfoGetter;

        return $this;
    }
}
