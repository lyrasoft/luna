<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Field\ArticleModalField;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

/**
 * Test-only subclass of ArticleModalField. It replaces the database-backed getItem() with an in-memory item and
 * exposes the protected getItemTitle() so ArticleModalFieldTest can assert its fallback logic without a DB.
 * Used only by ArticleModalFieldTest; remove together with that test.
 */
class ArticleModalFieldFixture extends ArticleModalField
{
    public ?array $fakeItem = null;

    protected function getItem(): ?array
    {
        return $this->fakeItem;
    }

    public function itemTitle(): ?string
    {
        return $this->getItemTitle();
    }
}

class ArticleModalFieldTest extends TestCase
{
    #[Test]
    public function configureSetsArticleListRoute(): void
    {
        $field = new ArticleModalField('article');

        self::assertSame('article_list', $field->getRoute());
    }

    #[Test]
    public function configureSetsArticleEntityAsTable(): void
    {
        $field = new ArticleModalField('article');

        self::assertSame(Article::class, $field->getTable());
    }

    #[Test]
    public function itemTitleReturnsTitleOfSelectedItem(): void
    {
        $field = new ArticleModalFieldFixture('article');
        $field->fakeItem = ['id' => 1, 'title' => 'Hello World'];

        self::assertSame('Hello World', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenNoItemSelected(): void
    {
        $field = new ArticleModalFieldFixture('article');
        $field->fakeItem = null;

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleFallsBackToEmptyStringWhenTitleKeyMissing(): void
    {
        $field = new ArticleModalFieldFixture('article');
        $field->fakeItem = ['id' => 1];

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleReturnsNullTitleAsEmptyString(): void
    {
        $field = new ArticleModalFieldFixture('article');
        $field->fakeItem = ['id' => 1, 'title' => null];

        self::assertSame('', $field->itemTitle());
    }

    #[Test]
    public function itemTitleIgnoresCustomTitleField(): void
    {
        $field = new ArticleModalFieldFixture('article');
        $field->titleField('name');
        $field->fakeItem = ['id' => 1, 'name' => 'Custom Name', 'title' => 'Real Title'];

        // getItemTitle() is hard-coded to the `title` key, unlike the parent ModalField.
        self::assertSame('Real Title', $field->itemTitle());
    }
}
