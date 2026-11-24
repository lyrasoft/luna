<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Auth;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Mailer\MailerInterface;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\ORM\ORM;

/**
 * The ForgetController class.
 */
#[Controller(
    config: __DIR__ . '/forget.config.php'
)]
class ForgetController
{
    use TranslatorTrait;

    protected const int TOKEN_TTL = 3600;

    protected const int REQUEST_COOLDOWN = 120;

    // Minimum response time (seconds) of request(), to hide account existence by timing.
    protected const float REQUEST_MIN_DURATION = 3.0;

    /**
     * TODO: Add per-IP rate limiting once a storage is available.
     */
    public function request(
        AppContext $app,
        RendererService $rendererService,
        UserService $userService,
        Navigator $nav,
        ORM $orm,
        MailerInterface $mailer
    ): RouteUri {
        $start = microtime(true);

        $email = $app->input('email');

        if (!$email) {
            $this->waitUntilMinDuration($start);

            return $nav->back();
        }

        /** @var User $user */
        $user = $userService->load(['email' => $email]);

        if (!$user) {
            $this->waitUntilMinDuration($start);

            return $nav->self()->layout('complete');
        }

        // Per-account cooldown. Respond the same way to avoid revealing whether the account exists.
        if ($user->lastReset && $user->lastReset->getTimestamp() > time() - static::REQUEST_COOLDOWN) {
            $this->waitUntilMinDuration($start);

            return $nav->self()->layout('complete');
        }

        $now = time();

        $token = JWT::encode(
            [
                'email' => $email,
                'iat' => $now,
                'exp' => $now + static::TOKEN_TTL,
                'jti' => bin2hex(random_bytes(16)),
            ],
            $app->getSecret('password.forget'),
            'HS256'
        );

        $link = $nav->toNotifyLink('forget_confirm', ['token' => $token, 'email' => idn_to_ascii($email)]);

        // Only store the hash so a DB leak can not be used to reset passwords.
        $user->resetToken = static::hashToken($token);
        $user->lastReset = 'now';

        $orm->updateOne(User::class, $user);

        $name = $user->name;

        $mailer->createMessage(
            $this->trans('luna.forget.request.mail.subject')
        )
            ->to("{$name} <$email>")
            ->html(
                $rendererService->render(
                    'mail.forget',
                    compact('user', 'email', 'token', 'link')
                )
            )
            ->send();

        $this->waitUntilMinDuration($start);

        return $nav->self()->layout('complete');
    }

    /**
     * Sleep until REQUEST_MIN_DURATION has passed since $start, to hide account existence by timing.
     */
    protected function waitUntilMinDuration(float $start): void
    {
        $remaining = static::REQUEST_MIN_DURATION - (microtime(true) - $start);

        if ($remaining > 0) {
            usleep((int) ($remaining * 1_000_000));
        }
    }

    public function confirm(AppContext $app, UserService $userService, Navigator $nav): RouteUri
    {
        $token = (string) $app->input('token');

        $this->loadUserByToken($app, $userService, $token);

        $app->getState()->remember('reset.token', $token);

        return $nav->to('forget_reset');
    }

    public function reset(
        AppContext $app,
        UserService $userService,
        ORM $orm,
        Navigator $nav
    ): RouteUri {
        $token = (string) $app->input('token');

        if ($token === '') {
            throw new ValidateFailException('No Token');
        }

        $user = $this->loadUserByToken($app, $userService, $token);

        $password = (string) $app->input('password');
        $password2 = (string) $app->input('password2');

        // Password strength rules should be implemented by each project.
        if ($password === '') {
            throw new ValidateFailException($this->trans('luna.forget.reset.message.password.empty'));
        }

        if ($password !== $password2) {
            throw new ValidateFailException($this->trans('luna.forget.reset.message.password.not.match'));
        }

        $hasher = $app->retrieve(PasswordHasherInterface::class);

        $user->password = $hasher->hash($password);

        $user->resetToken = '';
        $user->lastReset = 'now';

        $orm->updateOne(
            User::class,
            $user
        );

        // Revoke all remember-me tokens so old logins can not survive a reset.
        $orm->deleteBulk(RememberToken::class, ['user_id' => $user->id]);

        $app->getState()->forget('reset.token');

        return $nav->to('forget_complete');
    }

    protected function loadUserByToken(AppContext $app, UserService $userService, string $token): User
    {
        try {
            $payload = JWT::decode(
                $token,
                new Key($app->getSecret('password.forget'), 'HS256'),
            );
        } catch (\Throwable) {
            throw new ValidateFailException($this->trans('luna.forget.request.message.invalid.token'));
        }

        $email = $payload->email ?? null;

        if (!$email) {
            throw new ValidateFailException($this->trans('luna.forget.request.message.user.not.found'));
        }

        /** @var User|null $user */
        $user = $userService->load(['email' => (string) $email]);

        if (!$user) {
            throw new ValidateFailException($this->trans('luna.forget.request.message.user.not.found'));
        }

        if ($user->resetToken === '' || !hash_equals($user->resetToken, static::hashToken($token))) {
            throw new ValidateFailException($this->trans('luna.forget.request.message.invalid.token'));
        }

        return $user;
    }

    protected static function hashToken(string $token): string
    {
        return hash('sha256', $token);
    }
}
