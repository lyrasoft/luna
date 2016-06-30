<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Admin\Model\CommentsModel;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Windwalker\Core\Package\Resolver\DataMapperResolver;
use Windwalker\Core\Package\Resolver\FieldDefinitionResolver;
use Windwalker\Core\Package\Resolver\RecordResolver;
use Windwalker\Core\Application\WebApplication;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\View\BladeHtmlView;
use Windwalker\Event\Event;
use Windwalker\Test\TestHelper;
use Windwalker\Utilities\Queue\PriorityQueue;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The LunaListener class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LunaListener
{
	/**
	 * Property package.
	 *
	 * @var  LunaPackage
	 */
	protected $luna;

	/**
	 * UserListener constructor.
	 *
	 * @param LunaPackage $luna
	 */
	public function __construct(LunaPackage $luna = null)
	{
		$this->luna = $luna ? : LunaHelper::getPackage();
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
		if ($this->luna->isEnabled())
		{
			RecordResolver::addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '/Admin/Record', PriorityQueue::LOW);
			DataMapperResolver::addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '/Admin/DataMapper', PriorityQueue::LOW);
			FieldDefinitionResolver::addNamespace(ReflectionHelper::getNamespaceName($package) . '/Form', PriorityQueue::NORMAL + 1); // TODO: Rewrite PriorityQueue of form fields
		}

		// Frontend
		if ($this->luna->isFrontend())
		{
			$package->getMvcResolver()
				->addNamespace(ReflectionHelper::getNamespaceName($this->luna));

			FieldDefinitionResolver::addNamespace((ReflectionHelper::getNamespaceName($this->luna) . '\Form'));
		}
		elseif ($this->luna->isAdmin())
		{
			$package->getMvcResolver()
				->addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '\Admin');

			FieldDefinitionResolver::addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '\Admin\Form');
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
		if ($this->luna->isFrontend())
		{
			// Extends
			$view['lunaExtends'] = $this->luna->get('frontend.view.extends', '_global.html');
			$view['lunaPrefix'] = $this->luna->get('frontend.language.prefix', 'warder.');
			$view['luna'] = $this->luna;

			// Paths
//			$renderer->addPath(WARDER_SOURCE . '/Templates/' . $name . '/' . $app->get('language.locale'), PriorityQueue::LOW - 25);
//			$renderer->addPath(WARDER_SOURCE . '/Templates/' . $name . '/' . $app->get('language.default'), PriorityQueue::LOW - 25);
			$renderer->addPath(LUNA_SOURCE . '/Templates/' . $name, PriorityQueue::LOW - 25);
		}
		elseif ($this->luna->isAdmin())
		{
			// Extends
			$view['lunaExtends'] = $this->luna->get('admin.view.extends', '_global.html');
			$view['lunaPrefix'] = $this->luna->get('admin.language.prefix', 'warder.');
			$view['luna'] = $this->luna;

			// Paths
//			$renderer->addPath(WARDER_SOURCE_ADMIN . '/Templates/' . $name . '/' . $app->get('language.locale'), PriorityQueue::LOW - 25);
//			$renderer->addPath(WARDER_SOURCE_ADMIN . '/Templates/' . $name . '/' . $app->get('language.default'), PriorityQueue::LOW - 25);
			$renderer->addPath(LUNA_SOURCE_ADMIN . '/Templates/' . $name, PriorityQueue::LOW - 25);
		}
	}

	/**
	 * onLunaCommentModelPrepareGetQuery
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onLunaCommentModelPrepareGetQuery(Event $event)
	{
		if ($event['type'] == 'article')
		{
			/** @var CommentsModel $model */
			$model = $event['model'];

			$model->addTable('target', LunaTable::ARTICLES, 'target.id = comment.target_id');
		}
	}
}
