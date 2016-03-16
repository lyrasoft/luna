<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Windwalker\Core\Seeder\AbstractSeeder;

/**
 * The DatabaseSeeder class.
 * 
 * @since  1.0
 */
class DatabaseSeeder extends AbstractSeeder
{
	/**
	 * doExecute
	 *
	 * @return  void
	 */
	public function doExecute()
	{
		$this->execute(new LanguageSeeder);

		$this->execute(new TagSeeder);

		$this->execute(new CategorySeeder);

		$this->execute(new ArticleSeeder);

		$this->execute(new CommentSeeder);

		$this->execute(new ModuleSeeder);

		// @muse-placeholder  seeder-execute  Do not remove this.
	}

	/**
	 * doClean
	 *
	 * @return  void
	 */
	public function doClean()
	{
		$this->clean(new LanguageSeeder);

		$this->clean(new TagSeeder);

		$this->clean(new CategorySeeder);

		$this->clean(new ArticleSeeder);

		$this->clean(new CommentSeeder);

		$this->clean(new ModuleSeeder);

		// @muse-placeholder  seeder-clean  Do not remove this.
	}
}
