<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Helper;

use Lyrasoft\Unidev\Storage\StorageHelperInterface;

/**
 * The ImageStorageHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ImageStorageHelper implements StorageHelperInterface
{
	/**
	 * Property base.
	 *
	 * @var  string
	 */
	protected static $base = 'image';

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
		return WINDWALKER_TEMP . '/' . static::$base . '/' . $identify . '.' . static::getRealExtension($ext);
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
		return static::$base . '/' . $identify . '.' . static::getRealExtension($ext);
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
		return null;
	}

	/**
	 * getRealExtension
	 *
	 * @param   string  $ext
	 *
	 * @return  string
	 */
	public static function getRealExtension($ext)
	{
		$ext = strtolower($ext);

		if ($ext == 'jpeg')
		{
			$ext = 'jpg';
		}

		return $ext;
	}
}
