<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests;

use Windwalker\Core\Testing\AbstractTestApp;
use Windwalker\Core\Testing\Database\TestDatabasesProvider;

class TestApp extends AbstractTestApp
{
    protected static function getContextProviders(): array
    {
        return [
            fn() => new TestDatabasesProvider(env('WINDWALKER_TEST_DB_DSN')),
        ];
    }
}
