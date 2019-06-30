<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore migration file

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Utilities\SlugHelper;
use Symfony\Component\Yaml\Yaml;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Database\Schema\Schema;

/**
 * Migration class of MenuInit.
 */
class MenuInit extends AbstractMigration
{
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
     * @since  1.7.6
     */
    protected function importFromFile($type, $file, $parentId = 1)
    {
        $this->import(
            $type,
            Yaml::parse(file_get_contents($file)),
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
     * @since  1.7.6
     */
    protected function import($type, array $menus, $parentId = 1): void
    {
        $faker = $this->faker->create();

        $record = new MenuRecord();

        $userId = 1;

        foreach ($menus as $alias => $menu) {
            $record->reset();

            $record['title']       = $menu['title'];
            $record['alias']       = SlugHelper::safe($alias);
            $record['type']        = $type;
            $record['view']        = $menu['view'];
            $record['image']       = $faker->unsplashImage();
            $record['state']       = 1;
            $record['hidden']      = $menu['hidden'] ?? 0;
            $record['target']      = $menu['target'] ?? '_self';
            $record['variables']   = json_encode($menu['varialbes'] ?? []);
            $record['created']     = $faker->dateTime->format($this->getDateFormat());
            $record['created_by']  = $userId;
            $record['modified']    = $faker->dateTime->format($this->getDateFormat());
            $record['modified_by'] = $userId;
            $record['language']    = $menu['language'] ?? '*';
            $record['params']      = json_encode($menu['params'] ?? []);

            $record->setLocation($parentId, $record::LOCATION_LAST_CHILD);

            $record->store();

            $record->rebuildPath();

            $this->outCounting();

            if (isset($menu['children'])) {
                $this->import($type, $menu['children'], $record->id);
            }
        }
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
