<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Pages;

use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Phoenix\View\ListView;

/**
 * The PagesHtmlView class.
 *
 * @since  1.0
 */
class PagesHtmlView extends GridView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Pages';

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
        'order_column' => 'page.ordering'
    ];

    /**
     * Property simplePagination.
     *
     * @var  boolean
     */
    protected $simplePagination = false;

    /**
     * Property langPrefix.
     *
     * @var  string
     */
    protected $langPrefix = 'luna.';

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

        $this->prepareScripts();
        $this->prepareMetadata();
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
        PhoenixScript::select2('select.has-select2');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();
    }

    /**
     * prepareMetadata
     *
     * @return  void
     */
    protected function prepareMetadata()
    {
        $this->setTitle();
    }
}
