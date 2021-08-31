<?php

/**
 * Part of datavideo project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\User;
use Unicorn\Field\ModalField;

/**
 * The UserModalField class.
 */
class UserModalField extends ModalField
{
    protected function configure(): void
    {
        $this->route('user_list');
        $this->table(User::class);
    }

    protected function getItemTitle(): ?string
    {
        return $this->getItem()['name'] ?? '';
    }
}
