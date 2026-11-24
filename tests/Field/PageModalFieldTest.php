<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Field\PageModalField;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

/**
 * Test-only subclass of PageModalField that exposes getItemTitle() and replaces the database-backed
 * getItem() with an in-memory item. Used only by PageModalFieldTest; can be removed together with that test.
 */
class PageModalFieldTestFixture extends PageModalField
{
    public ?array $fakeItem = null;

    public function itemTitle(): ?string
    {
        return $this->getItemTitle();
    }

    protected function getItem(): ?array
    {
        return $this->fakeItem;
    }
}

class PageModalFieldTest extends TestCase
{
    #[Test]
    public function constructorConfiguresPageListRouteAndPageTable(): void
    {
        $field = new PageModalField('page');

        self::assertSame('page_list', $field->getRoute());
        self::assertSame(Page::class, $field->getTable());
    }

    #[Test]
    public function itemTitleReturnsTitleOfCurrentItem(): void
    {
        $field = new PageModalFieldTestFixture('page');
        $field->fakeItem = ['id' => 5, 'title' => 'About Us'];

        self::assertSame('About Us', $field->itemTitle());
    }

    #[Test]
    public function itemTitleIsEmptyStringWhenNoItemFound(): void
    {
        $field = new PageModalFieldTestFixture('page');
        $field->fakeItem = null;

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleIsEmptyStringWhenItemHasNoTitle(): void
    {
        $field = new PageModalFieldTestFixture('page');
        $field->fakeItem = ['id' => 5];

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleAlwaysReadsTitleKeyEvenWhenTitleFieldIsChanged(): void
    {
        $field = new PageModalFieldTestFixture('page');
        $field->titleField('name');
        $field->fakeItem = ['name' => 'Ignored', 'title' => 'Home'];

        self::assertSame('Home', $field->itemTitle());
    }
}
