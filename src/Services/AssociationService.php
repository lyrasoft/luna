<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Entity\Association;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Router\Navigator;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;

/**
 * The AssociationService class.
 */
class AssociationService
{
    public function __construct(protected ORM $orm, protected Navigator $nav)
    {
    }

    /**
     * getMapper
     *
     * @return  EntityMapper<Association>
     *
     * @throws \ReflectionException
     */
    public function getMapper(): EntityMapper
    {
        return $this->orm->mapper(Association::class);
    }

    /**
     * @param  string|\BackedEnum    $type           The association type.
     * @param  string                $key            Current association key to save.
     * @param  string|int            $targetId       Current target ID to save.
     * @param  array<string, mixed>  $associations   The associations array, the array key is the association key,
     *                                               array value is target ID.
     *
     * @return  void
     * @throws \JsonException
     * @throws \ReflectionException
     */
    public function saveAssociations(
        string|\BackedEnum $type,
        string $key,
        string|int $targetId,
        array $associations
    ): void {
        if (in_array($targetId, $associations)) {
            throw new ValidateFailException('Association target cannot be self');
        }

        $mapper = $this->getMapper();
        $assoc = $mapper->findOne(['type' => $type, 'target_id' => $targetId]);

        // Delete existing assoc by hash
        if ($assoc) {
            $mapper->deleteWhere(['type' => $type, 'hash' => $assoc->hash]);
        }

        // Remove empty id
        $associations = array_filter($associations, static fn($v) => !empty($v));

        // Assoc must at least 2 items to make it linked
        if ($associations === []) {
            return;
        }

        // Rebuild assoc
        $associations[$key] = $targetId;

        $this->createAssociations($type, $associations);
    }

    /**
     * @param  string|\BackedEnum    $type          The association type.
     * @param  array<string, mixed>  $associations  The associations array, the array key is the association key,
     *                                              array value is target ID.
     *
     * @return  void
     * @throws \JsonException
     * @throws \ReflectionException
     */
    public function createAssociations(string|\BackedEnum $type, array $associations): void
    {
        // Assoc must at least 2 items to make it linked
        if (count($associations) <= 1) {
            return;
        }

        $mapper = $this->getMapper();

        $hash = static::getHash($type, $associations);

        // Remove existing assoc by new hash
        $mapper->deleteWhere(['type' => $type, 'hash' => $hash]);

        // Remove all items with different assoc
        $mapper->deleteWhere(['type' => $type, 'target_id' => array_values($associations)]);

        // Let's build new assoc
        foreach ($associations as $key => $targetId) {
            if (!$targetId) {
                continue;
            }

            $mapper->createOne(
                [
                    'type' => $type,
                    'target_id' => $targetId,
                    'key' => $key,
                    'hash' => $hash,
                ]
            );
        }
    }

    public function addAssociation(string|\BackedEnum $type, string $key, string|int $targetId): void
    {
        $associations = $this->getRelativeItemsByTargetId($type, $targetId);

        $assocIds = [];

        foreach ($associations as $association) {
            $assocIds[$association->key] = $association->targetId;
        }

        // Assoc must at least 2 items to make it linked
        if ($assocIds === []) {
            return;
        }

        $this->saveAssociations($type, $key, $targetId, $assocIds);
    }

    public function deleteWhere(mixed $conditions): void
    {
        $this->getMapper()->deleteWhere($conditions);
    }

    /**
     * getHash
     *
     * @param  string  $type
     * @param  array   $associations
     *
     * @return  string
     */
    public static function getHash(string|\BackedEnum $type, array $associations): string
    {
        ksort($associations);

        $json = json_encode($associations);

        return md5($type . $json);
    }

    /**
     * getAssocByHash
     *
     * @param  string           $type
     * @param  string           $hash
     * @param  string|int|null  $id
     *
     * @return iterable<Association>
     * @throws \ReflectionException
     */
    public function getRelativeItemsByHash(string|\BackedEnum $type, string $hash, string|int|null $id = null): iterable
    {
        $conditions = ['type' => $type, 'hash' => $hash];

        if ($id) {
            $conditions[] = ['target_id', '!=', $id];
        }

        return $this->getMapper()->findList($conditions);
    }

    /**
     * getAssocsByItemId
     *
     * @param  string      $type
     * @param  string|int  $id
     *
     * @return iterable<Association>
     * @throws \ReflectionException
     */
    public function getRelativeItemsByTargetId(string|\BackedEnum $type, string|int $id): iterable
    {
        $assoc = $this->getMapper()->findOne(['type' => $type, 'target_id' => $id]);

        if (!$assoc) {
            return;
        }

        foreach ($this->getRelativeItemsByHash($type, $assoc->hash, $id) as $key => $value) {
            yield $key => $value;
        }
    }

    public function getTargetIdMapsByOneTargetId(string|\BackedEnum $type, string|int $id): array
    {
        $associations = $this->getRelativeItemsByTargetId($type, $id);

        $assocIds = [];

        foreach ($associations as $association) {
            $assocIds[$association->key] = $association->targetId;
        }

        return $assocIds;
    }

    /**
     * getAssocByIdAndLanguage
     *
     * @param  string      $type
     * @param  string|int  $id
     * @param  string      $key
     *
     * @return Association|null
     * @throws \ReflectionException
     */
    public function getRelativeItemByIdAndKey(string|\BackedEnum $type, string|int $id, string $key): ?Association
    {
        $assoc = $this->getMapper()->findOne(['type' => $type, 'target_id' => $id]);

        if (!$assoc) {
            return null;
        }

        return $this->getMapper()->findOne(
            [
                'type' => $type,
                'hash' => $assoc->hash,
                'key' => $key,
                ['target_id', '!=', $id],
            ]
        );
    }
}
