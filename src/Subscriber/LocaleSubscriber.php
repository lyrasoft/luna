<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Events\Web\BeforeRoutingEvent;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\DI\Container;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;

/**
 * The LocaleSubscriber class.
 */
#[EventSubscriber]
class LocaleSubscriber
{
    protected ?Language $language;

    public function __construct(protected Container $container)
    {
    }

    protected function getAppContext(): AppContext
    {
        return $this->container->get(AppContext::class);
    }

    protected function getLocaleService(): LocaleService
    {
        return $this->container->get(LocaleService::class);
    }

    #[ListenTo(BeforeRoutingEvent::class)]
    public function beforeRouting(BeforeRoutingEvent $event): void
    {
        $app = $this->getAppContext();

        $localeService = $this->getLocaleService();

        if (!$localeService->isEnabled() || !$localeService->isUriPrefixEnabled()) {
            return;
        }

        $state = $app->getState();
        $route = $event->route;
        $state->set('origin_route', $route);

        $app->getSystemUri();

        $segments = trim($route, '/');

        if ($segments === '') {
            $this->clearServices();

            return;
        }

        $segments = explode('/', $segments);

        // Check first segment is region key or not
        $code = strtolower($segments[0]);

        $language = $this->getLocaleService()->getLanguageByAlias($code);

        // No language path, set as default.
        if (!$language) {
            $this->clearServices();

            return;
        }

        // Set current language
        $this->injectLanguage($language);
        $this->clearServices();

        // Remove first segment and store back to Uri object
        array_shift($segments);

        $route = implode('/', $segments);

        $event->setRoute($route);

        $state->set('origin_route', $route);
    }

    public function injectLanguage(?Language $language = null): void
    {
        $this->language = $language;

        if ($language) {
            $this->getAppContext()->state->set('matched_locale', $language->code);
        }

        // $locale = [
        //     'alias' => $language->getAlias(),
        //     'code' => $language->getCode(),
        //     'id' => $language->getId(),
        //     'origin_route'
        // ];

        $this->clearServices();
    }

    protected function clearServices(): void
    {
        $container = $this->container;

        // Todo: Delete this after AppContext can transform inner values.
        $container->clearCache(Navigator::class);
        $container->clearCache(AppRequest::class);
        $container->clearCache(SystemUri::class);
    }
}
