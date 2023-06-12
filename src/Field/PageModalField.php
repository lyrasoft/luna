<?php

/**
 * Part of datavideo project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Page;
use Unicorn\Field\ModalField;

/**
 * The UserModalField class.
 */
class PageModalField extends ModalField
{
    protected function configure(): void
    {
        $this->route('page_list');
        $this->table(Page::class);
    }

    protected function getItemTitle(): ?string
    {
        return $this->getItem()['title'] ?? '';
    }
}
