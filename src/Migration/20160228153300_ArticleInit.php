<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Data\Data;
use Windwalker\Database\Schema\Schema;
use Windwalker\Filesystem\File;
use Windwalker\Structure\Structure;

/**
 * Migration class of ArticleInit.
 */
class ArticleInit extends AbstractMigration
{
    /**
     * Property importer.
     *
     * @\Windwalker\DI\Annotation\Inject()
     *
     * @var \Lyrasoft\Luna\Importer\ArticleImporter
     */
    protected $articleImporter;

    /**
     * Migrate Up.
     */
    public function up()
    {
        $this->createTable(LunaTable::ARTICLES, function (Schema $sc) {
            $sc->primary('id')->comment('Primary Key');
            $sc->integer('category_id')->comment('Category ID');
            $sc->integer('page_id')->comment('Page ID');
            $sc->varchar('title')->comment('Title');
            $sc->varchar('alias')->comment('Alias');
            $sc->varchar('image')->comment('Main Image');
            $sc->longtext('introtext')->comment('Intro Text');
            $sc->longtext('fulltext')->comment('Full Text');
            $sc->tinyint('state')->length(1)->signed(true)->comment('0: unpublished, 1:published');
            $sc->integer('ordering')->comment('Ordering');
            $sc->datetime('created')->comment('Created Date');
            $sc->integer('created_by')->comment('Author');
            $sc->datetime('modified')->comment('Modified Date');
            $sc->integer('modified_by')->comment('Modified User');
            $sc->char('language')->length(7)->comment('Language');
            $sc->text('params')->comment('Params');

            $sc->addIndex('page_id');
            $sc->addIndex('category_id');
            $sc->addIndex('alias(150)');
            $sc->addIndex('language');
            $sc->addIndex('created_by');
        });
    }

    /**
     * importCategoriesFromFile
     *
     * @param string $file
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    protected function import(array $items): void
    {
        $faker = $this->faker->create();

        $this->articleImporter
            ->listen('onItemImported', $handler = function () {
                $this->outCounting();
            })
            ->import(
                $items,
                [],
                static function (Data $item, string $key) use ($faker) {
                    $item->alias     = $key;
                    $item->image     = $faker->unsplashImage();
                    $item->introtext = $faker->paragraph(10);
                    $item->fulltext  = $faker->paragraph(10);
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
        $this->drop(LunaTable::ARTICLES);
    }
}
