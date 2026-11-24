<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\Tag;
use Lyrasoft\Luna\Entity\TagMap;
use Lyrasoft\Luna\Services\TagService;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs TagService tag creation and tag-map logic against the real MySQL test DB.
 */
class TagServiceTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    #[Before]
    protected function clearTagTables(): void
    {
        static::truncateTables(
            self::$orm->getEntityMetadata(Tag::class)->getTableName(),
            self::$orm->getEntityMetadata(TagMap::class)->getTableName(),
        );
    }

    private function createService(): TagService
    {
        return new TagService(self::$orm);
    }

    #[Test]
    public function createTagsIfNewKeepsExistingIdsAndCreatesNewTags(): void
    {
        $service = $this->createService();

        $result = $service->createTagsIfNew(['5', 'new#PHP', 'new#Go']);

        self::assertSame('5', $result[0]);
        self::assertSame('PHP', self::$orm->findOne(Tag::class, $result[1])->title);
        self::assertSame('Go', self::$orm->findOne(Tag::class, $result[2])->title);
        self::assertSame(BasicState::PUBLISHED, self::$orm->findOne(Tag::class, $result[1])->state);
    }

    #[Test]
    public function createTagsIfNewAppliesConfigureCallback(): void
    {
        $service = $this->createService();

        $result = $service->createTagsIfNew(
            ['new#Rust'],
            static function (Tag $tag): Tag {
                $tag->alias = 'rust-lang';

                return $tag;
            }
        );

        self::assertSame('rust-lang', self::$orm->findOne(Tag::class, $result[0])->alias);
    }

    #[Test]
    public function createTagsIfNewUsesCustomPrefix(): void
    {
        $service = $this->createService();
        $service->setNewTagPrefix('add#');

        $result = $service->createTagsIfNew(['new#Ignored', 'add#Custom']);

        self::assertSame('new#Ignored', $result[0]);
        self::assertNotSame('add#Custom', $result[1]);
        self::assertSame('Custom', self::$orm->findOne(Tag::class, $result[1])?->title);
        self::assertSame('add#', $service->getNewTagPrefix());
    }

    #[Test]
    public function flushTagMapsReplacesMapsOfTarget(): void
    {
        $service = $this->createService();
        $mapper = self::$orm->mapper(TagMap::class);

        iterator_to_array($service->flushTagMaps('article', 10, [1, 2]));
        iterator_to_array($service->flushTagMaps('article', 10, [3]));

        self::assertNull($mapper->findOne(['type' => 'article', 'target_id' => 10, 'tag_id' => 1]));
        self::assertNotNull($mapper->findOne(['type' => 'article', 'target_id' => 10, 'tag_id' => 3]));
    }

    #[Test]
    public function clearMapsOfTargetAndTagRemoveOnlyMatchingMaps(): void
    {
        $service = $this->createService();
        $mapper = self::$orm->mapper(TagMap::class);
        iterator_to_array($service->flushTagMaps('article', 10, [1, 2]));
        iterator_to_array($service->flushTagMaps('article', 11, [1]));

        $service->clearMapsOfTarget('article', 10);

        self::assertNull($mapper->findOne(['type' => 'article', 'target_id' => 10, 'tag_id' => 2]));
        self::assertNotNull($mapper->findOne(['type' => 'article', 'target_id' => 11, 'tag_id' => 1]));

        $service->clearMapsOfTag('article', 1);

        self::assertNull($mapper->findOne(['type' => 'article', 'target_id' => 11, 'tag_id' => 1]));
    }

    #[Test]
    public function flushTagMapsFromInputCreatesNewTagsBeforeMapping(): void
    {
        $service = $this->createService();

        iterator_to_array($service->flushTagMapsFromInput('article', 20, ['new#Fresh']));

        $map = self::$orm->mapper(TagMap::class)->findOne(['type' => 'article', 'target_id' => 20]);

        self::assertSame('Fresh', self::$orm->findOne(Tag::class, $map->tagId)->title);
    }
}
