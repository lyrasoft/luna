<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Lyrasoft\Luna\Middleware\LangAssocMiddleware;
use Psr\Http\Message\ServerRequestInterface;
use Windwalker\DI\Attributes\AttributeHandler;
use Windwalker\DI\Attributes\ContainerAttributeInterface;

/**
 * The LangAssoc class.
 */
#[Attribute(Attribute::TARGET_FUNCTION | Attribute::TARGET_METHOD)]
class LangAssoc implements ContainerAttributeInterface
{
    public function __invoke(AttributeHandler $handler): callable
    {
        return static function (...$args) use ($handler) {
            $container = $handler->container;

            return $container->newInstance(LangAssocMiddleware::class)
                ->run(
                    $container->get(ServerRequestInterface::class),
                    fn() => $handler(...$args)
                );
        };
    }
}
