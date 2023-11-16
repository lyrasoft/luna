<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Script;

use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AbstractScript;

class SRPScript extends AbstractScript
{
    public function __construct(
        protected UnicornScript $unicornScript,
    ) {
        //
    }

    public function loadRegisterAssets(): void
    {
        $this->js('@vendor/@windwalker-io/srp/dist/client.min.js');
        $this->js('@vendor/lyrasoft/luna/dist/srp/registration.js');
    }

    public function loadLoginAssets(): void
    {
        $this->unicornScript->addRoute('@auth_ajax');

        $this->js('@vendor/@windwalker-io/srp/dist/client.min.js');
        $this->js('@vendor/lyrasoft/luna/dist/srp/login.js');
    }
}
