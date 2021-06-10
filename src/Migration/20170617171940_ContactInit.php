<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Core\Migration\AbstractMigration;
use Windwalker\Legacy\Database\Schema\Schema;

/**
 * Migration class of ContactInit.
 */
class ContactInit extends AbstractMigration
{
    /**
     * Migrate Up.
     */
    public function up()
    {
        $this->createTable(LunaTable::CONTACTS, function (Schema $schema) {
            $schema->primary('id')->comment('Primary Key');
            $schema->varchar('subject')->comment('Subject');
            $schema->varchar('email')->comment('Email');
            $schema->varchar('name')->comment('Sender Name');
            $schema->varchar('url')->comment('URL');
            $schema->varchar('phone')->comment('Phone');
            $schema->longtext('content')->comment('Content');
            $schema->text('details')->comment('Details JSON');
            $schema->tinyint('state')->signed(true)->comment('-1:cancel, 0:pending, 1:handling, 2:done');
            $schema->datetime('created')->comment('Created Date');
            $schema->integer('created_by')->comment('Author');
            $schema->datetime('modified')->comment('Modified Date');
            $schema->integer('modified_by')->comment('Modified User');
            $schema->text('params')->comment('Params');

            $schema->addIndex('email(150)');
            $schema->addIndex('phone(150)');
            $schema->addIndex('name(150)');
        });
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->drop(LunaTable::CONTACTS);
    }
}
