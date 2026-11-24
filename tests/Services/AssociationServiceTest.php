<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

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
        TestDatabaseFixtures::migrate();
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
}
