<?php
/**
 * Part of virtualset project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Language\LanguageHelper;
use Windwalker\Core\Ioc;
use Windwalker\Event\Event;

/**
 * The LanguageListener class.
 *
 * @since  {DEPLOY_VERSION}
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

		$language = LanguageHelper::getLanguageByAlias($alias);

		if (!$language)
		{
			// Language not found, return and use default language.
			LanguageHelper::setLocale(LanguageHelper::getLocale());

			return;
		}

		// Set current language
		LanguageHelper::setLocale($language->code);

		// Remove first segment and store back to Uri object
		array_shift($segments);

		// this is a real route without language key, use this route to match.
		$event['route'] = implode('/', $segments);

		// Backup the base route that we can use it later.
		$uri['base_route'] = implode('/', $segments);
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
		if (!LanguageHelper::isLocaleEnabled())
		{
			return;
		}

		$url = $event['url'];

		// Add language key to every route when building.
		$event['url'] = LanguageHelper::getCurrentLanguage()->alias . '/' . $url;
	}
}
