<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Auth;

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;

/**
 * The ForgetResetView class.
 */
#[ViewModel(
    layout: [
        'default' => 'forget-reset',
        'complete' => 'forget-reset-complete'
    ],
    js: 'forget-reset.js'
)]
class ForgetResetView implements ViewModelInterface
{
    /**
     * Constructor.
     */
    public function __construct(protected Navigator $nav)
    {
        //
    }

    /**
     * Prepare View.
     *
     * @param  AppContext  $app   The web app context.
     * @param  View        $view  The view object.
     *
     * @return  mixed
     */
    public function prepare(AppContext $app, View $view): array
    {
        $token = $app->getState()->get('reset.token');

        if (!$token) {
            return $this->nav->to('home');
        }

        return compact('token');
    }
}
