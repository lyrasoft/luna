<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Error;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Module\Front\Error\ErrorView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\MiddlewareRunner;
use Windwalker\Core\Error\ErrorHandlerInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Router;
use Windwalker\Core\Service\ErrorService;
use Windwalker\Core\View\View;
use Windwalker\Http\Output\StreamOutput;

/**
 * The LunaErrorHandler class.
 */
class LunaErrorHandler implements ErrorHandlerInterface
{
    public function __construct(
        protected AppContext $app,
        protected string $route = 'front::home',
        protected ?string $layout = null
    ) {
    }

    /**
     * @inheritDoc
     */
    public function __invoke(\Throwable $e): void
    {
        $this->app->service(LangService::class)
            ->loadFileFromPath(LunaPackage::path('resources/languages'), 'luna', 'ini');

        $router = $this->app->service(Router::class);
        $route = $router->getRoute($this->route);

        $this->app->getContainer()->modify(
            AppContext::class,
            fn(AppContext $context) => $context->setMatchedRoute($route)
        );

        $middlewares = $route->getMiddlewares();
        $runner = $this->app->make(MiddlewareRunner::class);

        /** @var View $view */
        $view = $this->app->make(ErrorView::class);

        if ($this->layout) {
            $view->setLayoutMap(['default' => $this->layout]);
        }

        $res = $runner->run(
            $this->app->getAppRequest()->getRequest(),
            $middlewares,
            fn() => $view->render(['exception' => $e])
        );

        $code = $e->getCode();

        $code = ErrorService::normalizeCode($code);

        $res = $res->withStatus($code);

        $output = new StreamOutput();
        $output->respond($res);
    }
}
