<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Tree\NodeInterface;
use Windwalker\ORM\Nested\NestedEntityInterface;
use Windwalker\ORM\Nested\Position;
use Windwalker\ORM\NestedSetMapper;

/**
 * Include Example:
 *
 *  ```php
 *  return [
 *     'type' => [
 *         Article::create(title: '...', alias: '...'),
 *         function () {
 *            $item = new Article();
 *            $item->title = '...';
 *            $item->alias = '...';
 *            return $item;
 *         },
 *     ]
 *  ```
 */
class NestedDataImporter extends DataImporter
{
    protected ?\Closure $childProcessor = null;

    public function importItem(object $item, ?\Closure $dataHandler = null, ?object $parent = null): object
    {
        $origin = $item;

        if ($item instanceof NodeInterface) {
            $item = $item->getValue();
        }

        if ($parent instanceof NodeInterface) {
            $parent = $parent->getValue();
        }

        /** @var NestedSetMapper $mapper */
        $mapper = $this->orm->mapper($item::class);

        $item = $this->prepareChildImport($item, $parent ?? $mapper->getRoot());

        $saved = parent::importItem($item, $dataHandler);

        if ($origin instanceof NodeInterface) {
            foreach ($origin->getChildren() as $child) {
                $this->importItem($child, $dataHandler, $saved);
            }
        }

        return $saved;
    }

    protected function prepareChildImport(object $child, object $parent): object
    {
        $processor = $this->childProcessor ?? $this->getDefaultChildProcessor();

        return $processor($child, $parent) ?? $child;
    }

    public function setChildProcessor(?\Closure $childProcessor): NestedDataImporter
    {
        $this->childProcessor = $childProcessor;

        return $this;
    }

    protected function getDefaultChildProcessor(): \Closure
    {
        return function (NestedEntityInterface $child, NestedEntityInterface $parent): object {
            /** @var NestedSetMapper $mapper */
            $mapper = $this->orm->mapper($child::class);
            $mapper->setPosition($child, $parent->getPrimaryKeyValue(), Position::LAST_CHILD);

            return $child;
        };
    }
}
