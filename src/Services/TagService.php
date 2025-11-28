<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Entity\Tag;
use Lyrasoft\Luna\Entity\TagMap;
use ReflectionException;
use Windwalker\Database\Driver\StatementInterface;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\ORM\SelectorQuery;
use Windwalker\Utilities\Str;

/**
 * The TagService class.
 */
class TagService
{
    protected string $newTagPrefix = 'new#';

    public function __construct(protected ORM $orm)
    {
    }

    public function createTagsIfNew(iterable $tagIds, ?callable $configure = null): array
    {
        $r = [];

        /** @var EntityMapper<Tag> $mapper */
        $mapper = $this->orm->mapper(Tag::class);

        foreach ($tagIds as $i => $tagId) {
            if (str_starts_with((string) $tagId, $this->getNewTagPrefix())) {
                $tagTitle = Str::removeLeft((string) $tagId, 'new#');

                $tag = new Tag();
                $tag->title = $tagTitle;
                $tag->state = 1;

                if ($configure) {
                    $tag = $configure($tag) ?? $tag;
                }

                $tag = $mapper->createOne($tag);

                $r[$i] = (string) $tag->id;
            } else {
                $r[$i] = $tagId;
            }
        }

        return $r;
    }

    /**
     * @param  string|\BackedEnum  $type
     * @param  mixed               $targetId
     * @param  iterable            $tagIds
     * @param  callable|null       $configureNewTag
     *
     * @return  iterable<TagMap>
     *
     * @throws ReflectionException
     */
    public function flushTagMapsFromInput(
        string|\BackedEnum $type,
        mixed $targetId,
        iterable $tagIds,
        ?callable $configureNewTag = null
    ): iterable {
        $tagIds = $this->createTagsIfNew($tagIds, $configureNewTag);

        return $this->flushTagMaps($type, $targetId, $tagIds);
    }

    /**
     * @param  string|\BackedEnum  $type
     * @param  mixed               $targetId
     * @param  iterable            $tagIds
     *
     * @return  iterable<TagMap>
     *
     * @throws ReflectionException
     */
    public function flushTagMaps(string|\BackedEnum $type, mixed $targetId, iterable $tagIds): iterable
    {
        /** @var EntityMapper<TagMap> $tagMapMapper */
        $tagMapMapper = $this->orm->mapper(TagMap::class);
        $maps = [];

        foreach ($tagIds as $tagId) {
            $map = $tagMapMapper->createEntity();
            $map->type = $type;
            $map->tagId = (int) $tagId;
            $map->targetId = $targetId;

            $maps[] = $map;
        }

        return $tagMapMapper->flush($maps, ['target_id' => $targetId, 'type' => $type]);
    }

    /**
     * @param  string  $type
     * @param  mixed   $targetId
     *
     * @return void
     *
     * @throws ReflectionException
     */
    public function clearMapsOfTarget(string $type, mixed $targetId): void
    {
        /** @var EntityMapper<TagMap> $tagMapMapper */
        $tagMapMapper = $this->orm->mapper(TagMap::class);

        $tagMapMapper->deleteWhere(
            [
                'type' => $type,
                'target_id' => $targetId,
            ]
        );
    }

    public function clearMapsOfTag(string $type, mixed $tagId): void
    {
        /** @var EntityMapper<TagMap> $tagMapMapper */
        $tagMapMapper = $this->orm->mapper(TagMap::class);

        $tagMapMapper->deleteWhere(
            [
                'type' => $type,
                'tag_id' => $tagId,
            ]
        );
    }

    public function getTagListQuery(string|\BackedEnum $type, mixed $targetIds = null): SelectorQuery
    {
        $query = $this->orm->from(Tag::class)
            ->leftJoin(TagMap::class)
            ->where('tag_map.type', $type);

        if (is_iterable($targetIds)) {
            $targetIds = iterator_to_array($targetIds);
        }

        if ($targetIds !== null && $targetIds !== []) {
            $query->where('tag_map.target_id', $targetIds);
        }

        return $query->groupByJoins()
            ->setDefaultItemClass(Tag::class);
    }

    /**
     * @return string
     */
    public function getNewTagPrefix(): string
    {
        return $this->newTagPrefix;
    }

    /**
     * @param  string  $newTagPrefix
     *
     * @return  static  Return self to support chaining.
     */
    public function setNewTagPrefix(string $newTagPrefix): static
    {
        $this->newTagPrefix = $newTagPrefix;

        return $this;
    }
}
