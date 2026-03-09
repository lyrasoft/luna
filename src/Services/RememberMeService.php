<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\Crypt\SecretToolkit;
use Windwalker\DI\Attributes\Service;
use Windwalker\ORM\ORM;
use Windwalker\Session\Cookie\CookiesConfigurableInterface;
use Windwalker\Session\Session;

use function Windwalker\chronos;

#[Service]
class RememberMeService
{
    public const string REMEMBER_SECRET_INFO = 'luna.remember.me';

    public function __construct(
        protected AppContext $app,
        protected ORM $orm,
        protected Session $session,
        protected UserService $userService,
        protected PasswordHasherInterface $passwordHasher,
        protected int $selectorLength = 12,
        protected int $validatorLength = 32,
    ) {
    }

    public function createSelector(): string
    {
        return SecretToolkit::genSecret($this->selectorLength, withPrefix: false);
    }

    public function createValidator(): string
    {
        return SecretToolkit::genSecret($this->validatorLength, withPrefix: false);
    }

    public function startNewRemember(mixed $userId): ?RememberToken
    {
        $cookies = $this->session->getCookies();

        if (!$cookies instanceof CookiesConfigurableInterface) {
            return null;
        }

        if (!$this->isTableExists()) {
            if (WINDWALKER_DEBUG) {
                throw new \RuntimeException(
                    'Missing `remember_tokens` table. Please run the migration to create it.'
                );
            }

            return null;
        }

        [$item, $selector, $validator] = $this->createAndSaveRememberToken($userId);

        $this->rememberCookieTokenPair($selector, $validator, $item->expiredAt);

        return $item;
    }

    public function getRenewableTokenItem(): ?RememberToken
    {
        $pair = $this->getCookieTokenPair();

        if (!$pair) {
            return null;
        }

        [$selector, $validator] = $pair;

        $tokenItem = $this->findTokenItem($selector);

        if (!$tokenItem) {
            return null;
        }

        if ($tokenItem->expiredAt->isPast()) {
            $this->orm->deleteBulk(RememberToken::class, $tokenItem->id);

            return null;
        }

        if (!$this->passwordHasher->verify($validator, $tokenItem->validator)) {
            return null;
        }

        return $tokenItem;
    }

    public function renew(RememberToken $token, \DateTimeInterface|string|int|null $expires = null): string
    {
        $validator = $this->renewTokenValidator($token, $expires);

        $this->orm->updateOne($token);

        $this->rememberCookieTokenPair($token->selector, $validator, $token->expiredAt);

        return $validator;
    }

    public function findTokenItem(string $selector): ?RememberToken
    {
        if (!$this->isTableExists()) {
            return null;
        }

        return $this->orm->findOne(RememberToken::class, compact('selector'));
    }

    /**
     * @param  mixed  $userId
     *
     * @return  array{ RememberToken, string, string }
     *
     * @throws \JsonException
     * @throws \ReflectionException
     */
    public function createAndSaveRememberToken(mixed $userId, \DateTimeInterface|string|int|null $expires = null): array
    {
        $selector = $this->createSelector();

        $token = new RememberToken();
        $token->selector = $selector;
        $token->userId = $userId;

        $validator = $this->renewTokenValidator($token, $expires);

        $this->orm->createOne($token);

        return [$token, $selector, $validator];
    }

    protected function renewTokenValidator(
        RememberToken $token,
        \DateTimeInterface|string|int|null $expires = null
    ): string {
        $validator = $this->createValidator();

        $validatorHashed = $this->passwordHasher->hash($validator);

        $token->validator = $validatorHashed;
        $token->expiredAt = chronos($expires ?? $this->getExpires());

        return $validator;
    }

    /**
     * @return  array{ string, string }|null
     */
    protected function getCookieTokenPair(): ?array
    {
        $cookies = $this->session->getCookies();
        $rememberToken = $cookies->get($this->getCookieName());

        if (!$rememberToken) {
            return null;
        }

        [$selector, $validator] = $this->decodeRememberToken($rememberToken);

        return [$selector, $validator];
    }

    protected function rememberCookieTokenPair(
        string $selector,
        string $validator,
        \DateTimeInterface $expires,
    ): void {
        $cookies = $this->session->getCookies();

        $token = $this->encodeRememberToken($selector, $validator, $expires);

        $cookies->set(
            $this->getCookieName(),
            $token,
            [
                'expires' => $expires,
            ]
        );
    }

    public function forget(): void
    {
        $pair = $this->getCookieTokenPair();

        if ($pair) {
            [$selector] = $pair;

            $this->orm->deleteBulk(RememberToken::class, compact('selector'));
        }

        $this->forgetCookieTokenPair();
    }

    protected function forgetCookieTokenPair(): void
    {
        $cookies = $this->session->getCookies();

        // todo: Use remove() after framework fix it
        $cookies->set($this->getCookieName(), '', ['expires' => 0]);
    }

    /**
     * @param  string  $token
     *
     * @return  array{ string, string }
     */
    public function decodeRememberToken(string $token): array
    {
        $payload = JWT::decode(
            $token,
            new Key($this->getDerivedSecret(), 'HS256')
        );

        $selector = $payload->selector;
        $validator = $payload->validator;

        return [$selector, $validator];
    }

    public function encodeRememberToken(
        string $selector,
        string $validator,
        \DateTimeInterface|string|int $expires
    ): string {
        $expires = chronos($expires);

        return JWT::encode(
            [
                'selector' => $selector,
                'validator' => $validator,
                'exp' => $expires->getTimestamp(),
            ],
            $this->getDerivedSecret(),
            'HS256',
        );
    }

    public function getExpires(): Chronos
    {
        $expires = $this->app->config('user.remember_expires') ?: '100days';

        return chronos($expires);
    }

    public function getCookieName(): string
    {
        return (string) ($this->app->config('user.remember_cookie_name') ?? 'WINDWALKER_REMEMBER');
    }

    /**
     * @return  string
     */
    public function getDerivedSecret(): string
    {
        return $this->app->getSecret(static::REMEMBER_SECRET_INFO);
    }

    /**
     * @return  bool
     */
    public function isTableExists(): bool
    {
        return $this->orm->getDb()->getTableManager(RememberToken::class)->exists();
    }
}
