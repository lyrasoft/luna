<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\Menu;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

class TmpProbeTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    #[Test]
    public function probe(): void
    {
        $orm = self::$orm;
        static::truncateTables($orm->getEntityMetadata(Menu::class)->getTableName());
        $root = $orm->createOne(Menu::class, ['is_root' => true, 'type' => 'main', 'view' => 'fake', 'title' => 'Root', 'state' => BasicState::PUBLISHED, 'language' => '*']);
        $c = new Menu();
        $c->type = 'main';
        $c->view = 'fake';
        $c->title = 'Plain';
        $c->state = BasicState::PUBLISHED;
        $c->language = '*';
        $c->variables = [];
        $c->parentId = $root->id;
        $orm->createOne(Menu::class, $c);

        $rows = $orm->from(Menu::class)->all(Menu::class);
        $out = [];
        foreach ($rows as $m) {
            $out[] = [$m->id, $m->parentId, $m->lft, $m->rgt, $m->title];
        }
        file_put_contents(sys_get_temp_dir() . '/probe.txt', print_r($out, true));
        self::assertTrue(true);
    }
}
