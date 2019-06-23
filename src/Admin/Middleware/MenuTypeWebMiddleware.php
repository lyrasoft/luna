<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use function Windwalker\arr;
use Windwalker\Core\Application\Middleware\AbstractWebMiddleware;
use Windwalker\Core\Router\MainRouter;
use Windwalker\Event\Event;
use Windwalker\Middleware\MiddlewareInterface;

/**
 * The MenuTypeWrbMiddleware class.
 *
 * @since  __DEPLOY_VERSION__
 */
class MenuTypeWebMiddleware extends AbstractWebMiddleware
{
    /**
     * Middleware logic to be invoked.
     *
     * @param Request                      $request  The request.
     * @param Response                     $response The response.
     * @param callable|MiddlewareInterface $next     The next middleware.
     *
     * @return  Response
     */
    public function __invoke(Request $request, Response $response, $next = null)
    {
        $type = $this->app->input->get('type');

        // Auto add type to routing
        $this->app->listen('onRouterBeforeRouteBuild', static function (Event $event) use ($type) {
            $route = $event['route'];
            /** @var MainRouter $router */
            $router = $event['router'];

            // Only auto add classroom_id if route is in ClassroomMiddleware
            $inMenu = arr((array) $router->getRoute($route)->getExtra('middlewares'))
                    ->filter(static function ($middleware) {
                        return $middleware instanceof static || $middleware === static::class;
                    })
                    ->count() >= 1;

            if ($inMenu) {
                $queries = $event['queries'];

                if ($type && empty($queries['type'])) {
                    $queries['type'] = $type;
                    $event['queries'] = $queries;
                }
            }
        });

        return $next($request, $response);
    }
}
