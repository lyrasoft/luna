<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Field\UrlField;
use Windwalker\Form\Form;
use Windwalker\Uri\Uri;

/**
 * The LinkMenuView class.
 */
class LinkMenuView extends AbstractMenuView
{
    use TranslatorTrait;

    /**
     * @inheritDoc
     */
    public static function getName(): string
    {
        return 'link';
    }

    /**
     * @inheritDoc
     */
    protected function defineVariablesForm(Form $form): void
    {
        $form->add('url', TextField::class)
            ->label($this->trans('luna.menu.field.url'))
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
        return new Uri($variables['url']);
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}
