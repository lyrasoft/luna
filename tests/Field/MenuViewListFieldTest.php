<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Field\MenuViewListField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Services\MenuService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Form;

/**
 * Covers MenuViewListField::prepareOptions(), which turns every registered menu view into an
 * `<option>` grouped under its translated group label.
 *
 * Views are supplied by a stubbed MenuService and translated by a stubbed LangService that echoes
 * the translation key, so assertions can check the exact keys used.
 */
class MenuViewListFieldTest extends TestCase
{
    /**
     * @param  array  $views  Grouped views in the shape returned by MenuService::getViews(true).
     */
    private function createField(array $views): MenuViewListField
    {
        $menuService = $this->createStub(MenuService::class);
        $menuService->method('getViews')->willReturn($views);

        return $this->createFieldWith($menuService);
    }

    private function createFieldWith(MenuService $menuService): MenuViewListField
    {
        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturnCallback(
            static fn(string $id): string => 'T:' . $id
        );

        $field = new MenuViewListField('view');

        $menuServiceProperty = new \ReflectionProperty($field, 'menuService');
        $menuServiceProperty->setValue($field, $menuService);

        $langProperty = new \ReflectionProperty($field, 'lang');
        $langProperty->setValue($field, $lang);

        return $field;
    }

    #[Test]
    public function optionsAreGroupedByTranslatedGroupLabel(): void
    {
        $field = $this->createField([
            'core' => ['core-page' => CoreMenuViewFixture::class],
            'blog' => ['blog-post' => BlogMenuViewFixture::class],
        ]);

        $options = $field->getOptions();

        self::assertSame(
            ['T:luna.menu.group.core', 'T:luna.menu.group.blog'],
            array_keys($options)
        );
        self::assertCount(1, $options['T:luna.menu.group.core']);
        self::assertCount(1, $options['T:luna.menu.group.blog']);
    }

    #[Test]
    public function optionTextUsesViewTitleAndValueUsesViewName(): void
    {
        $field = $this->createField([
            'blog' => ['blog-post' => BlogMenuViewFixture::class],
        ]);

        $option = $field->getOptions()['T:luna.menu.group.blog'][0];

        // Title is resolved through AbstractMenuView::getTitle() with the field's language service.
        self::assertSame('T:luna.menu.view.blog-post.title', $option->textContent);
        self::assertSame('blog-post', $option['value']);
    }

    #[Test]
    public function viewsSharingAGroupAreAppendedToThatGroup(): void
    {
        $field = $this->createField([
            'core' => [
                'core-page' => CoreMenuViewFixture::class,
                'second-core' => SecondCoreMenuViewFixture::class,
            ],
        ]);

        $options = $field->getOptions();

        self::assertCount(1, $options);

        $values = array_map(
            static fn($option) => $option['value'],
            $options['T:luna.menu.group.core']
        );

        self::assertSame(['core-page', 'second-core'], $values);
    }

    #[Test]
    public function fieldRequestsGroupedViewsFromMenuService(): void
    {
        $menuService = $this->createMock(MenuService::class);
        $menuService->expects($this->once())
            ->method('getViews')
            ->with(true)
            ->willReturn([]);

        $field = $this->createFieldWith($menuService);

        self::assertSame([], $field->getOptions());
    }

    #[Test]
    public function noRegisteredViewsProducesNoOptions(): void
    {
        $field = $this->createField([]);

        self::assertSame([], $field->getOptions());
    }

    #[Test]
    public function manuallyAddedOptionsAreKeptAlongsideViewOptions(): void
    {
        $field = $this->createField([
            'blog' => ['blog-post' => BlogMenuViewFixture::class],
        ]);

        $field->option('Placeholder', '');

        $options = $field->getOptions();

        self::assertArrayHasKey('T:luna.menu.group.blog', $options);
        self::assertSame('', $options[0]['value']);
        self::assertSame('Placeholder', $options[0]->textContent);
    }
}

/**
 * Menu view fixture in the `core` group. Used by MenuViewListFieldTest to check group bucketing.
 * Can be removed once MenuViewListFieldTest no longer needs a core-group view.
 */
class CoreMenuViewFixture extends AbstractMenuView
{
    public static function getName(): string
    {
        return 'core-page';
    }

    public static function getGroup(): string
    {
        return 'core';
    }

    protected function defineVariablesForm(Form $form): void {}

    protected function defineParamsForm(Form $form): void {}

    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        throw new \LogicException('Not used in these tests.');
    }

    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}

/**
 * Second menu view fixture in the `core` group, used to check that views share one group bucket.
 * Can be removed once MenuViewListFieldTest no longer checks multi-view groups.
 */
class SecondCoreMenuViewFixture extends AbstractMenuView
{
    public static function getName(): string
    {
        return 'second-core';
    }

    public static function getGroup(): string
    {
        return 'core';
    }

    protected function defineVariablesForm(Form $form): void {}

    protected function defineParamsForm(Form $form): void {}

    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        throw new \LogicException('Not used in these tests.');
    }

    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}

/**
 * Menu view fixture in the `blog` group, used to check group labels differ from `core` and that
 * titles and values are read from the view. Can be removed with MenuViewListFieldTest.
 */
class BlogMenuViewFixture extends AbstractMenuView
{
    public static function getName(): string
    {
        return 'blog-post';
    }

    public static function getGroup(): string
    {
        return 'blog';
    }

    protected function defineVariablesForm(Form $form): void {}

    protected function defineParamsForm(Form $form): void {}

    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        throw new \LogicException('Not used in these tests.');
    }

    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}
