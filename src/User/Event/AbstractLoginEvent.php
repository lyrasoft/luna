<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Windwalker\Event\BaseEvent;
use Windwalker\Utilities\Accessible\AccessorBCTrait;

/**
 * The AbstractLoginEvent class.
 */
abstract class AbstractLoginEvent extends BaseEvent
{
    use AccessorBCTrait;

    public array $credential = [];

    public array $options = [];
}
