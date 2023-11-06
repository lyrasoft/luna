<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Error;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Module\Front\Error\ErrorView;
use Throwable;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\MiddlewareRunner;
use Windwalker\Core\Error\ErrorHandlerInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Router;
use Windwalker\Core\Service\ErrorService;
use Windwalker\Core\View\View;
use Windwalker\DI\Container;
use Windwalker\Http\Output\StreamOutput;
use Windwalker\Http\Response\HtmlResponse;
use Windwalker\Http\Response\Response;

/**
 * The LunaErrorHandler class.
 */
class LunaErrorHandler implements ErrorHandlerInterface
{
    public function __construct(
        protected Container $container,
        protected string $route = 'front::home',
        protected ?string $layout = null
    ) {
    }

    /**
     * @inheritDoc
     */
    public function __invoke(Throwable $e): void
    {
        $app = $this->container->get(AppContext::class);

        $app->service(LangService::class)
            ->loadFileFromPath(LunaPackage::path('resources/languages'), 'luna', 'ini');

        $router = $app->service(Router::class);
        $route = $router->getRoute($this->route);
        $app = $this->container->get(AppContext::class);

        $this->container->modify(
            AppContext::class,
            fn(AppContext $context) => $context->setMatchedRoute($route)
        );

        /** @var View $view */
        $view = $app->make(ErrorView::class);

        if ($this->layout) {
            $view->setLayoutMap(['default' => $this->layout]);
        }

        if ($route) {
            $middlewares = $route->getMiddlewares();
            $runner = $app->make(MiddlewareRunner::class);
            try {
                $res = $runner->run(
                    $app->getAppRequest()->getRequest(),
                    $middlewares,
                    fn() => $view->render(['exception' => $e])
                );
            } catch (\Throwable $e) {
                $res = HtmlResponse::fromString($e->getMessage());
            }
        } else {
            $res = $view->render(['exception' => $e]);
        }

        $code = $e->getCode();

        $code = ErrorService::normalizeCode($code);

        $res = $res->withStatus($code);

        $output = new StreamOutput();
        $output->respond($res);
    }
}
