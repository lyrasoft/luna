<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Services\RememberMeService;
use Windwalker\Event\BaseEvent;

class RememberTokenRenewEvent extends BaseEvent
{
    public function __construct(
        public RememberToken $token,
        public string $validator,
        public RememberMeService $rememberMeService,
    ) {
    }
}
