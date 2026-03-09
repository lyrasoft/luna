<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\Crypt\SecretToolkit;
use Windwalker\ORM\ORM;
use Windwalker\Session\Cookie\CookiesConfigurableInterface;
use Windwalker\Session\Session;

use function Windwalker\chronos;

use const Windwalker\Crypt\ENCODER_HEX;

class RememberMeService
{
    public const string REMEMBER_SECRET_INFO = 'luna.remember.me';

    public function __construct(
        protected AppContext $app,
        protected ORM $orm,
        protected Session $session,
        protected UserService $userService,
        protected PasswordHasherInterface $passwordHasher,
        protected int $selectorLength = 16,
        protected int $validatorLength = 32,
    ) {
    }

    public function createSelector(): string
    {
        return random_bytes($this->selectorLength);
    }

    public function createValidator(): string
    {
        return random_bytes($this->validatorLength);
    }

    public function startNewRemember(mixed $userId): ?RememberToken
    {
        $cookies = $this->session->getCookies();

        if (!$cookies instanceof CookiesConfigurableInterface) {
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
            $this->forgetCookieTokenPair();
            $this->clearExpired();

            return null;
        }

        if ($tokenItem->expiredAt->isPast()) {
            $this->orm->deleteBulk(RememberToken::class, $tokenItem->id);
            $this->forgetCookieTokenPair();
            $this->clearExpired();

            return null;
        }

        if (!hash_equals($tokenItem->validator, hash('sha256', $validator, true))) {
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

        $validatorHashed = hash('sha256', $validator, true);

        $token->validator = $validatorHashed;
        $token->lastUsedAt = 'now';
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

        return $this->decodeRememberToken($rememberToken);
    }

    protected function rememberCookieTokenPair(
        string $selector,
        string $validator,
        \DateTimeInterface $expires,
    ): void {
        $cookies = $this->session->getCookies();

        $token = $this->encodeRememberToken($selector, $validator);

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
        $this->clearExpired();
    }

    protected function forgetCookieTokenPair(): void
    {
        $cookies = $this->session->getCookies();

        // todo: Use remove() after framework fix it
        $cookies->set($this->getCookieName(), '', ['expires' => 0]);
    }

    public function clearExpired(): void
    {
        $probability = $this->getClearProbability();
        $divisor = $this->getClearDivisor();

        if (random_int(1, $divisor) <= $probability) {
            $this->orm->delete(RememberToken::class)
                ->where('expired_at', '<', chronos())
                ->execute();
        }
    }

    /**
     * @param  string  $token
     *
     * @return  array{ string, string }|null
     */
    public function decodeRememberToken(string $token): ?array
    {
        $raw = (string) Base64Url::decode($token);

        // Get 16 and 32 length bytes for selector and validator.
        $selector = substr($raw, 0, $this->selectorLength);
        $validator = substr($raw, $this->selectorLength, $this->validatorLength);

        if (!$selector || !$validator) {
            return null;
        }

        return [$selector, $validator];
    }

    public function encodeRememberToken(
        string $selector,
        string $validator,
    ): string {
        return Base64Url::encode($selector . $validator);
    }

    public function getExpires(): Chronos
    {
        $expires = $this->app->config('user.remember.expires') ?: '100days';

        return chronos($expires);
    }

    public function getCookieName(): string
    {
        return (string) ($this->app->config('user.remember.cookie_name') ?? 'WINDWALKER_REMEMBER');
    }

    public function getClearProbability(): int
    {
        return (int) ($this->app->config('user.remember.clear_probability') ?? 1);
    }

    public function getClearDivisor(): int
    {
        return (int) ($this->app->config('user.remember.clear_divisor') ?? 100);
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
