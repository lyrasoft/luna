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
 * @since  1.0
 */
class Locale
{
    const FLAG_NORMAL = 1;
    const FLAG_SQUARE = 2;

    const CLIENT_FRONTEND = 1;
    const CLIENT_ADMIN = 2;
    const CLIENT_EITHER = 4;
    const CLIENT_BOTH = 8;
    const CLIENT_CURRENT = 16;

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
     * isEnabled
     *
     * @param int $client
     *
     * @return boolean
     */
    public static function isEnabled($client = self::CLIENT_EITHER)
    {
        $luna = LunaHelper::getPackage();

        switch ($client) {
            case static::CLIENT_FRONTEND:
                return $luna->get('frontend.language.enabled');
                break;

            case static::CLIENT_ADMIN:
                return $luna->get('admin.language.enabled');
                break;

            case static::CLIENT_BOTH:
                return $luna->get('frontend.language.enabled') && $luna->get('admin.language.enabled');
                break;

            case static::CLIENT_EITHER:
                return $luna->get('frontend.language.enabled') || $luna->get('admin.language.enabled');
                break;

            case static::CLIENT_CURRENT:
                if (LunaHelper::isFrontend()) {
                    return $luna->get('frontend.language.enabled');
                } elseif (LunaHelper::isAdmin()) {
                    return $luna->get('admin.language.enabled');
                }
        }

        return false;
    }

    /**
     * getAvailableLanguages
     *
     * @return  DataSet
     */
    public static function getAvailableLanguages()
    {
        if (!static::$languages) {
            $mapper = new LanguageMapper;

            $languages = $mapper->find(['state' => 1], 'ordering');

            static::$languages = new DataSet;

            foreach ($languages as $language) {
                static::$languages[$language->code] = $language;
            }
        }

        return static::$languages;
    }

    /**
     * getLanguage
     *
     * @param   string $code
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
     * @param   string $alias
     *
     * @return  Data
     */
    public static function getLanguageByAlias($alias)
    {
        $languages = static::getAvailableLanguages();

        foreach ($languages as $language) {
            if ($language->alias === $alias) {
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
        $session = Ioc::getSession();

        $locale = $session->get(static::$sessionKey);

        if (!$locale) {
            $locale = static::getSystemLocal();

            $session->set(static::$sessionKey, $locale);
        }

        return $locale;
    }

    /**
     * getSystemLocal
     *
     * @return  string
     */
    public static function getSystemLocal()
    {
        $config = Ioc::getConfig();

        return $config->get('language.locale') ?: $config->get('language.default', 'en-GB');
    }

    /**
     * setLocale
     *
     * @param   string $code
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
     * @param string  $name
     * @param integer $type
     *
     * @return  string
     */
    public static function getFlagIconClass($name, $type = self::FLAG_NORMAL)
    {
        LanguageScript::flagIcon();

        $name = explode('_', $name);

        if (isset($name[1])) {
            $name[0] = $name[1];
        }

        $sq = $type === static::FLAG_SQUARE ? ' flag-icon-squared' : null;

        return 'flag-icon flag-icon-' . $name[0] . $sq;
    }
}
