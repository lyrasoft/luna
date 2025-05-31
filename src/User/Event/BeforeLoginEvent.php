<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

/**
 * The BeforeLoginEvent class.
 */
class BeforeLoginEvent extends AbstractLoginEvent
{
    public function __construct(
        array $credential = [],
        array $options = []
    ) {
        $this->credential = $credential;
        $this->options = $options;
    }
}
