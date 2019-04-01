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
use Windwalker\Core\Language\Translator;
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
    public const FLAG_NORMAL = 1;
    public const FLAG_SQUARE = 2;

    public const CLIENT_FRONTEND = 1;
    public const CLIENT_ADMIN = 2;
    public const CLIENT_EITHER = 4;
    public const CLIENT_BOTH = 8;
    public const CLIENT_CURRENT = 16;

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
                }

                if (LunaHelper::isAdmin()) {
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
            $languages = LanguageMapper::find(['state' => 1], 'ordering');

            static::$languages = new DataSet();

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
        if ($alias === '') {
            return null;
        }

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
    public static function getLocale(): string
    {
        return Translator::getLocale();
    }

    /**
     * getCachedLocale
     *
     * @return  string|null
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function getCachedLocale():? string
    {
        $session = Ioc::getSession();

        return $session->get(static::$sessionKey);
    }

    /**
     * getSystemLocal
     *
     * @return  string
     *
     * @deprecated Use getSystemLocale()
     */
    public static function getSystemLocal()
    {
        return static::getSystemLocale();
    }

    /**
     * getSystemLocal
     *
     * @return  string
     */
    public static function getSystemLocale(): string
    {
        $config = Ioc::getConfig();

        return (string) ($config->get('language.locale') ?: $config->get('language.default', 'en-GB'));
    }

    /**
     * getBrowserLanguage
     *
     * @param array  $available
     * @param string $default
     *
     * @return  string
     *
     * @since  1.5.5
     */
    public static function getBrowserLanguage(array $available = [], $default = 'en-GB')
    {
        if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            $langs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);

            if (empty($available)) {
                return $langs[0];
            }

            foreach ($langs as $lang) {
                list($lang) = explode(';', $lang);

                if (in_array($lang, $available, true)) {
                    return $lang;
                }
            }
        }

        return $default;
    }

    /**
     * setLocale
     *
     * @param string $code
     * @param bool   $asCached
     *
     * @return  void
     */
    public static function setLocale($code, bool $asCached = false)
    {
        if ($asCached) {
            $session = Ioc::getSession();

            $session->set(static::$sessionKey, $code);
        }

        Translator::setLocale($code);
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
