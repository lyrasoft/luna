<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

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
     * @param  object[]|\Traversable  $items
     * @param  string|\Closure        $keyName
     * @param  string|\Closure        $parentIdName
     * @param  string                 $nodeClass
     *
     * @return NodeInterface
     */
    public static function create(
        iterable $items,
        string|\Closure $keyName = 'id',
        string|\Closure $parentIdName = 'parent_id',
        string $nodeClass = Node::class
    ): NodeInterface {
        /** @var Node[] $tree */
        $tree = [];

        $root = new $nodeClass();

        if (!count($items)) {
            return $root;
        }

        foreach ($items as $data) {
            $pk = static::getValue($data, $keyName);
            $parentId = static::getValue($data, $parentIdName);

            if ($pk === null || !$parentId) {
                continue;
            }

            $tree[$pk] = new $nodeClass($data);
        }

        foreach ($tree as $node) {
            $data = $node->getValue();

            $parentId = static::getValue($data, $parentIdName);

            if (!$parentId) {
                continue;
            }

            if (isset($tree[$parentId])) {
                $tree[$parentId]->addChild($node);
            } else {
                $root->addChild($node);
            }
        }

        return $root;
    }

    protected static function getValue(array|object $data, string|\Closure $name): mixed
    {
        if (is_string($name)) {
            return Arr::get($data, $name);
        }

        return $name($data);
    }
}
