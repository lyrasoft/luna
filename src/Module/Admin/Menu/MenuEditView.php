<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Menu;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Module\Admin\Menu\Form\EditForm;
use Lyrasoft\Luna\Repository\MenuRepository;
use Lyrasoft\Luna\Services\MenuService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

/**
 * The MenuEditView class.
 */
#[ViewModel(
    layout: 'menu-edit',
    js: 'menu-edit.js'
)]
class MenuEditView implements ViewModelInterface
{
    use TranslatorTrait;

    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire]
        protected MenuService $menuService,
        #[Autowire] protected MenuRepository $repository
    ) {
    }

    /**
     * Prepare
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $id = $app->input('id');
        $type = $app->input('type');

        /** @var Menu $item */
        $item = $this->repository->getItem($id);

        $form = $this->formFactory
            ->create(EditForm::class, ...compact('id', 'type'))
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            )
            ->fill(compact('type'));

        $viewInstance = $this->menuService->getViewInstance(
            $form->getField('view')?->getValue() ?: $item?->getView() ?: ''
        );

        if ($viewInstance) {
            $vars = $item?->getVariables() ?? [];

            $viewInstance->prepareVariablesForm($vars);

            $item?->setVariables($vars);

            $form->defineFormFields($viewInstance)
                ->fill(
                    [
                        'variables' => $item?->getVariables(),
                        'params' => $item?->getParams()
                    ]
                );

            // $tabs = $viewInstance->getTabs();
        }

        $this->prepareMetadata($app, $view);

        return compact('form', 'id', 'item', 'viewInstance', 'type');
    }

    /**
     * Prepare Metadata and HTML Frame.
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  void
     */
    protected function prepareMetadata(AppContext $app, View $view): void
    {
        $type = $app->input('type');

        $langKey = "luna.$type.menu.edit.title";
        $appLangKey = "app.$type.menu.edit.title";

        if ($this->lang->has($langKey)) {
            $title = $this->trans($langKey);
        } elseif ($this->lang->has($appLangKey)) {
            $title = $this->trans($appLangKey);
        } else {
            $title = $this->trans(
                       'luna.menu.edit.title',
                title: $this->trans('luna.menu.type.' . $type)
            );
        }

        $view->setTitle($title);
    }
}
