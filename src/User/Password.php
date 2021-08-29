<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

/**
 * The Password class.
 */
class Password implements PasswordInterface
{
    public function __construct(protected string $algo = PASSWORD_DEFAULT, protected array $options = [])
    {
    }

    public function hash(string $password): string
    {
        return password_hash($password, $this->getAlgo(), $this->getOptions());
    }

    public function verify(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    public function needsRehash(string $password): bool
    {
        return password_needs_rehash($password, $this->getAlgo(), $this->getOptions());
    }

    /**
     * @return string
     */
    public function getAlgo(): string
    {
        return $this->algo;
    }

    /**
     * @param  string  $algo
     *
     * @return  static  Return self to support chaining.
     */
    public function setAlgo(string $algo): static
    {
        $this->algo = $algo;

        return $this;
    }

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
}
