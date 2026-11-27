<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\PageBuilder\PageService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs PageService::getAvailableExtends() against the real MySQL test DB.
 *
 * The ORM is not mocked: pages are saved to the `pages` table and the query runs for real.
 * Only the app config and the language service are stubbed.
 */
class PageServiceDatabaseTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Page::class)->getTableName());
    }

    #[Test]
    public function getAvailableExtendsReturnsDistinctNonEmptyExtendsFromDatabase(): void
    {
        $this->savePage('blog');
        $this->savePage('blog');
        $this->savePage('shop');
        $this->savePage('');

        $extends = $this->createService([])->getAvailableExtends();

        self::assertSame(['blog' => 'blog', 'shop' => 'shop'], $extends->dump());
    }

    #[Test]
    public function getAvailableExtendsReturnsEmptyWhenNoPagesAndNoConfig(): void
    {
        $extends = $this->createService([])->getAvailableExtends();

        self::assertCount(0, $extends);
    }

    #[Test]
    public function getAvailableExtendsMergesConfiguredExtendsWithDatabaseValues(): void
    {
        $this->savePage('blog');

        $extends = $this->createService(['landing' => 'Landing Page'])->getAvailableExtends();

        self::assertSame(['blog' => 'blog', 'landing' => 'Landing Page'], $extends->dump());
    }

    #[Test]
    public function getAvailableExtendsUsesValueAsKeyForNumericConfigEntries(): void
    {
        $extends = $this->createService(['custom'])->getAvailableExtends();

        self::assertSame(['custom' => 'custom'], $extends->dump());
    }

    #[Test]
    public function getAvailableExtendsTranslatesNamedConfigEntries(): void
    {
        $service = $this->createService(['promo' => 'lang.promo'], ['lang.promo' => 'Promotion']);

        $extends = $service->getAvailableExtends();

        self::assertSame(['promo' => 'Promotion'], $extends->dump());
    }

    #[Test]
    public function getAvailableExtendsConfigOverridesDatabaseValueWithSameKey(): void
    {
        $this->savePage('blog');

        $extends = $this->createService(['blog' => 'Blog Layout'])->getAvailableExtends();

        self::assertSame(['blog' => 'Blog Layout'], $extends->dump());
    }

    #[Test]
    public function getAvailableExtendsIsSortedByKey(): void
    {
        $this->savePage('zeta');
        $this->savePage('alpha');

        $extends = $this->createService(['mid' => 'Mid'])->getAvailableExtends();

        self::assertSame(['alpha', 'mid', 'zeta'], array_keys($extends->dump()));
    }

    private function savePage(string $extends): void
    {
        $page = new Page();
        $page->title = 'Page ' . $extends;
        $page->alias = 'page-' . bin2hex(random_bytes(4));
        $page->extends = $extends;
        $page->state = BasicState::PUBLISHED;

        self::$orm->createOne(Page::class, $page);
    }

    private function createService(array $pageExtends, array $messages = []): PageService
    {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')
            ->willReturnCallback(fn(string $name) => $name === 'pages.page_extends' ? $pageExtends : null);

        $service = new PageService($app, self::$orm);

        // PageService::trans() reads the protected $lang from TranslatorTrait, which the constructor does not set.
        $lang = $this->createStub(LangService::class);
        $lang->method('trans')
            ->willReturnCallback(fn(string $id) => $messages[$id] ?? $id);

        new \ReflectionProperty(PageService::class, 'lang')->setValue($service, $lang);

        return $service;
    }
}
