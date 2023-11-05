<?php

namespace Lyrasoft\Luna\Tree;

use Closure;
use Traversable;
use Windwalker\Utilities\Arr;

/**
 * The TreeBuilder class.
 *
 * @since  1.0
 */
class TreeBuilder
{
    /**
     * fromObjects
     *
     * @param  object[]|Traversable  $items
     * @param  string|Closure        $keyName
     * @param  string|Closure        $parentIdName
     * @param  string                $nodeClass
     *
     * @return NodeInterface
     */
    public static function create(
        iterable $items,
        string|Closure $keyName = 'id',
        string|Closure $parentIdName = 'parent_id',
        string $nodeClass = Node::class,
        object|int|string $root = 1,
    ): NodeInterface {
        /** @var Node[] $tree */
        $tree = [];

        if (!is_object($root)) {
            $rootId = $root;
            $root = new $nodeClass();
        } elseif ($root instanceof NodeInterface) {
            $rootId = static::getValue($root->getValue(), $keyName);
        } else {
            $rootId = static::getValue($root, $keyName);
            $root = new $nodeClass($root);
        }

        $count = 0;

        if ($items === []) {
            return $root;
        }

        foreach ($items as $data) {
            $pk = static::getValue($data, $keyName);
            $parentId = static::getValue($data, $parentIdName);

            if ($pk === null || !$parentId) {
                continue;
            }

            $tree[$pk] = new $nodeClass($data);

            $count++;
        }

        if ($count === 0) {
            return $root;
        }

        foreach ($tree as $node) {
            $data = $node->getValue();

            $parentId = static::getValue($data, $parentIdName);

            if (!$parentId) {
                continue;
            }

            if (isset($tree[$parentId])) {
                $tree[$parentId]->addChild($node);
            } elseif ((string) $rootId === (string) $parentId) {
                $root->addChild($node);
            }
        }

        return $root;
    }

    protected static function getValue(array|object $data, string|Closure $name): mixed
    {
        if (is_string($name)) {
            return Arr::get($data, $name);
        }

        return $name($data);
    }
}
