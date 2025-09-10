<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Windwalker\Event\BaseEvent;

class BeforeLoginSessionEvent extends BaseEvent
{
    public function __construct(
        public mixed $user,
        public array $options = []
    ) {
    }
}
