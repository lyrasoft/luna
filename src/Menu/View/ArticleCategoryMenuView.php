<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Field\CategoryModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * The ArticleCategoryMenuView class.
 */
class ArticleCategoryMenuView extends AbstractMenuView
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
        return 'article_category';
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
        /** @var Form $form */
        $form->add('id', CategoryModalField::class)
            ->label($this->trans('luna.category.title'))
            ->categoryType('article')
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
        return $nav->to('article_category')
            ->var('path', $variables['path']);
    }

    /**
     * prepareVariablesStore
     *
     * @param array $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesStore(array &$variables): void
    {
        if ($variables['id']) {
            $variables['path'] = (string) $this->orm->findResult(Category::class, 'path', $variables['id']);
        }
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return $this->menuHelper->is('article_category', ['path' => $variables['path']]);
    }
}
