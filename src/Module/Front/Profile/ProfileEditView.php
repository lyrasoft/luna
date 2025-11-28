<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Profile;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Module\Front\Profile\Form\EditForm;
use Lyrasoft\Luna\Repository\UserRepository;
use Lyrasoft\Luna\User\UserService;
use Psr\Cache\InvalidArgumentException;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

/**
 * The ProfileEditView class.
 */
#[ViewModel(
    layout: 'profile-edit',
    js: 'profile-edit.js'
)]
class ProfileEditView implements ViewModelInterface
{
    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        protected UserService $userService,
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
     * @throws InvalidArgumentException
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        /** @var User $item */
        $item = $this->userService->getUser();

        if (!$item->isLogin()) {
            throw new RouteNotFoundException();
        }

        $id = $item->id;

        $form = $this->formFactory
            ->create(EditForm::class)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            );

        $view->setTitle('Profile Edit');

        return compact('form', 'id', 'item');
    }
}
