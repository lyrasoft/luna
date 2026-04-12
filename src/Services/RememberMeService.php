<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Entity\Session as SessionEntity;
use Lyrasoft\Luna\User\Event\RememberTokenRenewEvent;
use Lyrasoft\Luna\User\Event\RememberTokenStartEvent;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\Event\CoreEventAwareTrait;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\ORM\ORM;
use Windwalker\Session\Bridge\PhpBridge;
use Windwalker\Session\Cookie\CookiesConfigurableInterface;
use Windwalker\Session\Cookie\CookiesOptions;
use Windwalker\Session\Handler\DatabaseHandler;
use Windwalker\Session\Session;

use function Windwalker\chronos;

class RememberMeService
{
    use CoreEventAwareTrait;

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
        if (!$this->isEnabled()) {
            return null;
        }

        [$item, $selector, $rawValidator] = $this->createAndSaveRememberToken($userId, sessId: $this->session->getId());

        $this->rememberCookieTokenPair($selector, $rawValidator, $item->expiredAt);

        $this->syncToDatabaseSession($selector);

        $this->emit(
            new RememberTokenStartEvent(
                token: $item,
                validator: $rawValidator,
                rememberMeService: $this,
            )
        );

        return $item;
    }

    public function getRenewableTokenItem(): ?RememberToken
    {
        if (!$this->isEnabled()) {
            return null;
        }

        $pair = $this->getCookieTokenPair();

        if (!$pair) {
            return null;
        }

        [$selector, $validator] = $pair;

        $tokenItem = $this->findTokenItem($selector);

        if (!$tokenItem) {
            $this->forgetCookieTokenPair();

            return null;
        }

        if ($tokenItem->expiredAt->isPast()) {
            $this->orm->deleteBulk(RememberToken::class, $tokenItem->id);
            $this->forgetCookieTokenPair();

            return null;
        }

        if (!hash_equals($tokenItem->validator, hash('sha256', $validator, true))) {
            return null;
        }

        return $tokenItem;
    }

    public function renew(
        RememberToken $token,
        \DateTimeInterface|string|int|null $expires = null,
        ?string $sessId = null,
    ): string {
        if (!$this->isEnabled()) {
            throw new \LogicException('Remember me is not enabled.');
        }

        $rawValidator = $this->renewTokenValidator($token, $expires, $sessId);

        $this->orm->updateOne($token);

        $this->syncToDatabaseSession($token->selector);

        $this->rememberCookieTokenPair($token->selector, $rawValidator, $token->expiredAt);

        $this->emit(
            new RememberTokenRenewEvent(
                token: $token,
                validator: $rawValidator,
                rememberMeService: $this,
            )
        );

        $this->clearExpired();

        return $rawValidator;
    }

    public function findTokenItem(string $selector): ?RememberToken
    {
        return $this->orm->findOne(RememberToken::class, compact('selector'));
    }

    /**
     * @param  mixed                               $userId
     * @param  \DateTimeInterface|string|int|null  $expires
     * @param  string|null                         $sessId
     *
     * @return  array{ RememberToken, string, string }
     *
     * @throws \JsonException
     * @throws \ReflectionException
     */
    public function createAndSaveRememberToken(
        mixed $userId,
        \DateTimeInterface|string|int|null $expires = null,
        ?string $sessId = null,
    ): array {

        $token = new RememberToken();
        $token->userId = $userId;

        if ($matched = $this->app->getMatchedRoute()) {
            $token->stage = $matched->getNamespace();
        }

        $rawValidator = $this->renewTokenValidator($token, $expires, $sessId);

        try {
            $this->genSelectorAndCreate($token);
        } catch (\Exception) {
            // Prevent selector conflict
            $this->genSelectorAndCreate($token);
        }

        return [$token, $token->selector, $rawValidator];
    }

    protected function genSelectorAndCreate(RememberToken $token): RememberToken
    {
        $token->selector = $this->createSelector();

        $this->orm->createOne($token);

        return $token;
    }

    protected function renewTokenValidator(
        RememberToken $token,
        \DateTimeInterface|string|int|null $expires = null,
        ?string $sessId = null
    ): string {
        $validator = $this->createValidator();

        $validatorHashed = hash('sha256', $validator, true);

        $token->validator = $validatorHashed;
        $token->lastUsedAt = 'now';
        $token->expiredAt = chronos($expires ?? $this->getExpires());

        if ($sessId) {
            $token->sessId = $sessId;
        }

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

        if (!$cookies) {
            return;
        }

        $token = $this->encodeRememberToken($selector, $validator);

        $cookies->set(
            $this->getCookieName(),
            $token,
            new CookiesOptions(expires: $expires)
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

        $cookies->remove($this->getCookieName());
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

    public function isEnabled(): bool
    {
        return (bool) $this->app->config('user.remember.enabled');
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
     * @return  bool
     */
    public function isTableExists(): bool
    {
        return $this->orm->getDb()->getTableManager(RememberToken::class)->exists();
    }

    public function syncToDatabaseSession(string $selector): void
    {
        $bridge = $this->session->getBridge();

        if ($bridge instanceof PhpBridge && $bridge->getHandler() instanceof DatabaseHandler) {
            $bridge->write();

            $this->orm->update(SessionEntity::class)
                ->set('remember', $selector)
                ->where('id', $this->session->getId())
                ->execute();
        }
    }
}
