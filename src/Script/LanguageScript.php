<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Asset\AbstractScript;

/**
 * The LanguageScript class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LanguageScript extends AbstractScript
{
	/**
	 * flagIcon
	 *
	 * @return  void
	 */
	public static function flagIcon()
	{
		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();

			$asset = static::getAsset();

			$asset->addStyle($luna->name . '/css/flag-icon.min.css');
		}
	}
}
