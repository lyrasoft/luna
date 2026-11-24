<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Script\UnicornScript;
use Windwalker\DOM\HTMLElement;
use Windwalker\Query\Query;

use function Windwalker\DOM\h;

/**
 * Test-only subclass of LanguageListField that exposes injection and the protected prepareQuery() hook.
 * Used only by LanguageListFieldTest; remove together with that test.
 */
class LanguageListFieldFixture extends LanguageListField
{
    public function inject(LocaleService $localeService, UnicornScript $unicornScript): void
    {
        $this->localeService = $localeService;
        $this->unicornScript = $unicornScript;
    }

    public function applyQuery(Query $query): void
    {
        $this->prepareQuery($query);
    }
}

/**
 * Covers the logic in LanguageListField: fallback value in prepareInput(), the TomSelect script in
 * buildFieldElement(), the active-language query in prepareQuery(), and the flag class in createItemOption().
 */
class LanguageListFieldTest extends TestCase
{
    #[Test]
    public function prepareInputFallsBackToLocaleFallbackWhenEmptyAndEnabled(): void
    {
        $localeService = $this->createStub(LocaleService::class);
        $localeService->method('getFallback')->willReturn('ja-JP');
        $subject = $this->makeSubject($localeService, $this->createStub(UnicornScript::class));

        $subject->defaultAsFallback(true);
        $subject->prepareInput(h('select'));

        self::assertSame('ja-JP', $subject->getValue());
    }

    #[Test]
    public function prepareInputKeepsExistingValueWhenFallbackEnabled(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getFallback');
        $subject = $this->makeSubject($localeService, $this->createStub(UnicornScript::class));

        $subject->defaultAsFallback(true);
        $subject->setValue('zh-TW');
        $subject->prepareInput(h('select'));

        self::assertSame('zh-TW', $subject->getValue());
    }

    #[Test]
    public function prepareInputLeavesValueEmptyWhenFallbackDisabled(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getFallback');
        $subject = $this->makeSubject($localeService, $this->createStub(UnicornScript::class));

        $subject->prepareInput(h('select'));

        self::assertEmpty($subject->getValue());
    }

    #[Test]
    public function buildFieldElementImportsTomSelectScriptTargetingFieldId(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with($this->callback(
                fn(string $js) => str_contains($js, "u.\$ui.tomSelect('#lang-field'")
                    && str_contains($js, 'flagClass')
            ))
            ->willReturnSelf();

        $subject = new LanguageListFieldFixture('lang', '', ['id' => 'lang-field']);
        $subject->inject($this->createStub(LocaleService::class), $unicornScript);
        // Null table makes prepareOptions() return early, so no database is needed.
        $subject->table(null);

        $subject->buildFieldElement(h('select'));
    }

    #[Test]
    public function prepareQuerySelectsActiveLanguagesOrderedByOrdering(): void
    {
        $subject = $this->makeSubject($this->createStub(LocaleService::class), $this->createStub(UnicornScript::class));

        $query = new Query();
        $subject->applyQuery($query);

        $sql = $query->render(false);

        self::assertStringContainsString('"language"."id"', $sql);
        self::assertStringContainsString('"language"."title"', $sql);
        self::assertStringContainsString('"language"."image"', $sql);
        self::assertMatchesRegularExpression('/"language"\."state" = :\w+/', $sql);
        $stateValues = array_map(
            static fn(array $bound): mixed => $bound['value']->getValue(),
            $query->getBounded()
        );
        self::assertContains(1, $stateValues);
        self::assertMatchesRegularExpression('/ORDER BY "language"\."ordering" ASC/', $sql);
    }

    #[Test]
    public function createItemOptionUsesCodeAsValueAndFlagClassFromLocale(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->once())
            ->method('getFlagIconClass')
            ->with('jp')
            ->willReturn('fi fi-jp');

        $subject = $this->makeSubject($localeService, $this->createStub(UnicornScript::class));
        $subject->valueField('code');
        $subject->textField('title');

        $option = $subject->createItemOption($this->makeLanguage('ja-JP', 'Japanese', 'jp'));

        self::assertSame('ja-JP', $option['value']);
        self::assertStringContainsString('Japanese', $option->render());
        self::assertSame('fi fi-jp', $option['data-flag-class']);
    }

    private function makeSubject(LocaleService $localeService, UnicornScript $unicornScript): LanguageListFieldFixture
    {
        $subject = new LanguageListFieldFixture('lang');
        $subject->inject($localeService, $unicornScript);

        return $subject;
    }

    private function makeLanguage(string $code, string $title, string $image): Language
    {
        $language = new Language();
        $language->code = $code;
        $language->title = $title;
        $language->image = $image;

        return $language;
    }
}
