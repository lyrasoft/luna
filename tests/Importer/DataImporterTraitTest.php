<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Importer;

use Lyrasoft\Luna\Importer\DataImporter;
use Lyrasoft\Luna\Importer\DataImporterTrait;
use Lyrasoft\Luna\Importer\NestedDataImporter;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\ORM\ORM;

#[AllowMockObjectsWithoutExpectations]
class DataImporterTraitTest extends TestCase
{
    #[Test]
    public function createDataImporterUsesGivenOrmOverPropertyOrm(): void
    {
        $propertyOrm = $this->createMock(ORM::class);
        $givenOrm = $this->createMock(ORM::class);

        $host = new DataImporterTraitHost($propertyOrm);

        $importer = $host->makeDataImporter($givenOrm);

        self::assertInstanceOf(DataImporter::class, $importer);
        self::assertSame($givenOrm, $importer->orm);
    }

    #[Test]
    public function createDataImporterFallsBackToPropertyOrm(): void
    {
        $propertyOrm = $this->createMock(ORM::class);

        $importer = new DataImporterTraitHost($propertyOrm)->makeDataImporter();

        self::assertSame($propertyOrm, $importer->orm);
    }

    #[Test]
    public function createNestedDataImporterReturnsNestedImporterWithGivenOrm(): void
    {
        $givenOrm = $this->createMock(ORM::class);

        $importer = new DataImporterTraitHost($this->createMock(ORM::class))
            ->makeNestedDataImporter($givenOrm);

        self::assertInstanceOf(NestedDataImporter::class, $importer);
        self::assertSame($givenOrm, $importer->orm);
    }

    #[Test]
    public function invokerPassesFakerWhenHostHasApp(): void
    {
        $host = new DataImporterTraitHost($this->createMock(ORM::class));
        $host->app = new \stdClass();
        $host->faker = new \stdClass();

        $received = null;
        $result = $host->callInvoker(function ($faker) use (&$received) {
            $received = $faker;

            return 'with-app';
        });

        self::assertSame($host->faker, $received);
        self::assertSame('with-app', $result);
    }

    #[Test]
    public function invokerCallsWithoutArgumentsWhenHostHasNoApp(): void
    {
        $host = new DataImporterTraitHost($this->createMock(ORM::class));

        $result = $host->callInvoker(fn(...$args) => $args === [] ? 'no-args' : 'unexpected');

        self::assertSame('no-args', $result);
    }
}

class DataImporterTraitHost
{
    use DataImporterTrait;

    public ?object $app = null;

    public ?object $faker = null;

    public function __construct(public ORM $orm) {}

    public function makeDataImporter(?ORM $orm = null): DataImporter
    {
        return $this->createDataImporter($orm);
    }

    public function makeNestedDataImporter(?ORM $orm = null): NestedDataImporter
    {
        return $this->createNestedDataImporter($orm);
    }

    public function callInvoker(\Closure $callback): mixed
    {
        return $this->invoker($callback);
    }
}
