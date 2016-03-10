<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Image;

use Lyrasoft\Unidev\Image\ImageUploader;
use Lyrasoft\Unidev\Storage\AbstractStorageHelper;

/**
 * The CategoryImageHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CategoryImageHelper extends AbstractStorageHelper
{
	/**
	 * Get file temp path.
	 *
	 * @param   mixed $identify The identify of this file or item.
	 *
	 * @return  string  Identify path.
	 */
	public static function getTempFile($identify)
	{
		return static::getTempPath() . '/' . static::getPath($identify);
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

	/**
	 * Get remote url.
	 *
	 * @param   mixed $identify The identify of this file or item.
	 *
	 * @return  string  Identify URL.
	 */
	public static function getRemoteUrl($identify)
	{
		return ImageUploader::getAdapter()->getHost() . '/' . static::getPath($identify);
	}

	/**
	 * Get base folder name.
	 *
	 * @return  string
	 */
	public static function getBaseFolder()
	{
		return 'images/category/';
	}
}
