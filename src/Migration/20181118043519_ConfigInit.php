<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore migration file

use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Database\Schema\Schema;

/**
 * Migration class of ConfigInit.
 */
class ConfigInit extends AbstractMigration
{
    /**
     * Migrate Up.
     */
    public function up()
    {
        $this->createTable(LunaTable::CONFIGS, function (Schema $schema) {
            $schema->char('type')->length(50)->comment('Type');
            $schema->char('subtype')->length(50)->comment('Sub Type');
            $schema->longtext('content')->comment('Content');
            $schema->datetime('modified')->comment('Modified');
            $schema->integer('modified_by')->comment('Modified User');

            $schema->addIndex('type');
            $schema->addIndex('subtype');
            $schema->addPrimaryKey(['type', 'subtype']);
        });
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->drop(LunaTable::CONFIGS);
    }
}
