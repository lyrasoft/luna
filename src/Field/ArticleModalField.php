<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Article;
use Unicorn\Field\ModalField;

/**
 * The UserModalField class.
 */
class ArticleModalField extends ModalField
{
    protected function configure(): void
    {
        $this->route('article_list');
        $this->table(Article::class);
    }

    protected function getItemTitle(): ?string
    {
        return $this->getItem()['title'] ?? '';
    }
}
