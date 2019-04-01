<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Unidev\Seo\SlugHelper;
use Symfony\Component\Yaml\Yaml;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Database\Schema\Schema;

/**
 * Migration class of CategoryInit.
 */
class CategoryInit extends AbstractMigration
{
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
     * @since  1.5.2
     */
    protected function importCategoriesFromFile($type, $file, $parentId = 1)
    {
        $this->importCategories(
            $type,
            Yaml::parse(file_get_contents($file)),
            $parentId
        );
    }

    /**
     * importCategories
     *
     * @param string $type
     * @param array  $categories
     * @param int    $parentId
     *
     * @return  void
     *
     * @throws Exception
     * @since  1.5.2
     */
    protected function importCategories($type, array $categories, $parentId = 1)
    {
        $faker = $this->faker->create();

        $record = new CategoryRecord();

        $userId = 1;

        foreach ($categories as $alias => $category) {
            $record->reset();

            $record['title']       = $category['title'];
            $record['alias']       = SlugHelper::safe($alias);
            $record['type']        = $type;
            $record['description'] = $faker->paragraph(5);
            $record['image']       = $faker->unsplashImage();
            $record['state']       = 1;
            $record['version']     = random_int(1, 50);
            $record['created']     = $faker->dateTime->format($this->getDateFormat());
            $record['created_by']  = $userId;
            $record['modified']    = $faker->dateTime->format($this->getDateFormat());
            $record['modified_by'] = $userId;
            $record['language']    = '*';
            $record['params']      = '';

            $record->setLocation($parentId, $record::LOCATION_LAST_CHILD);

            $record->store();

            $record->rebuildPath();

            $this->outCounting();

            if (isset($category['children'])) {
                $this->importCategories($type, $category['children'], $record->id);
            }
        }
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->drop(LunaTable::CATEGORIES);
    }
}
