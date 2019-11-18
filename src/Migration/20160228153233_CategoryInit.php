<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Importer\CategoryImporter;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Data\Data;
use Windwalker\Database\Schema\Schema;
use Windwalker\Filesystem\File;
use Windwalker\Structure\Structure;

/**
 * Migration class of CategoryInit.
 */
class CategoryInit extends AbstractMigration
{
    /**
     * Property categoryImporter.
     *
     * @\Windwalker\DI\Annotation\Inject()
     *
     * @var CategoryImporter
     */
    protected $categoryImporter;

    /**
     * Migrate Up.
     * @throws Exception
     */
    public function up()
    {
        $this->createTable(LunaTable::CATEGORIES, function (Schema $schema) {
            $schema->primary('id')->comment('Primary Key');
            $schema->integer('parent_id')->comment('Parent ID');
            $schema->integer('lft')->signed(true)->comment('Left Key');
            $schema->integer('rgt')->signed(true)->comment('Right key');
            $schema->integer('level')->comment('Nested Level');
            $schema->varchar('path')->length(1024)->comment('Alias Path');
            $schema->varchar('type')->length(50)->comment('Content Type');
            $schema->varchar('title')->comment('Title');
            $schema->varchar('alias')->comment('Alias');
            $schema->varchar('image')->comment('Main Image');
            $schema->text('description')->comment('Description Text');
            $schema->tinyint('state')->length(1)->signed(true)->comment('0: unpublished, 1:published');
            $schema->datetime('created')->comment('Created Date');
            $schema->integer('created_by')->comment('Author');
            $schema->datetime('modified')->comment('Modified Date');
            $schema->integer('modified_by')->comment('Modified User');
            $schema->char('language')->length(7)->comment('Language');
            $schema->text('params')->comment('Params');

            $schema->addIndex('alias(100)');
            $schema->addIndex('path(100)');
            $schema->addIndex(['lft', 'rgt']);
            $schema->addIndex('language');
            $schema->addIndex('created_by');
        });

        $record = new CategoryRecord();
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

        $this->categoryImporter
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
     */
    public function down()
    {
        $this->drop(LunaTable::CATEGORIES);
    }
}
