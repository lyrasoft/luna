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
 * The ImageStorageHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class EditorImageHelper extends AbstractStorageHelper
{
	/**
	 * Get file temp path.
	 *
	 * @param   mixed   $identify The identify of this file or item.
	 * @param   string  $ext      Image ext.
	 *
	 * @return string Identify path.
	 */
	public static function getTempFile($identify, $ext = 'jpg')
	{
		return static::getTempPath() . '/' . static::getPath($identify, $ext);
	}

	/**
	 * Get remote uri path.
	 *
	 * @param   mixed   $identify The identify of this file or item.
	 * @param   string  $ext      Image ext.
	 *
	 * @return  string  Identify path.
	 */
	public static function getPath($identify, $ext = 'jpg')
	{
		return static::getBaseFolder() . $identify . '.' . static::getRealExtension($ext);
	}

	/**
	 * Get remote url.
	 *
	 * @param   mixed   $identify The identify of this file or item.
	 * @param   string  $ext      Image ext.
	 *
	 * @return  string  Identify URL.
	 */
	public static function getRemoteUrl($identify, $ext = 'jpg')
	{
		return ImageUploader::getAdapter()->getHost() . '/' . static::getPath($identify, $ext);
	}

	/**
	 * Get base folder name.
	 *
	 * @return  string
	 */
	public static function getBaseFolder()
	{
		return 'images/upload/' .gmdate('Y/m/d') . '/';
	}
}
