<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 LYRASOFT.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Config;

use Lyrasoft\Luna\Repository\ConfigRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\StrNormalize;

/**
 * The ConfigEditView class.
 */
#[ViewModel(
    layout: 'config-edit',
    js: 'config-edit.js'
)]
class ConfigEditView implements ViewModelInterface
{
    use TranslatorTrait;

    /**
     * CategoryEditView constructor.
     *
     * @param  ORM          $orm
     * @param  FormFactory  $formFactory
     * @param  Navigator    $nav
     */
    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire] protected ConfigRepository $repository
    ) {
    }

    /**
     * Prepare
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return    mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $vars = $app->getUrlVars();

        $type = $vars['type'];
        $formClass = $vars['form'];
        $subtype = (string) ($vars['subtype'] ?? null);

        $item = $this->repository->getItem(compact('type', 'subtype'));

        $form = $this->formFactory
            ->create($formClass)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $item?->getContent() ?? []
            );

        $title = 'luna.config.type.' . $type;

        if ($this->hasLang($title)) {
            $title = $this->trans($title);
        } else {
            $title = ucwords(StrNormalize::toSpaceSeparated($type));
        }

        $view->setTitle(
            $this->trans('luna.config.title', $title),
        );

        return compact('form', 'item', 'type', 'subtype');
    }
}
