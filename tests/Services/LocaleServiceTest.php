<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs LocaleService language lookups against the real MySQL test DB.
 */
class LocaleServiceTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::resetAndMigrate();
    }

    #[Before]
    protected function clearLanguageTable(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Language::class)->getTableName());
    }

    private function saveLanguage(string $alias, string $code, BasicState $state, int $ordering = 1): int
    {
        $language = new Language();
        $language->title = $alias;
        $language->alias = $alias;
        $language->code = $code;
        $language->state = $state;
        $language->ordering = $ordering;

        return self::$orm->createOne(Language::class, $language)->id;
    }

    private function createService(): LocaleService
    {
        return new LocaleService(
            $this->createStub(AppContext::class),
            self::$orm,
            $this->createStub(Navigator::class),
            $this->createStub(LangService::class),
        );
    }

    public static function langCodeProvider(): array
    {
        return [
            'no separator' => ['en', 'en'],
            'dash region' => ['en-us', 'en-US'],
            'underscore region' => ['zh_tw', 'zh_TW'],
            'already formatted' => ['ja-JP', 'ja-JP'],
        ];
    }

    #[Test]
    #[DataProvider('langCodeProvider')]
    public function formatLangCodeNormalizesRegion(string $input, string $expected): void
    {
        self::assertSame($expected, LocaleService::formatLangCode($input));
    }

    #[Test]
    public function getAvailableLanguagesReturnsOnlyPublishedKeyedByAlias(): void
    {
        $this->saveLanguage('en', 'en-US', BasicState::PUBLISHED, 1);
        $this->saveLanguage('zh', 'zh-TW', BasicState::UNPUBLISHED, 2);
        $service = $this->createService();

        $languages = $service->getAvailableLanguages();

        self::assertCount(1, $languages);
        self::assertSame('en-US', $languages['en']->code);
    }

    #[Test]
    public function getLanguageByAliasFindsPublishedLanguage(): void
    {
        $this->saveLanguage('en', 'en-US', BasicState::PUBLISHED);
        $service = $this->createService();

        self::assertSame('en-US', $service->getLanguageByAlias('en')?->code);
        self::assertNull($service->getLanguageByAlias('fr'));
    }

    #[Test]
    public function getLanguageByCodeFindsMatchingCode(): void
    {
        $this->saveLanguage('en', 'en-US', BasicState::PUBLISHED);
        $service = $this->createService();

        self::assertSame('en', $service->getLanguageByCode('en-US')?->alias);
        self::assertNull($service->getLanguageByCode('de-DE'));
    }

    #[Test]
    public function getLanguageByIdFindsPublishedLanguageById(): void
    {
        $id = $this->saveLanguage('en', 'en-US', BasicState::PUBLISHED);
        $this->saveLanguage('zh', 'zh-TW', BasicState::UNPUBLISHED, 2);
        $service = $this->createService();

        self::assertSame('en-US', $service->getLanguageById($id)?->code);
        self::assertNull($service->getLanguageById(999999));
    }
}
