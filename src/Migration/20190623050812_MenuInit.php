<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore migration file

use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Lyrasoft\Luna\Importer\MenuImporter;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Core\Migration\AbstractMigration;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Database\Schema\Schema;
use Windwalker\Legacy\Filesystem\File;
use Windwalker\Legacy\Structure\Structure;

/**
 * Migration class of MenuInit.
 */
class MenuInit extends AbstractMigration
{
    /**
     * Property menuImporter.
     *
     * @\Windwalker\Legacy\DI\Annotation\Inject()
     *
     * @var MenuImporter
     */
    protected $menuImporter;

    /**
     * Migrate Up.
     * @throws Exception
     */
    public function up()
    {
        $this->createTable(LunaTable::MENUS, static function (Schema $schema) {
            $schema->primary('id')->comment('Primary Key');
            $schema->integer('parent_id')->comment('Parent ID');
            $schema->integer('lft')->signed(true)->comment('Left Key');
            $schema->integer('rgt')->signed(true)->comment('Right key');
            $schema->integer('level')->comment('Nested Level');
            $schema->varchar('path')->length(1024)->comment('Alias Path');
            $schema->varchar('type')->length(50)->comment('Content Type');
            $schema->varchar('view')->comment('View Name');
            $schema->varchar('title')->comment('Title');
            $schema->varchar('alias')->comment('Alias');
            $schema->varchar('url')->comment('URL');
            $schema->char('target')->length(10)->comment('Target');
            $schema->text('variables')->comment('Vars');
            $schema->varchar('image')->comment('Main Image');
            $schema->tinyint('state')->signed(true)->comment('0: unpublished, 1:published');
            $schema->tinyint('hidden');
            $schema->datetime('created')->comment('Created Date');
            $schema->integer('created_by')->comment('Author');
            $schema->datetime('modified')->comment('Modified Date');
            $schema->integer('modified_by')->comment('Modified User');
            $schema->char('language')->length(7)->comment('Language');
            $schema->text('params')->comment('Params');

            $schema->addIndex('alias(150)');
            $schema->addIndex('path(150)');
            $schema->addIndex('view(150)');
            $schema->addIndex('type(50)');
            $schema->addIndex(['lft', 'rgt']);
            $schema->addIndex('language');
            $schema->addIndex('created_by');
        });

        $record = new MenuRecord();
        $record->createRoot();
    }

    /**
     * importCategoriesFromFile
     *
     * @param string $type
     * @param string $file
     * @param int    $parentId
     *
     * @return  void
     *
     * @throws Exception
     *
     * @since  1.7.12
     */
    protected function importFromFile($type, $file, $parentId = 1): void
    {
        $this->import(
            $type,
            (new Structure($file, File::getExtension($file)))->toArray(),
            $parentId
        );
    }

    /**
     * importCategories
     *
     * @param string $type
     * @param array  $menus
     * @param int    $parentId
     *
     * @return  void
     *
     * @throws Exception
     * @since  1.7.12
     */
    protected function import($type, array $menus, $parentId = 1): void
    {
        $faker = $this->faker->create();

        $this->menuImporter
            ->listen('onItemImported', $handler = function () {
                $this->outCounting();
            })
            ->import(
                $menus,
                [
                    'type' => $type,
                    'parent_id' => $parentId
                ],
                static function (Data $item, string $key) use ($faker) {
                    $item->alias = $key;
                    $item->image = $faker->unsplashImage();
                }
            )
            ->getDispatcher()
            ->removeListener($handler);
    }

    /**
     * Migrate Down.
     * @throws Exception
     */
    public function down()
    {
        $this->drop(LunaTable::MENUS);
    }
}
