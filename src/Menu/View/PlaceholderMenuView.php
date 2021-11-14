<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 $this->transORGANIZATION$this->trans.
 * @license    $this->transLICENSE$this->trans
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\LayoutRenderedMenuInterface;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;
use Windwalker\Uri\Uri;

/**
 * The PlaceholderMenuView class.
 */
class PlaceholderMenuView extends AbstractMenuView implements LayoutRenderedMenuInterface
{
    use TranslatorTrait;

    /**
     * @inheritDoc
     */
    public static function getName(): string
    {
        return 'placeholder';
    }

    /**
     * @inheritDoc
     */
    protected function defineVariablesForm(Form $form): void
    {
        /** @var Form $form */
        $form->add('type', ListField::class)
            ->label($this->trans('luna.menu.placeholder.type'))
            ->option($this->trans('luna.menu.placeholder.type.link'), 'link')
            ->option($this->trans('luna.menu.placeholder.type.divider'), 'divider')
            ->option($this->trans('luna.menu.placeholder.type.header'), 'header')
            ->option($this->trans('luna.menu.placeholder.type.text'), 'text');

        $form->add('url', ListField::class)
            ->label($this->trans('luna.menu.field.placeholder'))
            ->option('#', '#')
            ->option('javascript://', 'javascript://')
            ->option($this->trans('luna.menu.field.url.no.link'), static::NO_LINK)
            ->set('showon', ['variables/type' => 'link'])
            ->defaultValue(static::NO_LINK);

        $form->add('header', TextField::class)
            ->label($this->trans('luna.menu.placeholder.text'))
            ->set('showon', ['variables/type' => 'header']);

        $form->add('text', TextareaField::class)
            ->label($this->trans('luna.menu.placeholder.text'))
            ->rows(5)
            ->set('showon', ['variables/type' => 'text']);
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
        return new Uri($variables['url']);
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return false;
    }

    /**
     * @inheritDoc
     */
    public function getLayout(): string
    {
        return 'luna.menu.placeholder.placeholder';
    }
}
