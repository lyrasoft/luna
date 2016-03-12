<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Language;

use Lyrasoft\Luna\Script\LanguageScript;

/**
 * The LanguageHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LanguageHelper
{
	const FLAG_NORMAL = 1;
	const FLAG_SQUARE = 2;

	/**
	 * getFlagIconClass
	 *
	 * @param string   $name
	 * @param integer  $type
	 *
	 * @return  string
	 */
	public static function getFlagIconClass($name, $type = self::FLAG_NORMAL)
	{
		LanguageScript::flagIcon();

		$name = explode('_', $name);

		if (isset($name[1]))
		{
			$name[0] = $name[1];
		}

		$sq = $type == static::FLAG_SQUARE ? ' flag-icon-squared' : null;

		return 'flag-icon flag-icon-' . $name[0] . $sq;
	}
}
