<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Importer;

use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Seed\AbstractSeeder;
use Windwalker\ORM\ORM;

trait DataImporterTrait
{
    public function createDataImporter(?ORM $orm = null): DataImporter
    {
        return new DataImporter($orm ?? $this->orm)
            ->setInvoker($this->invoker(...))
            ->onItemSaved(
                function () {
                    if ($this instanceof AbstractMigration || $this instanceof AbstractSeeder) {
                        $this->printCounting();
                    }
                }
            );
    }

    public function createNestedDataImporter(?ORM $orm = null): NestedDataImporter
    {
        return new NestedDataImporter($orm ?? $this->orm)
            ->setInvoker($this->invoker(...))
            ->onItemSaved(
                function () {
                    if ($this instanceof AbstractMigration || $this instanceof AbstractSeeder) {
                        $this->printCounting();
                    }
                }
            );
    }

    protected function invoker(\Closure $callback): mixed
    {
        if (isset($this->app)) {
            return $callback($this->faker);
        }

        return $callback();
    }
}
