<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use Windwalker\Crypt\SecretToolkit;

use Windwalker\Session\Session;

use const Windwalker\Crypt\ENCODER_HEX;
use const Windwalker\Crypt\SECRET_128BIT;

class SrpService
{
    public function __construct(
        protected Session $session
    ) {
        //
    }

    public function storeClientPublicEphemeral(string $public): void
    {
        $this->session->set('srp.public.client', $public);
    }

    public function generateRandomSeed(int $length = SECRET_128BIT): string
    {
        return SecretToolkit::genSecret($length, ENCODER_HEX);
    }

    public function generatePublicEphemeral(string $seed, #[\SensitiveParameter] string $userSecret): string
    {

    }
}
