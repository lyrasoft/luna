<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

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
            $container = $handler->getContainer();

            return $container->newInstance(LangAssocMiddleware::class)
                ->run(
                    $container->get(ServerRequestInterface::class),
                    fn() => $handler(...$args)
                );
        };
    }
}
