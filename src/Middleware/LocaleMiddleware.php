<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Lyrasoft\Luna\Services\LocaleService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Event\AfterRouteBuildEvent;
use Windwalker\Core\Router\Event\BeforeRouteBuildEvent;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Definition\DefinitionFactory;
use Windwalker\DI\Definition\DefinitionInterface;

/**
 * The LocaleMiddleware class.
 */
class LocaleMiddleware implements MiddlewareInterface
{
    public function __construct(
        protected AppContext $app,
        protected LocaleService $localeService,
        protected bool $useBrowser = false,
        protected bool $routePrefix = true,
        protected string $sessionKey = 'locale',
    ) {
    }

    /**
     * @inheritDoc
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $state = $this->app->getState();
        $locale = $state->get('matched_locale');

        if ($locale) {
            $state->remember($this->sessionKey, $locale);
        } else {
            $locale = $state->get($this->sessionKey) ?: $this->localeService->getLocale();
        }

        if ($locale) {
            // If URL has lang prefix
            $this->localeService->setLocale($locale);
        } elseif ($this->useBrowser) {
            $locale = $this->localeService->getBrowserLanguage();

            $this->localeService->setLocale($locale);
        }

        // Nav
        if ($this->routePrefix) {
            $nav = $this->app->service(Navigator::class);
            $nav->on(
                AfterRouteBuildEvent::class,
                function (AfterRouteBuildEvent $event) {
                    $nav = $event->getNavigator();
                    $route = $nav->findRoute($event->getRoute());
                    $matched = $nav->getMatchedRoute();

                    if (!$matched || !$route) {
                        return;
                    }

                    foreach ((array) $route->getExtraValue('middlewares') as $item) {
                        if ($this->isSame($item)) {
                            $url = &$event->getUrl();

                            $lang = $this->localeService->getCurrentLanguage();

                            if ($lang) {
                                $alias = $lang->getAlias();
                                $url = $alias . '/' . $url;
                            }
                            return;
                        }
                    }
                }
            );
        }

        return $handler->handle($request);
    }

    /**
     * isSame
     *
     * @param string|DefinitionInterface|object $middleware
     *
     * @return  bool
     *
     * @throws \ReflectionException
     *
     * @since  1.8.39
     */
    protected function isSame(mixed $middleware): bool
    {
        if (!DefinitionFactory::isSameClass(static::class, $middleware)) {
            return false;
        }

        if (!$middleware instanceof MiddlewareInterface) {
            $middleware = $this->app->getContainer()->resolve($middleware);
        }

        if (!$middleware instanceof static) {
            return false;
        }

        return true;
    }
}
