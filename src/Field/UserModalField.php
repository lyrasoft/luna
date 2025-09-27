<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\User;
use Unicorn\Field\ModalField;

/**
 * The UserModalField class.
 */
class UserModalField extends ModalField
{
    protected string $titleField = 'name';

    protected function configure(): void
    {
        $this->route('user_list');
        $this->table(User::class);
    }
}
