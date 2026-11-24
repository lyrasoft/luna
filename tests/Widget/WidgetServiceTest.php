<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;
use Lyrasoft\Luna\Widget\WidgetService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Wrapper\RawWrapper;

/**
 * Unit tests of WidgetService.
 *
 * Covers the position colour and name helpers, widget type lookup and instance
 * creation. The app, language and ORM services are doubles, so nothing here touches
 * the database.
 */
class WidgetServiceTest extends TestCase
{
    #[Test]
    public function textColorIsBlackOnLightBackground(): void
    {
        self::assertSame('black', WidgetService::getTextColor('#ffffff'));
    }

    #[Test]
    public function textColorIsWhiteOnDarkBackground(): void
    {
        self::assertSame('white', WidgetService::getTextColor('#000000'));
    }

    #[Test]
    public function textColorRespectsCustomSeparator(): void
    {
        // Luma of #808080 is about 128, so it is white at the default 200 but black at 100.
        self::assertSame('white', WidgetService::getTextColor('#808080'));
        self::assertSame('black', WidgetService::getTextColor('#808080', 100));
    }

    #[Test]
    public function positionColorFallsBackToLightGreyForEmptyPosition(): void
    {
        $service = $this->createService();

        self::assertSame('#F5F5F5', $service->getPositionColor(''));
    }

    #[Test]
    public function positionColorIsStablePerPositionAndAlwaysAHexColor(): void
    {
        $service = $this->createService();

        $first = $service->getPositionColor('hero');

        self::assertMatchesRegularExpression('/^#[0-9a-f]{6}$/i', $first);
        self::assertSame($first, $service->getPositionColor('hero'));
    }

    #[Test]
    public function positionNameReturnsRawWrapperValue(): void
    {
        $service = $this->createService();

        $name = $this->invokePositionName($service, new RawWrapper('Raw Name'));

        self::assertSame('Raw Name', $name);
    }

    #[Test]
    public function positionNameTranslatesDirectLangKey(): void
    {
        $service = $this->createService(langKeys: ['hero' => 'Hero Banner']);

        self::assertSame('Hero Banner', $this->invokePositionName($service, 'hero'));
    }

    #[Test]
    public function positionNameUsesWidgetPositionLangPrefix(): void
    {
        $service = $this->createService(langKeys: ['luna.widget.position.sidebar' => 'Side Bar']);

        self::assertSame('Side Bar', $this->invokePositionName($service, 'sidebar'));
    }

    #[Test]
    public function positionNameFallsBackToRawPosition(): void
    {
        $service = $this->createService();

        self::assertSame('unknown', $this->invokePositionName($service, 'unknown'));
    }

    #[Test]
    public function widgetTypeClassLookupReturnsOnlyValidAbstractWidgetSubclasses(): void
    {
        $service = $this->createService(
            config: [
                'widget.types' => [
                    'custom-html' => CustomHtmlWidget::class,
                    'invalid' => \stdClass::class,
                    'empty' => null,
                ],
            ],
        );

        self::assertSame(CustomHtmlWidget::class, $service->getWidgetTypeClass('custom-html'));
        self::assertNull($service->getWidgetTypeClass('invalid'));
        self::assertNull($service->getWidgetTypeClass('empty'));
        self::assertNull($service->getWidgetTypeClass('missing'));
    }

    #[Test]
    public function createWidgetInstanceReturnsNullForUnknownType(): void
    {
        $service = $this->createService(config: ['widget.types' => []]);

        self::assertNull($service->createWidgetInstance('missing'));
    }

    #[Test]
    public function createWidgetInstanceMakesTypeAndAttachesData(): void
    {
        $widget = new Widget();
        $instance = new CustomHtmlWidget();

        $app = $this->createMock(ApplicationInterface::class);
        $app->method('config')->willReturnCallback(
            fn(string $key) => $key === 'widget.types' ? ['custom-html' => CustomHtmlWidget::class] : null,
        );
        $app->expects($this->once())
            ->method('make')
            ->with(CustomHtmlWidget::class)
            ->willReturn($instance);

        $service = $this->createService(app: $app);

        $result = $service->createWidgetInstance('custom-html', $widget);

        self::assertSame($instance, $result);
        self::assertSame($widget, $result->getData());
    }

    private function createService(
        ?ApplicationInterface $app = null,
        array $config = [],
        array $langKeys = [],
    ): WidgetService {
        if ($app === null) {
            $app = $this->createStub(ApplicationInterface::class);
            $app->method('config')->willReturnCallback(
                fn(string $key) => $config[$key] ?? null,
            );
        }

        $lang = $this->createStub(LangService::class);
        $lang->method('has')->willReturnCallback(
            fn(string $key) => array_key_exists($key, $langKeys),
        );
        $lang->method('trans')->willReturnCallback(
            fn(string $key) => $langKeys[$key] ?? $key,
        );

        $service = new WidgetService(
            $app,
            $this->createStub(ORM::class),
            $this->createStub(LocaleService::class),
        );

        $property = new \ReflectionProperty($service, 'lang');
        $property->setValue($service, $lang);

        return $service;
    }

    private function invokePositionName(WidgetService $service, string|RawWrapper $position): string
    {
        $method = new \ReflectionMethod($service, 'getPositionName');

        return $method->invoke($service, $position);
    }
}
