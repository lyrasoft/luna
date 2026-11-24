<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Field\FlagListField;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Script\UnicornScript;
use Windwalker\DOM\HTMLElement;
use Windwalker\Filesystem\FileObject;

use function Windwalker\DOM\h;

/**
 * Test-only subclass of FlagListField. It replaces the filesystem scan (getFlagFiles) with an in-memory list
 * of flag files and lets the test inject its collaborators. Used only by FlagListFieldTest; remove together with
 * that test.
 */
class FlagListFieldFixture extends FlagListField
{
    /**
     * @var  list<FileObject>
     */
    public array $flagFiles = [];

    public function inject(LocaleService $localeService, UnicornScript $unicornScript): void
    {
        $this->localeService = $localeService;
        $this->unicornScript = $unicornScript;
    }

    public function getFlagFiles(): iterable
    {
        return $this->flagFiles;
    }
}

class FlagListFieldTest extends TestCase
{
    private FlagListFieldFixture $subject;

    private LocaleService $localeService;

    private UnicornScript $unicornScript;

    protected function setUp(): void
    {
        $this->localeService = $this->createStub(LocaleService::class);
        $this->localeService->method('getFlagIconClass')
            ->willReturnCallback(fn(string $name) => 'flag-icon-' . $name);

        $this->unicornScript = $this->createStub(UnicornScript::class);
        $this->unicornScript->method('importMainThen')->willReturnSelf();

        $this->subject = new FlagListFieldFixture('lang', 'Language');
        $this->subject->inject($this->localeService, $this->unicornScript);
        $this->subject->flagFiles = [
            new FileObject('/assets/flags/4x3/us.png'),
            new FileObject('/assets/flags/4x3/jp.svg'),
        ];
    }

    #[Test]
    public function prepareOptionsUsesFileBasenameWithoutExtensionAsValueAndText(): void
    {
        $options = $this->subject->getOptions();

        self::assertCount(2, $options);
        self::assertSame('us', $options[0]['value']);
        self::assertSame('us', $options[0]->textContent);
        self::assertSame('jp', $options[1]['value']);
        self::assertSame('jp', $options[1]->textContent);
    }

    #[Test]
    public function prepareOptionsSetsFlagClassFromLocaleServicePerFlag(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->exactly(2))
            ->method('getFlagIconClass')
            ->willReturnCallback(fn(string $name) => 'flag-icon-' . $name);

        $this->subject->inject($localeService, $this->unicornScript);

        $options = $this->subject->getOptions();

        self::assertSame('flag-icon-us', $options[0]['data-flag-class']);
        self::assertSame('flag-icon-jp', $options[1]['data-flag-class']);
    }

    #[Test]
    public function prepareOptionsMergesOptionAttrsIntoEveryOptionWithoutLeakingFlagClass(): void
    {
        $this->subject->optionAttrs(['data-group' => 'world']);

        $options = $this->subject->getOptions();

        self::assertSame('world', $options[0]['data-group']);
        self::assertSame('world', $options[1]['data-group']);
        self::assertSame('flag-icon-us', $options[0]['data-flag-class']);
        self::assertSame('flag-icon-jp', $options[1]['data-flag-class']);
    }

    #[Test]
    public function prepareOptionsReturnsEmptyListAndSkipsLocaleServiceWhenNoFlagFiles(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getFlagIconClass');

        $this->subject->inject($localeService, $this->unicornScript);
        $this->subject->flagFiles = [];

        self::assertSame([], $this->subject->getOptions());
    }

    #[Test]
    public function buildFieldElementMarksOptionMatchingValueAsSelected(): void
    {
        $this->subject->setValue('jp');

        $select = $this->subject->buildFieldElement(h('select', []));

        self::assertInstanceOf(HTMLElement::class, $select);

        $options = $select->getElementsByTagName('option');

        self::assertSame(2, $options->length);
        self::assertFalse($options->item(0)->hasAttribute('selected'));
        self::assertTrue($options->item(1)->hasAttribute('selected'));
        self::assertSame('flag-icon-jp', $options->item(1)->getAttribute('data-flag-class'));
    }

    #[Test]
    public function buildFieldElementRegistersTomSelectScriptForFieldId(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with($this->stringContains("u.\$ui.tomSelect('#lang-flag', {"))
            ->willReturnSelf();

        $this->subject->inject($this->localeService, $unicornScript);
        $this->subject->setAttribute('id', 'lang-flag');

        $this->subject->buildFieldElement(h('select', []));
    }
}
