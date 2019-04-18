<?php
/**
 * Part of virtualset project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Windwalker\Core\Ioc;
use Windwalker\Core\Language\Translator;
use Windwalker\Event\Event;

/**
 * The LanguageListener class.
 *
 * @since  1.0
 */
class LanguageListener
{
    /**
     * Property locale.
     *
     * @var string
     */
    protected $locale;

    /**
     * onBeforeRouting
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onRouterBeforeRouteMatch(Event $event)
    {
        // Workaround when languages table not exists
        if (!Locale::isEnabled()) {
            return;
        }

        $uri   = Ioc::get('uri');
        $route = $event['route'];

        $segments = trim($route, '/');

        if ($segments === '') {
            // No segments, means this is home route, return.
            return;
        }

        $segments = explode('/', $segments);

        // Check first segment is language key or not
        $alias = strtolower($segments[0]);

        $language = Locale::getLanguageByAlias($alias);

        // No language path, set as default.
        if (!$language) {
            return;
        }

        // Set current language
        $this->locale = $language->code;

        // Remove first segment and store back to Uri object
        array_shift($segments);

        // this is a real route without language key, use this route to match.
        $event['route'] = implode('/', $segments);

        // Backup the base route that we can use it later.
        $uri['base_route'] = implode('/', $segments);
    }

    /**
     * prepareBrowserLocale
     *
     * @return  void
     *
     * @since  1.6.3
     */
    protected function prepareBrowserLocale(): void
    {
        $useBrowser = null;
        $luna = LunaHelper::getPackage();

        if ($luna->isFrontend()) {
            $useBrowser = $luna->get('frontend.language.use_browser', false);
        } elseif ($luna->isAdmin()) {
            $useBrowser = $luna->get('admin.language.use_browser', false);
        }

        if ($useBrowser) {
            $availableCodes = Locale::getAvailableLanguages()->code;

            $locale = Locale::getBrowserLanguage($availableCodes, null);

            Locale::setLocale($locale);
        }
    }

    /**
     * onAfterRouting
     *
     * @return  void
     *
     * @since  1.6.3
     */
    public function onAfterRouting()
    {
        // Prepare default locale
        if (Locale::isEnabled(Locale::CLIENT_CURRENT)) {
            // Locale found from URL, set it to system and cached
            if ($this->locale) {
                Locale::setLocale($this->locale, true);
            } else {
                // Not found, try to get from cache
                if ($locale = Locale::getCachedLocale()) {
                    Locale::setLocale($locale);
                } else {
                    $this->prepareBrowserLocale();
                }
            }
        }
    }

    /**
     * onRouterAfterRouteBuild
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onRouterAfterRouteBuild(Event $event)
    {
        if (!Locale::isEnabled(Locale::CLIENT_CURRENT)) {
            return;
        }

        $route = $event['route'];

        list($package, $route) = array_pad(explode('@', $route, 2), -2, null);

        if (!$package) {
            return;
        }

        if (LunaHelper::isFrontend() && !LunaHelper::isFrontend($package)) {
            return;
        }

        if (LunaHelper::isAdmin() && !LunaHelper::isAdmin($package)) {
            return;
        }

        $url = $event['url'];

        // Add language key to every route when building.
        $event['url'] = Locale::getCurrentLanguage()->alias . '/' . $url;
    }
}
