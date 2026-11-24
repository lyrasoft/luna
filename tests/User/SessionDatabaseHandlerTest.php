<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Lyrasoft\Luna\User\Handler\SessionDatabaseHandler;
use PHPUnit\Framework\Attributes\AfterClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Runtime\Config;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Database\DatabaseAdapter;
use Windwalker\DI\Container;

class SessionDatabaseHandlerTest extends TestCase
{
    use DatabaseTestTrait;

    private const TABLE = 'luna_test_sessions';

    protected static function prepareTablesBeforeClass(): void
    {
        // gc() calls chronos(), which needs a ChronosService bound to the test container.
        static::$container->share(
            ChronosService::class,
            fn(Container $container) => new ChronosService(
                new Config(['app' => ['timezone' => 'UTC', 'server_timezone' => 'UTC']]),
                $container->get(DatabaseAdapter::class),
            ),
        );

        self::$orm->getDb()->prepare(
            'CREATE TABLE IF NOT EXISTS ' . self::TABLE . ' (
                id VARCHAR(128) NOT NULL PRIMARY KEY,
                data TEXT,
                time INT NOT NULL,
                remember TINYINT NOT NULL DEFAULT 0
            )'
        )->execute();
    }

    #[AfterClass]
    public static function removeTestResources(): void
    {
        static::$container->remove(ChronosService::class);

        self::$orm->getDb()->prepare('DROP TABLE IF EXISTS ' . self::TABLE)->execute();
    }

    protected function clearTables(): void
    {
        self::$orm->getDb()->prepare('DELETE FROM ' . self::TABLE)->execute();
    }

    private function createHandler(string $rememberExpires = '+1 day'): SessionDatabaseHandler
    {
        $handler = new SessionDatabaseHandler(self::$orm->getDb(), ['table' => self::TABLE]);

        // The config property is #[Inject]ed by the container; set it directly for this unit test.
        $property = new ReflectionProperty(SessionDatabaseHandler::class, 'config');
        $property->setValue(
            $handler,
            new Config(['user' => ['remember_expires' => $rememberExpires]])
        );

        return $handler;
    }

    private function insertSession(string $id, int $time, int $remember): void
    {
        self::$orm->getDb()->prepare(
            'INSERT INTO ' . self::TABLE . ' (id, data, time, remember) VALUES (:id, :data, :time, :remember)'
        )->execute(['id' => $id, 'data' => '', 'time' => $time, 'remember' => $remember]);
    }

    private function remainingIds(): array
    {
        return self::$orm->getDb()->prepare('SELECT id FROM ' . self::TABLE . ' ORDER BY id')
            ->execute()
            ->loadColumn()
            ->dump();
    }

    #[Test]
    public function gcPurgesExpiredNonRememberSessionsAndKeepsFreshOnes(): void
    {
        $now = time();

        $this->insertSession('stale', $now - 1000, 0);
        $this->insertSession('fresh', $now, 0);

        // gc() returns WriterManager::countAffected(), which does not reflect query-builder deletes; assert rows instead.
        $this->createHandler()->gc(500);

        self::assertSame(['fresh'], $this->remainingIds());
    }

    #[Test]
    public function gcPurgesRememberSessionsOlderThanRememberExpiresOnly(): void
    {
        $now = time();

        $this->insertSession('remember-old', $now - 2 * 86400, 1);
        $this->insertSession('remember-recent', $now - 3600, 1);

        // Non-remember lifetime is generous so only the remember rule applies.
        $this->createHandler('+1 day')->gc(PHP_INT_MAX / 2);

        self::assertSame(['remember-recent'], $this->remainingIds());
    }

    #[Test]
    public function gcUsesDefaultRememberExpiresWhenConfigIsEmpty(): void
    {
        $now = time();

        // Default '+100days' keeps a 2-day-old remember session.
        $this->insertSession('remember-2days', $now - 2 * 86400, 1);

        $this->createHandler('')->gc(PHP_INT_MAX / 2);

        self::assertSame(['remember-2days'], $this->remainingIds());
    }
}
