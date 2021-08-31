<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\User;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Module\Admin\User\Form\EditForm;
use Lyrasoft\Luna\Repository\UserRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

/**
 * The UserEditView class.
 */
#[ViewModel(
    layout: 'user-edit',
    js: 'user-edit.js'
)]
class UserEditView implements ViewModelInterface
{
    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire] protected UserRepository $repository
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
    public function prepare(AppContext $app, View $view): array
    {
        $id = $app->input('id');

        /** @var User $item */
        $item = $this->repository->getItem($id);

        if ($item) {
            $item->setPassword('');
        }

        $form = $this->formFactory
            ->create(EditForm::class)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            );

        $view->setTitle('User Edit');

        return compact('form', 'id', 'item');
    }
}
