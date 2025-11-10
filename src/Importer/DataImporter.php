<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Importer;

use Windwalker\ORM\ORM;

class DataImporter
{
    protected ?\Closure $defaultDataHandler = null;

    protected \Closure $invoker {
        get => $this->invoker ?? static fn(\Closure $callback) => $callback();
    }

    public ?\Closure $onItemSaved = null {
        get => $this->onItemSaved ?? static fn(object $item) => null;
    }

    public function __construct(public ORM $orm)
    {
    }

    public function import(\Closure|iterable|string $items, ?\Closure $dataHandler = null): void
    {
        if (is_string($items)) {
            $items = include $items;
        }

        if ($items instanceof \Closure) {
            $items = ($this->invoker)($items);
        }

        foreach ($items as $item) {
            $this->importItem($item, $dataHandler);
        }
    }

    public function importItem(object $item, ?\Closure $dataHandler = null): object
    {
        if ($item instanceof \Closure) {
            $item = ($this->invoker)($item);
        }

        if ($this->defaultDataHandler) {
            $item = ($this->defaultDataHandler)($item, $this->orm) ?? $item;
        }

        if ($dataHandler) {
            $item = $dataHandler($item, $this->orm) ?? $item;
        }

        $result = $this->save($item);

        $result = ($this->onItemSaved)($result) ?? $result;

        return $result;
    }

    protected function save(object $item): object
    {
        return $this->orm->saveOne($item);
    }

    public function setDefaultDataHandler(?\Closure $defaultDataHandler): DataImporter
    {
        $this->defaultDataHandler = $defaultDataHandler;

        return $this;
    }

    public function setInvoker(?\Closure $invoker): DataImporter
    {
        $this->invoker = $invoker;

        return $this;
    }

    public function onItemSaved(?\Closure $onItemSaved): DataImporter
    {
        $this->onItemSaved = $onItemSaved;

        return $this;
    }
}
