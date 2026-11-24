<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Migration;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Config;
use Lyrasoft\Luna\Entity\User;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Verifies the test environment: real MySQL + Luna migrations.
 */
class MigrationTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    public function testMigrationsCreateTables(): void
    {
        $tables = self::$db->getSchema()->getTables(true);

        foreach ([Config::class, User::class, Article::class] as $entity) {
            $table = self::$orm->getEntityMetadata($entity)->getTableName();

            self::assertArrayHasKey($table, $tables);
        }
    }
}
