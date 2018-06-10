<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Categories;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\RendererHelper;

/**
 * The CategoriesHtmlView class.
 *
 * @since  1.0
 */
class CategoriesHtmlView extends GridView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'categories';

    /**
     * Property renderer.
     *
     * @var  string
     */
    protected $renderer = RendererHelper::EDGE;

    /**
     * The fields mapper.
     *
     * @var  array
     */
    protected $fields = [
        'pk' => 'id',
        'title' => 'title',
        'alias' => 'alias',
        'state' => 'state',
        'ordering' => 'ordering',
        'author' => 'created_by',
        'author_name' => 'user_name',
        'created' => 'created',
        'language' => 'language',
        'lang_title' => 'lang_title',
    ];

    /**
     * The grid config.
     *
     * @var  array
     */
    protected $gridConfig = [
        'order_column' => 'category.lft',
    ];

    /**
     * init
     *
     * @return  void
     */
    protected function init()
    {
        $this->langPrefix = LunaHelper::getLangPrefix();
    }

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $grid = $this->getGridHelper();

        $data->ordering = [];

        if ($grid->config->get('list.saveorder')) {
            foreach ($data->items as $i => $item) {
                $data->ordering[$item->parent_id][] = $item->id;
            }
        }

        $this->prepareScripts();
    }

    /**
     * prepareDocument
     *
     * @return  void
     */
    protected function prepareScripts()
    {
        PhoenixScript::core();
        PhoenixScript::grid();
        PhoenixScript::chosen('.hasChosen');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();

        \Phoenix\Script\JQueryScript::highlight('.hasHighlight', $this->data->state['input.search.content']);
    }

    /**
     * setTitle
     *
     * @param string $title
     *
     * @return  static
     */
    public function setTitle($title = null)
    {
        $type = $this->data->state->get('category.type');

        $title = Translator::sprintf(
            $this->langPrefix . 'category.manager.title',
            __($this->langPrefix . $type . '.title')
        );

        return parent::setTitle($title);
    }
}
