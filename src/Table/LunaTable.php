<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Table;

use Lyrasoft\Luna\Helper\LunaHelper;

define('LUNA_TABLE_CATEGORIES', LunaHelper::getTable('categories'));
define('LUNA_TABLE_ARTICLES', LunaHelper::getTable('articles'));
define('LUNA_TABLE_TAGS', LunaHelper::getTable('tags'));
define('LUNA_TABLE_TAG_MAPS', LunaHelper::getTable('tag_maps'));
define('LUNA_TABLE_LANGUAGES', LunaHelper::getTable('languages'));
define('LUNA_TABLE_COMMENTS', LunaHelper::getTable('comments'));
define('LUNA_TABLE_MODULES', LunaHelper::getTable('modules'));
define('LUNA_TABLE_CONTACTS', LunaHelper::getTable('contacts'));
define('LUNA_TABLE_PAGES', LunaHelper::getTable('pages'));
define('LUNA_TABLE_CONFIGS', LunaHelper::getTable('configs'));
define('LUNA_TABLE_MENUS', LunaHelper::getTable('menus'));

/**
 * The Table class.
 *
 * @since  1.0
 */
interface LunaTable
{
    const CATEGORIES = LUNA_TABLE_CATEGORIES;

    const ARTICLES = LUNA_TABLE_ARTICLES;

    const TAGS = LUNA_TABLE_TAGS;

    const TAG_MAPS = LUNA_TABLE_TAG_MAPS;

    const LANGUAGES = LUNA_TABLE_LANGUAGES;

    const COMMENTS = LUNA_TABLE_COMMENTS;

    const MODULES = LUNA_TABLE_MODULES;

    const CONTACTS = LUNA_TABLE_CONTACTS;

    const PAGES = LUNA_TABLE_PAGES;

    const CONFIGS = LUNA_TABLE_CONFIGS;

    const MENUS = LUNA_TABLE_MENUS;

    // @muse-placeholder  db-table  Do not remove this.
}
