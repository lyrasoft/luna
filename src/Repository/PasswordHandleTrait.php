<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\DI\Attributes\Inject;

trait PasswordHandleTrait
{
    #[Inject]
    protected PasswordHasherInterface $hasher;

    public string $passwordField = 'password';

    public false|string $passwordConfirm = 'password2';

    public function prepareUserPasswordData(array $user): array
    {
        if ($this->passwordConfirm) {
            $user = $this->validatePasswordConfirmed(
                $user,
                $this->passwordField,
                $this->passwordConfirm,
            );
        }

        $user[$this->passwordField] = $this->hashPassword($user[$this->passwordField]);

        return $user;
    }

    public function validatePasswordConfirmed(
        array $user,
        string $passwordField = 'password',
        string $password2Field = 'password2'
    ): array {
        $password = $user[$passwordField];
        $password2 = $user[$password2Field];

        if ($password !== $password2) {
            throw new ValidateFailException($this->trans('luna.message.password.not.match'));
        }

        unset($user['password2']);

        return $user;
    }

    public function hashPassword($string): string
    {
        return $this->hasher->hash($string);
    }
}
