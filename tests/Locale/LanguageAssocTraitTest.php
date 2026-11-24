<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Locale;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Locale\LanguageAssocTrait;
use Lyrasoft\Luna\Services\AssociationService;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Form\Field\AbstractField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;

use function Windwalker\collect;

/**
 * Test-only host class for LanguageAssocTrait. Used only by LanguageAssocTraitTest; remove together with that test.
 */
class LanguageAssocTraitFixture
{
    use LanguageAssocTrait;

    public function inject(LocaleService $localeService, AssociationService $associationService): void
    {
        $this->localeService = $localeService;
        $this->associationService = $associationService;
    }
}

class LanguageAssocTraitTest extends TestCase
{
    private LanguageAssocTraitFixture $subject;

    private LocaleService $localeService;

    private AssociationService $associationService;

    protected function setUp(): void
    {
        $this->localeService = $this->createStub(LocaleService::class);
        $this->localeService->method('getFlagIconClass')
            ->willReturnCallback(fn(string $image) => 'flag-' . $image);

        $this->localeService->method('getAvailableLanguages')
            ->willReturn(
                collect([
                    $this->makeLanguage('en-US', 'English', 'us'),
                    $this->makeLanguage('ja-JP', 'Japanese', 'jp'),
                    $this->makeLanguage('zh-TW', 'Chinese', 'tw'),
                ])
            );

        $this->associationService = $this->createStub(AssociationService::class);

        $this->subject = new LanguageAssocTraitFixture();
        $this->subject->inject($this->localeService, $this->associationService);
    }

    public static function skippedLanguages(): array
    {
        return [
            'wildcard' => ['*'],
            'empty' => [''],
        ];
    }

    #[Test]
    #[DataProvider('skippedLanguages')]
    public function defineFormDoesNothingForWildcardOrEmptyLanguage(string $lang): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getAvailableLanguages');
        $this->subject->inject($localeService, $this->associationService);

        $form = new Form();
        $this->subject->defineForm($lang, $form, TextField::class);

        self::assertSame([], iterator_to_array($form->getFields()));
    }

    #[Test]
    public function defineFormAddsOtherLanguagesUnderAssocNamespaceExcludingCurrent(): void
    {
        $form = new Form();
        $this->subject->defineForm('ja-JP', $form, TextField::class);

        $fields = iterator_to_array($form->getFields());

        self::assertSame(['assoc/en-US', 'assoc/zh-TW'], array_keys($fields));
        self::assertArrayNotHasKey('assoc/ja-JP', $fields);

        foreach ($fields as $field) {
            self::assertInstanceOf(TextField::class, $field);
        }
    }

    #[Test]
    public function defineFormLabelContainsFlagIconAndLanguageTitle(): void
    {
        $form = new Form();
        $this->subject->defineForm('ja-JP', $form, TextField::class);

        $field = $form->getField('assoc/en-US');

        self::assertNotNull($field);
        self::assertStringContainsString('flag-us', $field->getLabel()->render());
        self::assertSame('English', trim($field->getLabelName()));
    }

    #[Test]
    public function defineFormCallsPostHandlerForEachOtherLanguageField(): void
    {
        $form = new Form();
        $calls = [];

        $this->subject->defineForm(
            'en-US',
            $form,
            TextField::class,
            function (AbstractField $field, Form $passedForm) use (&$calls) {
                $calls[] = [$field->getName(), $passedForm];
            }
        );

        self::assertCount(2, $calls);
        self::assertSame(['ja-JP', 'zh-TW'], array_column($calls, 0));

        foreach ($calls as [, $passedForm]) {
            self::assertSame($form, $passedForm);
        }
    }

    #[Test]
    public function defineFormWithoutPostHandlerStillAddsFields(): void
    {
        $form = new Form();
        $this->subject->defineForm('en-US', $form, TextField::class, null);

        self::assertTrue($form->hasField('assoc/ja-JP'));
        self::assertTrue($form->hasField('assoc/zh-TW'));
    }

    #[Test]
    public function prepareAssocValuesFillsFieldsByAssociationKey(): void
    {
        $this->associationService->method('getRelativeItemsByTargetId')
            ->willReturn([
                (object) ['key' => 'ja-JP', 'targetId' => 10],
                (object) ['key' => 'zh-TW', 'targetId' => 20],
            ]);

        $form = new Form();
        $this->subject->defineForm('en-US', $form, TextField::class);

        $this->subject->prepareAssocValues('article', 5, $form);

        self::assertEquals(10, $form->getField('assoc/ja-JP')->getValue());
        self::assertEquals(20, $form->getField('assoc/zh-TW')->getValue());
    }

    #[Test]
    public function prepareAssocValuesQueriesAssociationsByTypeAndTargetId(): void
    {
        $associationService = $this->createMock(AssociationService::class);
        $associationService->expects($this->once())
            ->method('getRelativeItemsByTargetId')
            ->with('article', 5)
            ->willReturn([]);

        $this->subject->inject($this->localeService, $associationService);

        $this->subject->prepareAssocValues('article', 5, new Form());
    }

    #[Test]
    public function saveLangAssociationsDelegatesToLocaleService(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->once())
            ->method('saveLangAssociations')
            ->with('article', 'en-US', 5, ['ja-JP' => 10]);

        $this->subject->inject($localeService, $this->associationService);

        $this->subject->saveLangAssociations('article', 'en-US', 5, ['ja-JP' => 10]);
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
