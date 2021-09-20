<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Registration;

use Lyrasoft\Luna\Module\Front\Auth\SocialLoginViewTrait;
use Lyrasoft\Luna\Module\Front\Registration\Form\RegistrationForm;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;

/**
 * The RegistrationView class.
 */
#[ViewModel(
    layout: 'registration',
    js: 'registration.js'
)]
class RegistrationView implements ViewModelInterface
{
    use SocialLoginViewTrait;

    /**
     * RegistrationView constructor.
     */
    public function __construct(
        protected FormFactory $formFactory,
        protected UserService $userService,
        protected Navigator $nav
    )
    {
        //
    }

    /**
     * Prepare View.
     *
     * @param  AppContext  $app   The web app context.
     * @param  View        $view  The view object.
     *
     * @return array|RouteUri
     */
    public function prepare(AppContext $app, View $view): array|RouteUri
    {
        if ($this->userService->getUser()->isLogin()) {
            return $this->nav->to('home');
        }

        $form = $this->formFactory->create(RegistrationForm::class);
        $form->setNamespace('user')
            ->fill($app->getState()->getAndForget('reg.data') ?? []);

        return compact('form');
    }
}
