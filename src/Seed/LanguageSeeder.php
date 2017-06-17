<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Seeder\AbstractSeeder;

/**
 * The LanguageSeeder class.
 * 
 * @since  1.0
 */
class LanguageSeeder extends AbstractSeeder
{
	/**
	 * doExecute
	 *
	 * @return  void
	 */
	public function doExecute()
	{
		LanguageMapper::updateBatch(['state' => 1], ['code' => ['zh-TW', 'ja-JP']]);
	}

	/**
	 * doClear
	 *
	 * @return  void
	 */
	public function doClear()
	{
		$this->truncate(LunaTable::LANGUAGES);
	}
}
