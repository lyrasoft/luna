<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\Config;
use Lyrasoft\Luna\Services\ConfigService;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs ConfigService lookups and caching against the real MySQL test DB.
 */
class ConfigServiceTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    #[Before]
    protected function clearConfigTable(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Config::class)->getTableName());
    }

    private function saveConfig(string $type, string $subtype, array $content): void
    {
        $config = new Config();
        $config->type = $type;
        $config->subtype = $subtype;
        $config->content = $content;

        self::$orm->createOne(Config::class, $config);
    }

    private function createService(): ConfigService
    {
        return new ConfigService(self::$orm);
    }

    #[Test]
    public function getConfigItemReturnsNullWhenMissing(): void
    {
        $service = $this->createService();

        self::assertNull($service->getConfigItem('site'));
    }

    #[Test]
    public function getConfigItemFindsByType(): void
    {
        $this->saveConfig('site', '', ['name' => 'Luna']);
        $service = $this->createService();

        $item = $service->getConfigItem('site');

        self::assertInstanceOf(Config::class, $item);
        self::assertSame(['name' => 'Luna'], $item->content);
    }

    #[Test]
    public function getConfigItemFiltersBySubtype(): void
    {
        $this->saveConfig('mail', 'smtp', ['host' => 'smtp.example.com']);
        $this->saveConfig('mail', 'api', ['key' => 'abc']);
        $service = $this->createService();

        $item = $service->getConfigItem('mail', 'api');

        self::assertSame(['key' => 'abc'], $item->content);
    }

    #[Test]
    public function getConfigReturnsEmptyCollectionWhenMissing(): void
    {
        $service = $this->createService();

        $config = $service->getConfig('site');

        self::assertSame([], $config->dump());
    }

    #[Test]
    public function getConfigReturnsContentAsCollection(): void
    {
        $this->saveConfig('site', '', ['name' => 'Luna', 'lang' => 'en']);
        $service = $this->createService();

        $config = $service->getConfig('site');

        self::assertSame('Luna', $config->get('name'));
        self::assertSame('en', $config->get('lang'));
    }

    #[Test]
    public function getConfigCachesResultUntilRefresh(): void
    {
        $this->saveConfig('site', '', ['name' => 'Luna']);
        $service = $this->createService();

        self::assertSame('Luna', $service->getConfig('site')->get('name'));

        // Change the row directly; the cached value must still win.
        self::$orm->getDb()->prepare(
            'UPDATE ' . self::$orm->getEntityMetadata(Config::class)->getTableName()
            . ' SET content = :content WHERE type = :type'
        )->execute(['content' => json_encode(['name' => 'Changed']), 'type' => 'site']);

        self::assertSame('Luna', $service->getConfig('site')->get('name'));
        self::assertSame('Changed', $service->getConfig('site', refresh: true)->get('name'));
    }

    #[Test]
    public function getConfigAppliesExtraConditions(): void
    {
        $this->saveConfig('site', '', ['name' => 'Luna']);
        $service = $this->createService();

        self::assertSame([], $service->getConfig('site', conditions: ['subtype' => 'missing'])->dump());
    }
}
