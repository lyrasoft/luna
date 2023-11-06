<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth\Profile;

use Hybridauth\Adapter\AdapterInterface;

/**
 * Interface ProfileHandlerInterface
 */
interface ProfileHandlerInterface
{
    public function handle(AdapterInterface $adapter): array;

    public function getLoginName(): string;
}
