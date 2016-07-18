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
use Windwalker\Event\Event;
use Windwalker\String\StringHelper;
use Windwalker\String\Utf8String;

/**
 * The LanguageListener class.
 *
 * @since  1.0
 */
class LanguageListener
{
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
		if (!Locale::isEnabled())
		{
			return;
		}

		$uri = Ioc::get('uri');
		$route = $event['route'];

		$segments = trim($route, '/');

		if (!count($segments))
		{
			// No segments, means this is home route, return.
			return;
		}

		$segments = explode('/', $segments);

		// Check first segment is language key or not
		$alias = strtolower($segments[0]);

		$language = Locale::getLanguageByAlias($alias);

		if (!$language)
		{
			// Language not found, return and use default language.
			Locale::setLocale(Locale::getLocale());

			return;
		}

		// Set current language
		Locale::setLocale($language->code);

		// Remove first segment and store back to Uri object
		array_shift($segments);

		// this is a real route without language key, use this route to match.
		$event['route'] = implode('/', $segments);

		// Backup the base route that we can use it later.
		$uri['base_route'] = implode('/', $segments);
	}

	/**
	 * onRouterAfterRouteMatch
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterRouting(Event $event)
	{
		$config = Ioc::getConfig();

		$luna = LunaHelper::getPackage();

		if ($luna->isFrontend())
		{
			$config->set('language.enabled', $luna->get('frontend.language.enabled', false));
		}
		elseif ($luna->isAdmin())
		{
			$config->set('frontend.enabled', $luna->get('frontend.language.enabled', false));
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
		if (!Locale::isEnabled(Locale::CLIENT_CURRENT))
		{
			return;
		}

		$route = $event['route'];
		
		list($package, $route) = StringHelper::explode('@', $route, 2, 'array_unshift');
		
		if (!$package)
		{
			return;
		}
		
		if (LunaHelper::isFrontend() && !LunaHelper::isFrontend($package))
		{
			return;
		}

		if (LunaHelper::isAdmin() && !LunaHelper::isAdmin($package))
		{
			return;
		}
		
		$url = $event['url'];

		// Add language key to every route when building.
		$event['url'] = Locale::getCurrentLanguage()->alias . '/' . $url;
	}
}
