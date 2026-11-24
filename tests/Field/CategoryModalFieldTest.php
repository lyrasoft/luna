<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use LogicException;
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Field\CategoryModalField;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;

/**
 * Test-only subclass of CategoryModalField that replaces the database-backed item lookup with a preset array and
 * exposes getItemTitle(). Used only by CategoryModalFieldTest; remove together with that test.
 */
class CategoryModalFieldFixture extends CategoryModalField
{
    public ?array $presetItem = null;

    protected function getItem(): ?array
    {
        return $this->presetItem;
    }

    public function itemTitle(): ?string
    {
        return $this->getItemTitle();
    }
}

class CategoryModalFieldTest extends TestCase
{
    #[Test]
    public function constructorConfiguresCategoryRouteAndTable(): void
    {
        $field = new CategoryModalField('category');

        self::assertSame('category_list', $field->getRoute());
        self::assertSame(Category::class, $field->getTable());
    }

    #[Test]
    public function getCategoryTypeThrowsWhenNotSet(): void
    {
        $field = new CategoryModalField('category');

        $this->expectException(LogicException::class);
        $this->expectExceptionMessageIsOrContains('No category type for field: ' . CategoryModalField::class);

        $field->getCategoryType();
    }

    #[Test]
    public function getCategoryTypeThrowsWhenTypeIsEmptyString(): void
    {
        $field = new CategoryModalField('category');
        $field->categoryType('');

        $this->expectException(LogicException::class);

        $field->getCategoryType();
    }

    #[Test]
    public function categoryTypeSetterReturnsSelfAndStoresType(): void
    {
        $field = new CategoryModalField('category');

        $result = $field->categoryType('article');

        self::assertSame($field, $result);
        self::assertSame('article', $field->getCategoryType());
    }

    #[Test]
    public function defaultUrlAppendsCategoryTypeToRouteUri(): void
    {
        $field = new CategoryModalField('category');
        $field->route(new RouteUri('/admin/category/list', null, $this->createStub(Navigator::class)));
        $field->categoryType('article');

        $url = $field->getUrl();

        self::assertSame('article', $url->getVar('type'));
        self::assertSame('modal', $url->getVar('layout'));
    }

    #[Test]
    public function defaultUrlUsesCurrentCategoryTypeWhenChanged(): void
    {
        $field = new CategoryModalField('category');
        $field->route(new RouteUri('/admin/category/list', null, $this->createStub(Navigator::class)));
        $field->categoryType('article');
        $field->categoryType('product');

        self::assertSame('product', $field->getUrl()->getVar('type'));
    }

    #[Test]
    public function defaultUrlThrowsWhenNoRouteIsSet(): void
    {
        $field = new CategoryModalField('category');
        $field->route(null);
        $field->categoryType('article');

        $this->expectException(LogicException::class);
        $this->expectExceptionMessageIsOrContains('No URL for field');

        $field->getUrl();
    }

    #[Test]
    public function itemTitleReturnsTitleOfItem(): void
    {
        $field = new CategoryModalFieldFixture('category');
        $field->presetItem = ['id' => 3, 'title' => 'Books'];

        self::assertSame('Books', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenNoItem(): void
    {
        $field = new CategoryModalFieldFixture('category');
        $field->presetItem = null;

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenItemHasNoTitle(): void
    {
        $field = new CategoryModalFieldFixture('category');
        $field->presetItem = ['id' => 3];

        self::assertSame('', $field->itemTitle());
    }
}
