<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Admin\Repository\CommentsRepository;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Application\WebApplication;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Package\Resolver\DataMapperResolver;
use Windwalker\Core\Package\Resolver\FieldDefinitionResolver;
use Windwalker\Core\Package\Resolver\RecordResolver;
use Windwalker\Core\View\HtmlView;
use Windwalker\Data\Data;
use Windwalker\Event\Event;
use Windwalker\Renderer\AbstractRenderer;
use Windwalker\Utilities\Queue\PriorityQueue;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The LunaListener class.
 *
 * @since  1.0
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
        $this->luna = $luna ?: LunaHelper::getPackage();
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
        if ($this->luna->isEnabled()) {
            RecordResolver::addNamespace(
                ReflectionHelper::getNamespaceName($this->luna) . '/Admin/Record',
                PriorityQueue::LOW
            );

            DataMapperResolver::addNamespace(
                ReflectionHelper::getNamespaceName($this->luna) . '/Admin/DataMapper',
                PriorityQueue::LOW
            );

            FieldDefinitionResolver::addNamespace(
                ReflectionHelper::getNamespaceName($package) . '/Form',
                PriorityQueue::NORMAL + 1
            ); // TODO: Rewrite PriorityQueue of form fields
        }

        // Frontend
        if ($this->luna->isFrontend()) {
            $package->getMvcResolver()
                ->addNamespace(ReflectionHelper::getNamespaceName($this->luna), PriorityQueue::BELOW_NORMAL);

            FieldDefinitionResolver::addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '\Form');
        } elseif ($this->luna->isAdmin()) {
            $package->getMvcResolver()
                ->addNamespace(ReflectionHelper::getNamespaceName($this->luna) . '\Admin', PriorityQueue::BELOW_NORMAL);

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

        if (!$view instanceof HtmlView) {
            return;
        }

        /**
         * @var HtmlView         $view
         * @var AbstractRenderer $renderer
         */
        $name     = $view->getName();
        $renderer = $view->getRenderer();

        $app = $view->getPackage()->app;

        // Prepare View data
        if ($this->luna->isFrontend()) {
            // Extends
            $data                 = new Data();
            $data['extends']      = $this->luna->get('frontend.view.extends', '_global.html');
            $data['errorExtends'] = $this->luna->get('frontend.view.error_extends', $data['extends']);
            $data['langPrefix']   = $this->luna->getLangPrefix();
            $view['package']      = $this->luna;

            $view['luna'] = $data;

            // Paths
            $renderer->addPath(LUNA_SOURCE . '/Templates/' . strtolower($name), PriorityQueue::LOW - 25);
        } elseif ($this->luna->isAdmin()) {
            // Extends
            $data                 = new Data();
            $data['extends']      = $this->luna->get('admin.view.extends', '_global.admin.admin');
            $data['errorExtends'] = $this->luna->get('admin.view.error_extends', $data['extends']);
            $data['langPrefix']   = $this->luna->getLangPrefix();
            $view['package']      = $this->luna;

            $view['luna'] = $data;

            // Paths
            $renderer->addPath(LUNA_SOURCE_ADMIN . '/Templates/' . strtolower($name), PriorityQueue::LOW - 25);
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
        if ($event['type'] === 'article') {
            /** @var CommentsRepository $repository */
            $repository = $event['model'];

            $repository->addTable('target', LunaTable::ARTICLES, 'target.id = comment.target_id');
        }
    }
}
