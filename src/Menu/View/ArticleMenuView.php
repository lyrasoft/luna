<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Field\ArticleModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * The ArticleMenuView class.
 */
class ArticleMenuView extends AbstractMenuView
{
    use TranslatorTrait;

    public function __construct(protected ORM $orm)
    {
    }

    /**
     * @inheritDoc
     */
    public static function getName(): string
    {
        return 'article';
    }

    /**
     * getGroup
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getGroup(): string
    {
        return 'article';
    }

    /**
     * @inheritDoc
     */
    protected function defineVariablesForm(Form $form): void
    {
        $form->add('id', ArticleModalField::class)
            ->label($this->trans('luna.article.title'))
            ->required(true);
    }

    /**
     * @inheritDoc
     */
    protected function defineParamsForm(Form $form): void
    {
    }

    /**
     * @inheritDoc
     */
    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        return $nav->to('article_item', $variables);
    }

    /**
     * prepareVariablesStore
     *
     * @param  array  $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesStore(array &$variables): void
    {
        if ($variables['id']) {
            $variables['alias'] = (string) $this->orm->findOne(Article::class, $variables['id'])?->getAlias();
        }
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return $this->menuHelper->is('article_item', ['id' => $variables['id']]);
    }
}
