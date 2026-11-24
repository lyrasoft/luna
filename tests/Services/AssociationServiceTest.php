<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Association;
use Lyrasoft\Luna\Entity\Tag;
use Lyrasoft\Luna\Services\AssociationService;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs AssociationService link and unlink logic against the real MySQL test DB.
 */
#[AllowMockObjectsWithoutExpectations]
class AssociationServiceTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::resetAndMigrate();
    }

    #[Before]
    protected function clearAssociationTable(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Association::class)->getTableName());
    }

    private function createService(): AssociationService
    {
        return new AssociationService(self::$orm, $this->createStub(Navigator::class));
    }

    #[Test]
    public function saveAssociationsRejectsSelfTarget(): void
    {
        $service = $this->createService();

        $this->expectException(ValidateFailException::class);
        $this->expectExceptionMessageIsOrContains('Association target cannot be self');

        $service->saveAssociations('article', 'en', 1, ['ja' => 1]);
    }

    #[Test]
    public function saveAssociationsLinksAllItemsIntoOneHash(): void
    {
        $service = $this->createService();

        $service->saveAssociations('article', 'en', 1, ['ja' => 2, 'zh' => 3]);

        self::assertEqualsCanonicalizing(
            ['ja' => 2, 'zh' => 3],
            $service->getTargetIdMapsByOneTargetId('article', 1)
        );
        self::assertSame(
            $service->getAssociationByTargetId('article', 2)->hash,
            $service->getAssociationByTargetId('article', 3)->hash
        );
    }

    #[Test]
    public function saveAssociationsWithOnlyEmptyItemsUnlinksExisting(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2]);

        $service->saveAssociations('article', 'en', 1, ['ja' => '']);

        self::assertNull($service->getAssociationByTargetId('article', 1));
        self::assertNull($service->getAssociationByTargetId('article', 2));
    }

    #[Test]
    public function createAssociationsIgnoresSingleItem(): void
    {
        $service = $this->createService();

        $service->createAssociations('article', ['en' => 5]);

        self::assertNull($service->getAssociationByTargetId('article', 5));
    }

    #[Test]
    public function addAssociationResavesGroupOfExistingMember(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2]);

        $service->addAssociation('article', 'zh', 2);

        self::assertSame(
            $service->getAssociationByTargetId('article', 1)->hash,
            $service->getAssociationByTargetId('article', 2)->hash
        );
        self::assertSame('zh', $service->getAssociationByTargetId('article', 2)->key);
    }

    #[Test]
    public function addAssociationDoesNothingWithoutGroup(): void
    {
        $service = $this->createService();

        $service->addAssociation('article', 'en', 9);

        self::assertNull($service->getAssociationByTargetId('article', 9));
    }

    #[Test]
    public function deleteAllAssociationsByTargetIdRemovesWholeGroup(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2, 'zh' => 3]);

        $service->deleteAllAssociationsByTargetId('article', 2);

        self::assertNull($service->getAssociationByTargetId('article', 1));
        self::assertNull($service->getAssociationByTargetId('article', 3));
    }

    #[Test]
    public function getRelativeItemByIdAndKeyFindsSiblingByKey(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2]);

        $item = $service->getRelativeItemByIdAndKey('article', 1, 'ja');

        self::assertSame(2, $item->targetId);
        self::assertNull($service->getRelativeItemByIdAndKey('article', 1, 'fr'));
    }

    #[Test]
    public function getHashIgnoresKeyOrderAndDependsOnType(): void
    {
        $a = AssociationService::getHash('article', ['en' => 1, 'ja' => 2]);
        $b = AssociationService::getHash('article', ['ja' => 2, 'en' => 1]);

        self::assertSame($a, $b);
        self::assertNotSame($a, AssociationService::getHash('page', ['en' => 1, 'ja' => 2]));
    }

    #[Test]
    public function toTypeStringConvertsEntityClassAndObjects(): void
    {
        self::assertSame('tag', AssociationService::toTypeString(Tag::class));
        self::assertSame('custom', AssociationService::toTypeString('custom'));
        self::assertSame('stdClass', AssociationService::toTypeString(new \stdClass()));
    }

    private function createArticle(string $title): int
    {
        return self::$orm->createOne(
            Article::class,
            [
                'title' => $title,
                'alias' => strtolower($title),
                'type' => 'article',
                'state' => 1,
                'language' => '*',
            ]
        )->id;
    }

    #[Test]
    public function getRelatedTargetItemReturnsLinkedEntityByKey(): void
    {
        $service = $this->createService();
        $en = $this->createArticle('EN');
        $ja = $this->createArticle('JA');
        $service->saveAssociations(Article::class, 'en', $en, ['ja' => $ja]);

        $item = $service->getRelatedTargetItem(Article::class, $en, 'ja');

        self::assertInstanceOf(Article::class, $item);
        self::assertSame($ja, $item->id);
        self::assertNull($service->getRelatedTargetItem(Article::class, $en, 'fr'));
    }

    #[Test]
    public function getRelatedTargetItemsReturnsSiblingsExcludingSelf(): void
    {
        $service = $this->createService();
        $en = $this->createArticle('EN');
        $ja = $this->createArticle('JA');
        $zh = $this->createArticle('ZH');
        $service->saveAssociations(Article::class, 'en', $en, ['ja' => $ja, 'zh' => $zh]);

        $items = $service->getRelatedTargetItems(Article::class, $en);

        self::assertCount(2, $items);
        self::assertEqualsCanonicalizing([$ja, $zh], $items->column('id')->dump());
    }

    #[Test]
    public function getRelatedTargetItemsReturnsEmptyWhenUnlinked(): void
    {
        $service = $this->createService();
        $en = $this->createArticle('EN');

        self::assertCount(0, $service->getRelatedTargetItems(Article::class, $en));
        self::assertNull($service->getRelatedTargetItem(Article::class, $en, 'ja'));
    }

    #[Test]
    public function getAllTargetIdMapsByOneTargetIdIncludesSelf(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2, 'zh' => 3]);

        self::assertEqualsCanonicalizing(
            ['en' => 1, 'ja' => 2, 'zh' => 3],
            $service->getAllTargetIdMapsByOneTargetId('article', 2)
        );
        self::assertSame([], $service->getAllTargetIdMapsByOneTargetId('article', 99));
    }

    #[Test]
    public function getAssociationItemsByTargetIdYieldsWholeGroup(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2, 'zh' => 3]);

        $items = iterator_to_array($service->getAssociationItemsByTargetId('article', 1));

        self::assertCount(3, $items);
        self::assertSame([], iterator_to_array($service->getAssociationItemsByTargetId('article', 99)));
    }

    #[Test]
    public function getRelativeItemsByTargetIdExcludesSelf(): void
    {
        $service = $this->createService();
        $service->saveAssociations('article', 'en', 1, ['ja' => 2, 'zh' => 3]);

        $items = iterator_to_array($service->getRelativeItemsByTargetId('article', 1));

        self::assertEqualsCanonicalizing([2, 3], array_map(static fn($i) => $i->targetId, $items));
        self::assertSame([], iterator_to_array($service->getRelativeItemsByTargetId('article', 99)));
    }

    #[Test]
    public function smartJoinLinksSiblingRowByKey(): void
    {
        $service = $this->createService();
        $en = $this->createArticle('EN');
        $ja = $this->createArticle('JA');
        $service->saveAssociations(Article::class, 'en', $en, ['ja' => $ja]);

        $query = AssociationService::smartJoin(
            self::$orm->from(Article::class, 'article'),
            'en',
            'ja_article',
            'ja',
        )->where('article.id', $en)
            ->select('ja_article.id');

        $row = $query->get()->dump();

        self::assertSame($ja, (int) $row['id']);
    }
}
