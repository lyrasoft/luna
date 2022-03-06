<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
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

    /**
     * Generate a random password.
     *
     * This is a fork of Joomla JUserHelper::genRandomPassword()
     *
     * @param  integer  $length  Length of the password to generate
     *
     * @return  string  Random Password
     *
     * @throws \Exception
     * @see     https://github.com/joomla/joomla-cms/blob/staging/libraries/joomla/user/helper.php#L642
     */
    public static function genRandomPassword(
        int $length = 16,
        $seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    ): string {
        $base = strlen($seed);
        $password = '';

        /*
         * Start with a cryptographic strength random string, then convert it to
         * a string with the numeric base of the salt.
         * Shift the base conversion on each character so the character
         * distribution is even, and randomize the start shift so it's not
         * predictable.
         */
        $random = random_bytes($length + 1);
        $shift = ord($random[0]);

        for ($i = 1; $i <= $length; ++$i) {
            $password .= $seed[($shift + ord($random[$i])) % $base];

            $shift += ord($random[$i]);
        }

        return $password;
    }
}
