<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Menus;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Phoenix\View\ListView;
use Windwalker\Core\Language\Translator;
use Windwalker\Data\Data;

/**
 * The MenusHtmlView class.
 *
 * @since  1.0
 */
class MenusHtmlView extends GridView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Menus';

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
        'lang_title' => 'lang_title'
    ];

    /**
     * The grid config.
     *
     * @var  array
     */
    protected $gridConfig = [
        'order_column' => 'menu.lft'
    ];

    /**
     * Property simplePagination.
     *
     * @var  boolean
     */
    protected $simplePagination = false;



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
     * @param \Windwalker\Data\Data                 $data
     *
     * @see ListView
     * ------------------------------------------------------
     * @var  \Windwalker\Structure\Structure        $data ->state
     * @var  \Windwalker\Data\DataSet               $data ->items
     * @var  \Windwalker\Core\Pagination\Pagination $data ->pagination
     * @var  int                                    $data ->total
     * @var  int                                    $data ->limit
     * @var  int                                    $data ->start
     * @var  int                                    $data ->page
     *
     * @see GridView
     * ------------------------------------------------------
     * @var  \Windwalker\Form\Form                  $data ->filterForm
     * @var  \Windwalker\Form\Form                  $data ->batchForm
     * @var  \Windwalker\Core\Widget\Widget         $data ->filterBar
     * @var  boolean                                $data ->showFilterBar
     * @var  \Phoenix\View\Helper\GridHelper        $data ->grid
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

        $this->prepareScripts($data);
        $this->prepareMetadata($data);
    }

    /**
     * prepareScripts
     *
     * @param Data $data
     *
     * @return  void
     */
    protected function prepareScripts(Data $data)
    {
        PhoenixScript::core();
        PhoenixScript::grid();
        PhoenixScript::select2('select.has-select2');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();

        JQueryScript::highlight('.searchable', $this->data->state['input.search.content']);
    }

    /**
     * prepareMetadata
     *
     * @param Data $data
     *
     * @return  void
     */
    protected function prepareMetadata(Data $data)
    {
        $type = $data->type;

        $title = Translator::sprintf(
            $this->langPrefix . 'menu.manager.title',
            __($this->langPrefix . $type . '.title')
        );

        $this->setTitle($title);
    }
}
