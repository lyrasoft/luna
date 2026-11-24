<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;
use Lyrasoft\Luna\Widget\WidgetService;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs WidgetService position and widget loading against the real test database.
 */
class WidgetServiceDatabaseTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::resetAndMigrate();
    }

    #[Before]
    protected function clearWidgetTable(): void
    {
        static::truncateTables(
            self::$orm->getEntityMetadata(Widget::class)->getTableName(),
        );
    }

    #[Test]
    public function loadWidgetsReturnsPublishedWidgetsOrderedByOrdering(): void
    {
        $this->createWidget(['title' => 'Second', 'ordering' => 2]);
        $this->createWidget(['title' => 'First', 'ordering' => 1]);
        $this->createWidget(['title' => 'Draft', 'ordering' => 0, 'state' => BasicState::UNPUBLISHED]);
        $this->createWidget(['title' => 'Other', 'position' => 'footer']);

        $service = $this->createService(localeEnabled: false);

        $widgets = $service->loadWidgets('header');

        self::assertCount(2, $widgets);
        self::assertInstanceOf(CustomHtmlWidget::class, $widgets[0]);
        self::assertSame('First', $widgets[0]->getData()->title);
        self::assertSame('Second', $widgets[1]->getData()->title);
    }

    #[Test]
    public function loadWidgetsFiltersByLanguageWhenLocaleIsActive(): void
    {
        $this->createWidget(['title' => 'Neutral', 'language' => '*', 'ordering' => 1]);
        $this->createWidget(['title' => 'English', 'language' => 'en-US', 'ordering' => 2]);
        $this->createWidget(['title' => 'Japanese', 'language' => 'ja-JP', 'ordering' => 3]);

        $service = $this->createService(localeEnabled: true, currentLanguage: 'en-US');

        $titles = array_map(
            fn($w) => $w->getData()->title,
            $service->loadWidgets('header'),
        );

        self::assertSame(['Neutral', 'English'], $titles);
    }

    #[Test]
    public function loadWidgetsSkipsTypesWithoutRegisteredClass(): void
    {
        $this->createWidget(['title' => 'Known', 'type' => 'custom-html']);
        $this->createWidget(['title' => 'Unknown', 'type' => 'no-such-type', 'ordering' => 2]);

        $service = $this->createService(localeEnabled: false);

        $widgets = $service->loadWidgets('header');

        self::assertCount(1, $widgets);
        self::assertSame('Known', $widgets[0]->getData()->title);
    }

    #[Test]
    public function hasWidgetsReturnsTrueWhenAnyPositionHasWidgets(): void
    {
        $this->createWidget(['position' => 'sidebar']);

        $service = $this->createService(localeEnabled: false);

        self::assertFalse($service->hasWidgets('empty-position'));
        self::assertTrue($service->hasWidgets('empty-position', 'sidebar'));
    }

    #[Test]
    public function hasWidgetsReturnsFalseWithoutAnyWidgets(): void
    {
        $service = $this->createService(localeEnabled: false);

        self::assertFalse($service->hasWidgets('header', 'footer'));
    }

    #[Test]
    public function getAllPositionsMergesDatabaseAndConfigPositions(): void
    {
        $this->createWidget(['position' => 'sidebar']);
        $this->createWidget(['position' => 'sidebar']);
        $this->createWidget(['position' => 'footer']);

        $service = $this->createService(
            localeEnabled: false,
            config: [
                'widget.positions' => [
                    'header',
                    'hero' => 'Hero Banner',
                ],
            ],
        );

        $positions = $service->getAllPositions();

        self::assertEqualsCanonicalizing(['footer', 'header', 'hero', 'sidebar'], array_keys($positions));
        self::assertSame('Hero Banner', $positions['hero']);
        self::assertSame('sidebar', $positions['sidebar']);
    }

    private function createWidget(array $data = []): Widget
    {
        $data = array_merge(
            [
                'title' => 'Widget',
                'type' => 'custom-html',
                'position' => 'header',
                'state' => BasicState::PUBLISHED,
                'ordering' => 1,
                'language' => '*',
                'params' => '{}',
            ],
            $data,
        );

        return self::$orm->createOne(Widget::class, $data);
    }

    private function createService(
        bool $localeEnabled = false,
        string $currentLanguage = '*',
        array $config = [],
    ): WidgetService {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')->willReturnCallback(
            fn(string $key) => match ($key) {
                'widget.types' => ['custom-html' => CustomHtmlWidget::class],
                default => $config[$key] ?? null,
            },
        );
        $app->method('make')->willReturnCallback(fn(string $class) => new $class());

        $locale = $this->createStub(LocaleService::class);
        $locale->method('isEnabled')->willReturn($localeEnabled);
        $locale->method('isStageEnabled')->willReturn($localeEnabled);
        $locale->method('getCurrentLanguageCode')->willReturn($currentLanguage);

        $service = new WidgetService($app, self::$orm, $locale);

        $lang = $this->createStub(LangService::class);
        $lang->method('has')->willReturn(false);
        new \ReflectionProperty($service, 'lang')->setValue($service, $lang);

        return $service;
    }
}
