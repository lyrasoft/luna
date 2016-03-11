<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

use Lyrasoft\Luna\Admin\Table\Table;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Migration\Schema;
use Windwalker\Database\Schema\Column;
use Windwalker\Database\Schema\DataType;
use Windwalker\Database\Schema\Key;

/**
 * Migration class of LanguageInit.
 */
class LanguageInit extends AbstractMigration
{
	/**
	 * Migrate Up.
	 */
	public function up()
	{
		$this->getTable(Table::LANGUAGES, function(Schema $sc)
		{
			$sc->addColumn('id',           new Column\Primary)->comment('Primary Key');
			$sc->addColumn('title',        new Column\Varchar)->comment('Title');
			$sc->addColumn('title_native', new Column\Varchar)->comment('Title Native');
			$sc->addColumn('code',         new Column\Varchar)->comment('Language Code');
			$sc->addColumn('url',          new Column\Varchar)->comment('URL');
			$sc->addColumn('created',      new Column\Datetime)->comment('Created Date');
			$sc->addColumn('created_by',   new Column\Integer)->comment('Author');
			$sc->addColumn('modified',     new Column\Datetime)->comment('Modified Date');
			$sc->addColumn('modified_by',  new Column\Integer)->comment('Modified User');
			$sc->addColumn('params',       new Column\Text)->comment('Params');

			$sc->addIndex(Key::TYPE_INDEX, 'idx_languages_code', 'code');
			$sc->addIndex(Key::TYPE_INDEX, 'idx_languages_url', 'url');
			$sc->addIndex(Key::TYPE_INDEX, 'idx_languages_created_by', 'created_by');
		})->create(true);
	}

	/**
	 * Migrate Down.
	 */
	public function down()
	{
		$this->drop(Table::LANGUAGES);
	}
}
