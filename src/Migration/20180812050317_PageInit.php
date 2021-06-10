<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore migration file

use Lyrasoft\Luna\Importer\PageImporter;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Core\Migration\AbstractMigration;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Database\Schema\Schema;
use Windwalker\Legacy\Filesystem\File;
use Windwalker\Legacy\Structure\Structure;

/**
 * Migration class of PageInit.
 */
class PageInit extends AbstractMigration
{
    /**
     * Property pageImporter.
     *
     * @\Windwalker\Legacy\DI\Annotation\Inject()
     *
     * @var PageImporter
     */
    protected $pageImporter;

    /**
     * Migrate Up.
     */
    public function up()
    {
        $this->createTable(LunaTable::PAGES, function (Schema $schema) {
            $schema->primary('id')->comment('Primary Key');
            $schema->varchar('extends')->comment('Extends Layout');
            $schema->varchar('title')->comment('Title');
            $schema->varchar('alias')->comment('Alias');
            $schema->longtext('content')->comment('Page data');
            $schema->longtext('css')->comment('CSS');
            $schema->text('meta')->comment('Metadata');
            $schema->tinyint('state')->signed(true)->comment('0: unpublished, 1:published');
            $schema->integer('ordering')->comment('Ordering');
            $schema->datetime('created')->comment('Created Date');
            $schema->integer('created_by')->comment('Author');
            $schema->datetime('modified')->comment('Modified Date');
            $schema->integer('modified_by')->comment('Modified User');
            $schema->char('language')->length(7)->comment('Language');
            $schema->char('preview_secret')->length(32);
            $schema->text('params')->comment('Params');

            $schema->addIndex('extends(150)');
            $schema->addIndex('alias(150)');
            $schema->addIndex('language');
            $schema->addIndex('preview_secret');
            $schema->addIndex('created_by');
        });
    }

    /**
     * importCategoriesFromFile
     *
     * @param string $file
     *
     * @return  void
     *
     * @since  1.7.12
     */
    protected function importFromFile($file): void
    {
        $this->import(
            (new Structure($file, File::getExtension($file)))->toArray()
        );
    }

    /**
     * importCategories
     *
     * @param array $items
     *
     * @return  void
     *
     * @since  1.7.12
     */
    protected function import(array $items): void
    {
        $faker = $this->faker->create();

        $content = file_get_contents(__DIR__ . '/../seeders/fixtures/page.json');

        $this->pageImporter
            ->listen('onItemImported', $handler = function () {
                $this->outCounting();
            })
            ->import(
                $items,
                [],
                static function (Data $item, string $key) use ($faker, $content) {
                    $item->alias   = $key;
                    $item->image   = $faker->unsplashImage();
                    $item->content = $content;
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
        $this->drop(LunaTable::PAGES);
    }
}
