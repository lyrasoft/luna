<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Field\ArticleModalField;
use Lyrasoft\Luna\Field\PageModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * The PageMenuView class.
 */
class PageMenuView extends AbstractMenuView
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
        return 'page';
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
        $form->add('id', PageModalField::class)
            ->label($this->trans('luna.page.title'));

        $form->add('path', TextField::class)
            ->label($this->trans('luna.menu.field.path'));
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
        return $nav->to('page', ['path' => $variables['path']]);
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
            $variables['path'] = (string) $this->orm->findOne(Page::class, $variables['id'])?->getAlias();
        }

        if (!$variables['path'] && !$variables['id']) {
            throw new ValidateFailException($this->trans('luna.menu.message.page.id.and.path.require'));
        }
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return $this->menuHelper->is('page', ['path' => $variables['path']]);
    }
}
