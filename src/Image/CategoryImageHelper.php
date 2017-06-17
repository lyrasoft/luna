<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Image;

use Lyrasoft\Unidev\Storage\AbstractStorageHelper;

/**
 * The CategoryImageHelper class.
 *
 * @since  1.0
 */
class CategoryImageHelper extends AbstractStorageHelper
{
	/**
	 * Get base folder name.
	 *
	 * @return  string
	 */
	public static function getBaseFolder()
	{
		return 'images/category/';
	}

	/**
	 * Get remote uri path.
	 *
	 * @param   mixed $identify The identify of this file or item.
	 *
	 * @return  string  Identify path.
	 */
	public static function getPath($identify)
	{
		return static::getBaseFolder() . md5($identify) . '.jpg';
	}
}
