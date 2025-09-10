<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Event\BaseEvent;

class AfterLoginSessionEvent extends BaseEvent
{
    public function __construct(
        public UserEntityInterface $user,
        public bool $result,
        public array $options = []
    ) {
    }
}
