<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Table;

use Lyrasoft\Luna\Helper\LunaHelper;

define('LUNA_TABLE_CATEGORIES', LunaHelper::getTable('categories'));
define('LUNA_TABLE_ARTICLES',   LunaHelper::getTable('articles'));
define('LUNA_TABLE_TAGS',       LunaHelper::getTable('tags'));
define('LUNA_TABLE_TAG_MAPS',   LunaHelper::getTable('tag_maps'));
define('LUNA_TABLE_LANGUAGES',  LunaHelper::getTable('languages'));
define('LUNA_TABLE_COMMENTS',   LunaHelper::getTable('comments'));
define('LUNA_TABLE_MODULES',    LunaHelper::getTable('modules'));

/**
 * The Table class.
 * 
 * @since  1.0
 */
abstract class LunaTable
{
	const CATEGORIES = 'categories';

	const ARTICLES = 'articles';

	const TAGS = 'tags';

	const TAG_MAPS = 'tag_maps';

	const LANGUAGES = 'languages';

	const COMMENTS = 'comments';

	const MODULES = 'modules';

	// @muse-placeholder  db-table  Do not remove this.
}
