<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Entity\Association;
use Psr\Http\Message\ResponseInterface;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Data\Collection;
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
     * saveAssoc
     *
     * @param  string      $type
     * @param  string      $key
     * @param  string|int  $targetId
     * @param  array       $associations
     *
     * @return  void
     * @throws \ReflectionException
     */
    public function saveAssociations(string $type, string $key, string|int $targetId, array $associations): void
    {
        if (in_array($targetId, $associations)) {
            throw new ValidateFailException('Association target cannot be self');
        }

        $mapper = $this->getMapper();
        $assoc = $mapper->findOne(['type' => $type, 'target_id' => $targetId]);

        // Delete existing assoc by hash
        if ($assoc) {
            $mapper->deleteWhere(['type' => $type, 'hash' => $assoc->getHash()]);
        }

        // Remove empty id
        $associations = array_filter($associations, static fn($v) => !empty($v));

        if ($associations === []) {
            return;
        }

        // Rebuild assoc
        $associations[$key] = $targetId;

        $this->createAssociations($type, $associations);
    }

    /**
     * createAssoc
     *
     * @param  string  $type
     * @param  array   $associations
     *
     * @return  void
     */
    public function createAssociations(string $type, array $associations): void
    {
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

    public function deleteWhere(mixed $conditions): array
    {
        return $this->getMapper()->deleteWhere($conditions);
    }

    /**
     * getHash
     *
     * @param  string  $type
     * @param  array   $associations
     *
     * @return  string
     */
    public static function getHash(string $type, array $associations): string
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
    public function getRelativeItemsByHash(string $type, string $hash, string|int|null $id = null): iterable
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
    public function getRelativeItemsByTargetId(string $type, string|int $id): iterable
    {
        $assoc = $this->getMapper()->findOne(['type' => $type, 'target_id' => $id]);

        if (!$assoc) {
            return;
        }

        foreach ($this->getRelativeItemsByHash($type, $assoc->getHash(), $id) as $key => $value) {
            yield $key => $value;
        }
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
    public function getRelativeItemByIdAndKey(string $type, string|int $id, string $key): ?Association
    {
        $assoc = $this->getMapper()->findOne(['type' => $type, 'target_id' => $id]);

        if (!$assoc) {
            return null;
        }

        return $this->getMapper()->findOne(
            [
                'type' => $type,
                'hash' => $assoc->getHash(),
                'key' => $key,
                ['target_id', '!=', $id],
            ]
        );
    }
}
