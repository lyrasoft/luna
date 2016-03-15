<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Language;

use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\LanguageScript;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Ioc;

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
	 * Property languages.
	 *
	 * @var  DataSet
	 */
	protected static $languages = [];

	/**
	 * Property sessionKey.
	 *
	 * @var  string
	 */
	protected static $sessionKey = 'locale';

	/**
	 * isLocaleEnabled
	 *
	 * @return  boolean
	 */
	public static function isLocaleEnabled()
	{
		$luna = LunaHelper::getPackage();

		return (bool) $luna->get('frontend.language.enabled') || $luna->get('admin.language.enabled');
	}

	/**
	 * isEnabled
	 *
	 * @return  boolean
	 */
	public static function isEnabled()
	{
		$luna = LunaHelper::getPackage();

		return $luna->get('frontend.language.enabled') || $luna->get('admin.language.enabled');
	}

	/**
	 * getAvailableLanguages
	 *
	 * @return  DataSet
	 */
	public static function getAvailableLanguages()
	{
		if (!static::$languages)
		{
			$mapper = new LanguageMapper;

			$languages = $mapper->find(['state' => 1], 'ordering');

			static::$languages = new DataSet;

			foreach ($languages as $language)
			{
				static::$languages[$language->code] = $language;
			}
		}

		return static::$languages;
	}

	/**
	 * getLanguage
	 *
	 * @param   string  $code
	 *
	 * @return  Data
	 */
	public static function getLanguage($code)
	{
		$languages = static::getAvailableLanguages();

		return $languages[$code];
	}

	/**
	 * getLanguageByAlias
	 *
	 * @param   string  $alias
	 *
	 * @return  Data
	 */
	public static function getLanguageByAlias($alias)
	{
		$languages = static::getAvailableLanguages();

		foreach ($languages as $language)
		{
			if ($language->alias == $alias)
			{
				return $language;
			}
		}

		return null;
	}

	/**
	 * getCurrentLanguage
	 *
	 * @return  Data
	 */
	public static function getCurrentLanguage()
	{
		return static::getLanguage(static::getLocale());
	}

	/**
	 * getLocale
	 *
	 * @return  string
	 */
	public static function getLocale()
	{
		$config = Ioc::getConfig();
		$session = Ioc::getSession();

		$locale = $session->get(static::$sessionKey);

		if (!$locale)
		{
			$locale = $config->get('language.locale') ? : $config->get('language.default', 'en-GB');

			$session->set(static::$sessionKey, $locale);
		}

		return $locale;
	}

	/**
	 * setLocale
	 *
	 * @param   string  $code
	 *
	 * @return  void
	 */
	public static function setLocale($code)
	{
		$session = Ioc::getSession();

		$session->set(static::$sessionKey, $code);

		$config = Ioc::getConfig();

		$config->set('language.locale', $code);
	}

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
