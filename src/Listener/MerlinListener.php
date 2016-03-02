<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Listener;

use Lyrasoft\Merlin\Helper\MerlinHelper;
use Lyrasoft\Merlin\MerlinPackage;
use Phoenix\DataMapper\DataMapperResolver;
use Phoenix\Form\FieldDefinitionResolver;
use Phoenix\Record\RecordResolver;
use Windwalker\Core\Application\WebApplication;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\View\BladeHtmlView;
use Windwalker\Event\Event;
use Windwalker\Utilities\Queue\Priority;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The MerlinListener class.
 *
 * @since  {DEPLOY_VERSION}
 */
class MerlinListener
{
	/**
	 * Property package.
	 *
	 * @var  MerlinPackage
	 */
	protected $merlin;

	/**
	 * UserListener constructor.
	 *
	 * @param MerlinPackage $merlin
	 */
	public function __construct(MerlinPackage $merlin = null)
	{
		$this->merlin = $merlin ? : MerlinHelper::getPackage();
	}

	/**
	 * onAfterRouting
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterRouting(Event $event)
	{
		/** @var WebApplication $app */
		$app     = $event['app'];
		$package = $app->getPackage();

		// In Warder
		if ($this->merlin->isEnabled())
		{
			RecordResolver::addNamespace(ReflectionHelper::getNamespaceName($this->merlin) . '/Admin/Record', Priority::LOW);
			DataMapperResolver::addNamespace(ReflectionHelper::getNamespaceName($this->merlin) . '/Admin/DataMapper', Priority::LOW);
		}

		// Frontend
		if ($this->merlin->isFrontend())
		{
			$package->getMvcResolver()
				->addNamespace(ReflectionHelper::getNamespaceName($this->merlin));

			FieldDefinitionResolver::addNamespace((ReflectionHelper::getNamespaceName($this->merlin) . '\Form'));
		}
		elseif ($this->merlin->isAdmin())
		{
			$package->getMvcResolver()
				->addNamespace(ReflectionHelper::getNamespaceName($this->merlin) . '\Admin');

			FieldDefinitionResolver::addNamespace(ReflectionHelper::getNamespaceName($this->merlin) . '\Admin\Form');
		}
	}

	/**
	 * onViewBeforeRender
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onViewBeforeRender(Event $event)
	{
		$view = $event['view'];

		/**
		 * @var BladeHtmlView $view
		 * @var BladeRenderer $renderer
		 */
		$name = $view->getName();
		$renderer = $view->getRenderer();

		$app = $view->getPackage()->app;

		// Prepare View data
		if ($this->merlin->isFrontend())
		{
			// Extends
			$view['merlinExtends'] = $this->merlin->get('frontend.view.extends', '_global.html');
			$view['merlinPrefix'] = $this->merlin->get('frontend.language.prefix', 'warder.');
			$view['warder'] = $this->merlin;

			// Paths
//			$renderer->addPath(WARDER_SOURCE . '/Templates/' . $name . '/' . $app->get('language.locale'), Priority::LOW - 25);
//			$renderer->addPath(WARDER_SOURCE . '/Templates/' . $name . '/' . $app->get('language.default'), Priority::LOW - 25);
			$renderer->addPath(MERLIN_SOURCE . '/Templates/' . $name, Priority::LOW - 25);
		}
		elseif ($this->merlin->isAdmin())
		{
			// Extends
			$view['merlinExtends'] = $this->merlin->get('admin.view.extends', '_global.html');
			$view['merlinPrefix'] = $this->merlin->get('admin.language.prefix', 'warder.');
			$view['warder'] = $this->merlin;

			// Paths
//			$renderer->addPath(WARDER_SOURCE_ADMIN . '/Templates/' . $name . '/' . $app->get('language.locale'), Priority::LOW - 25);
//			$renderer->addPath(WARDER_SOURCE_ADMIN . '/Templates/' . $name . '/' . $app->get('language.default'), Priority::LOW - 25);
			$renderer->addPath(MERLIN_SOURCE_ADMIN . '/Templates/' . $name, Priority::LOW - 25);
		}
	}
}
