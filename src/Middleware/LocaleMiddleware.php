<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Lyrasoft\Luna\Services\LocaleService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Http\BrowserNext;
use Windwalker\Core\Middleware\RoutingExcludesTrait;
use Windwalker\Core\Router\Event\AfterRouteBuildEvent;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Definition\DefinitionFactory;
use Windwalker\DI\Definition\DefinitionInterface;

/**
 * The LocaleMiddleware class.
 */
class LocaleMiddleware implements MiddlewareInterface
{
    use RoutingExcludesTrait;

    public function __construct(
        protected AppContext $app,
        protected bool $useBrowser = false,
        protected bool $uriPrefix = true,
        protected string $sessionKey = 'locale',
        protected mixed $excludes = null,
    ) {
    }

    /**
     * @inheritDoc
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (!$this->app->config('luna.i18n.enabled')) {
            return $handler->handle($request);
        }

        if ($result = $this->isExclude()) {
            return $result === true ? $handler->handle($request) : $result;
        }

        $localeService = $this->app->service(LocaleService::class);

        $state = $this->app->getState();
        $locale = $state->get('matched_locale');

        if ($locale) {
            $state->remember($this->sessionKey, $locale);
        } else {
            $locale = $state->get($this->sessionKey);
        }

        $browser = $this->app->retrieve(BrowserNext::class);

        if (!$locale && $this->useBrowser && !$browser->isRobot()) {
            $locale = $localeService->getBrowserLanguage();
        }

        if ($locale) {
            $localeService->setLocale($locale);
        }

        // Nav
        if ($this->uriPrefix && $localeService->isUriPrefixEnabled()) {
            $nav = $this->app->service(Navigator::class);

            $localeService->listenNavigatorBuildEventOnce(
                $nav,
                function (AfterRouteBuildEvent $event) use ($localeService) {
                    $nav = $event->navigator;
                    $route = $nav->findRoute($event->route);
                    $matched = $nav->getMatchedRoute();

                    if (!$matched || !$route) {
                        return;
                    }

                    foreach ((array) $route->getExtraValue('middlewares') as $item) {
                        if ($this->isSame($item)) {
                            $lang = $localeService->getCurrentLanguage();

                            if ($lang) {
                                $alias = $lang->getAlias();
                                $event->url = $alias . '/' . $event->url;
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
     * @param  string|DefinitionInterface|object  $middleware
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

    public function getExcludes(): mixed
    {
        return $this->excludes;
    }
}
