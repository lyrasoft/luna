<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth\SRP;

use Brick\Math\BigInteger;
use Lyrasoft\Luna\Script\SRPScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Crypt\SecretToolkit;
use Windwalker\DOM\HTMLElement;
use Windwalker\Session\Session;
use Windwalker\SRP\SRPClient;
use Windwalker\SRP\SRPServer;
use Windwalker\SRP\Step\EphemeralResult;
use Windwalker\SRP\Step\PasswordFile;
use Windwalker\SRP\Step\ProofResult;
use Windwalker\Utilities\Str;

use const Windwalker\Crypt\ENCODER_BASE64URLSAFE;

class SRPService
{
    public const PASSWORD_PREFIX = '$srp$';

    public const SESSION_KEY = 'srp.state';

    public function __construct(
        protected ApplicationInterface $app,
        protected Session $session,
        protected SRPServer $server,
        protected SRPScript $script,
        protected bool $enabled = false,
    ) {
        //
    }

    public function getUserState(): mixed
    {
        return $this->session->get(static::SESSION_KEY);
    }

    public function setUserState(mixed $data): mixed
    {
        return $this->session->set(static::SESSION_KEY, $data);
    }

    public function generateVerifier(string $identity, string $password): PasswordFile
    {
        return $this->getSRPClient()->register($identity, $password);
    }

    public function registerDirective(array $options = []): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $this->script->loadRegisterAssets();

        $srpOptions = (array) $this->app->config('user.srp');
        $options = array_merge($srpOptions, $options);

        return HTMLElement::buildAttributes(['uni-srp-registration' => json_encode($options)]);
    }

    public function loginDirective(array $options = []): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $this->script->loadLoginAssets();

        $srpOptions = (array) $this->app->config('user.srp');
        $options = array_merge($srpOptions, $options);

        return HTMLElement::buildAttributes(['uni-srp-login' => json_encode($options)]);
    }

    public function handleRegister(AppContext $app, array $user): array
    {
        if (!$this->isEnabled()) {
            return $user;
        }

        $srp = $app->input('srp');

        $password = static::encodePasswordVerifier($srp['salt'], $srp['verifier']);

        $user['password'] = $password;

        return $user;
    }

    public static function encodePasswordVerifier(string|BigInteger $salt, string|BigInteger $verifier): string
    {
        if ($salt instanceof BigInteger) {
            $salt = $salt->toBase(16);
        }

        if ($verifier instanceof BigInteger) {
            $verifier = $verifier->toBase(16);
        }

        return static::PASSWORD_PREFIX . $salt . ':' . $verifier;
    }

    public static function isValidSRPHash(string $hash): bool
    {
        return str_starts_with($hash, static::PASSWORD_PREFIX);
    }

    public static function decodePasswordVerifier(string $encoded): PasswordFile
    {
        $encoded = Str::removeLeft($encoded, static::PASSWORD_PREFIX);
        //
        // $decoded = SecretToolkit::decode($encoded);

        [$salt, $verifier] = explode(':', $encoded, 2);

        return new PasswordFile(BigInteger::fromBase($salt, 16), BigInteger::fromBase($verifier, 16));
    }

    public function isEnabled(): bool
    {
        if (!class_exists(SRPServer::class)) {
            return false;
        }

        return $this->enabled;
    }

    public function setEnabled(bool $enabled): static
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function step1(string $identity, BigInteger $salt, BigInteger $verifier): EphemeralResult
    {
        $r = $this->server->step1($identity, $salt, $verifier);

        $this->setUserState($r->json());

        return $r;
    }

    public function step2(
        string $identity,
        BigInteger $salt,
        BigInteger $verifier,
        BigInteger $A,
        BigInteger $M1
    ): ProofResult {
        $state = $this->getUserState();

        $keys = EphemeralResult::fromJson($state);

        $result = $this->server->step2(
            $identity,
            $salt,
            $verifier,
            $A,
            $keys->public,
            $keys->secret,
            $M1
        );

        $this->setUserState($result->proof->toBase(16));

        return $result;
    }

    /**
     * @return  SRPClient
     */
    public function getSRPClient(): SRPClient
    {
        return $this->app->retrieve(SRPClient::class);
    }

    /**
     * @return SRPServer
     */
    public function getSRPServer(): SRPServer
    {
        return $this->server;
    }
}
