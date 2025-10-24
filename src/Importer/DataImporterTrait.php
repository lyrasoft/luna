<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Importer;

use Windwalker\ORM\ORM;

trait DataImporterTrait
{
    public function createDataImporter(?ORM $orm = null): DataImporter
    {
        return new DataImporter($orm ?? $this->orm)
            ->setInvoker($this->invoker(...));
    }

    public function createNestedDataImporter(?ORM $orm = null): NestedDataImporter
    {
        return new NestedDataImporter($orm ?? $this->orm)
            ->setInvoker($this->invoker(...));
    }

    protected function invoker(\Closure $callback): mixed
    {
        if ($this->faker) {
            return $callback($this->faker);
        }

        return $callback();
    }
}
