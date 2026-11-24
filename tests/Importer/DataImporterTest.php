<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Importer;

use Lyrasoft\Luna\Importer\DataImporter;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\ORM\ORM;

#[AllowMockObjectsWithoutExpectations]
class DataImporterTest extends TestCase
{
    #[Test]
    public function importSavesEveryItemFromIterable(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->exactly(2))
            ->method('saveOne')
            ->willReturnArgument(0);

        $importer = new DataImporter($orm);
        $importer->import([(object) ['title' => 'a'], (object) ['title' => 'b']]);
    }

    #[Test]
    public function importResolvesClosureSourceThroughInvoker(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->with($this->callback(fn(object $item) => $item->title === 'from-closure'))
            ->willReturnArgument(0);

        $invoked = false;
        $importer = new DataImporter($orm);
        $importer->setInvoker(function (\Closure $callback) use (&$invoked) {
            $invoked = true;

            return $callback();
        });

        $importer->import(
            fn() => [(object) ['title' => 'from-closure']]
        );

        self::assertTrue($invoked);
    }

    #[Test]
    public function importLoadsItemsFromFilePath(): void
    {
        $file = tempnam(sys_get_temp_dir(), 'luna-import');
        file_put_contents($file, '<?php return [(object) ["title" => "from-file"]];');

        try {
            $orm = $this->createMock(ORM::class);
            $orm->expects($this->once())
                ->method('saveOne')
                ->with($this->callback(fn(object $item) => $item->title === 'from-file'))
                ->willReturnArgument(0);

            new DataImporter($orm)->import($file);
        } finally {
            unlink($file);
        }
    }

    #[Test]
    public function importItemAppliesDefaultAndPerCallHandlersInOrder(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->with($this->callback(fn(object $item) => $item->steps === ['default', 'call']))
            ->willReturnArgument(0);

        $importer = new DataImporter($orm);
        $importer->setDefaultDataHandler(function (object $item) {
            $item->steps = ['default'];

            return $item;
        });

        $importer->importItem(
            (object) [],
            function (object $item) {
                $item->steps[] = 'call';

                return $item;
            }
        );
    }

    #[Test]
    public function importItemKeepsItemWhenHandlersReturnNull(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->with($this->callback(fn(object $item) => $item->title === 'kept'))
            ->willReturnArgument(0);

        $importer = new DataImporter($orm);
        $importer->setDefaultDataHandler(function (object $item) {
            $item->title = 'kept';

            return null;
        });

        $importer->importItem((object) [], fn(object $item) => null);
    }

    #[Test]
    public function importItemResolvesClosureItemThroughInvoker(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->with($this->callback(fn(object $item) => $item->title === 'lazy'))
            ->willReturnArgument(0);

        new DataImporter($orm)->importItem(fn() => (object) ['title' => 'lazy']);
    }

    #[Test]
    public function onItemSavedReceivesSavedItemAndCanReplaceResult(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->willReturnArgument(0);

        $importer = new DataImporter($orm);
        $importer->onItemSaved(fn(object $item) => (object) ['wrapped' => $item]);

        $result = $importer->importItem((object) ['title' => 'x']);

        self::assertObjectHasProperty('wrapped', $result);
        self::assertSame('x', $result->wrapped->title);
    }

    #[Test]
    public function importItemReturnsSavedObjectFromOrm(): void
    {
        $saved = (object) ['id' => 7];

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('saveOne')
            ->willReturn($saved);

        $result = new DataImporter($orm)->importItem((object) ['title' => 'x']);

        self::assertSame($saved, $result);
    }
}
