<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Module\Admin\Article\Form\EditForm;
use Lyrasoft\Luna\Module\Admin\Article\Form\GridForm;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Runtime\Config;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DI\Container;
use Windwalker\Query\Query;

/**
 * The ArticleRepository class.
 */
#[Repository(entityClass: Article::class)]
class ArticleRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use ManageRepositoryTrait;
    use ListRepositoryTrait;

    #[Inject]
    protected Container $container;

    protected ?string $type = null;

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Article::class)
            ->leftJoin(Category::class);

        return $selector;
    }

    /**
     * @return string|null
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param  string|null  $type
     *
     * @return  static  Return self to support chaining.
     */
    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    #[ConfigureAction(ReorderAction::class)]
    protected function configureReorderAction(ReorderAction $action): void
    {
        $action->setReorderGroupHandler(
            function (Query $query, Article $article) {
                $query->where('category_id', $article->getCategoryId());
                $query->where('type', $article->getType());
            }
        );
    }
}
