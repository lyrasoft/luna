<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\View\Event\BeforeRenderEvent;
use Windwalker\DI\Container;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;

/**
 * The AutoOpenGraphSubscriber class.
 */
#[EventSubscriber]
class AutoOpenGraphSubscriber
{
    public function __construct(protected Container $container)
    {
    }

    #[ListenTo(BeforeRenderEvent::class)]
    public function beforeRender(BeforeRenderEvent $event): void
    {
        $htmlFrame = $event->getView()->getHtmlFrame();
        $metadata = $htmlFrame->getMetadata();
        $ogTypes = array_keys($metadata->getOpenGraphs());

        if (
            !in_array('og:site_name', $ogTypes, true)
            && $htmlFrame->getSiteName()
        ) {
            $htmlFrame->addOpenGraph('og:site_name', $htmlFrame->getSiteName());
        }

        if (!in_array('og:url', $ogTypes, true)) {
            $app = $this->container->get(AppContext::class);
            $htmlFrame->addOpenGraph('og:url', $app->getSystemUri()->full());
        }

        if (!in_array('og:type', $ogTypes, true)) {
            $htmlFrame->addOpenGraph('og:type', 'website');
        }
    }
}
