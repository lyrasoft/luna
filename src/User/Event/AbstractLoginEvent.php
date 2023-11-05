<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Windwalker\Event\AbstractEvent;

/**
 * The AbstractLoginEvent class.
 */
class AbstractLoginEvent extends AbstractEvent
{
    protected array $credential = [];

    protected array $options;

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * @param  array  $options
     *
     * @return  static  Return self to support chaining.
     */
    public function setOptions(array $options): static
    {
        $this->options = $options;

        return $this;
    }

    /**
     * @return array
     */
    public function getCredential(): array
    {
        return $this->credential;
    }

    /**
     * @param  array  $credential
     *
     * @return  static  Return self to support chaining.
     */
    public function setCredential(array $credential): static
    {
        $this->credential = $credential;

        return $this;
    }
}
