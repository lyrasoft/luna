<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Languages;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Legacy\Core\Renderer\RendererHelper;

/**
 * The LanguagesHtmlView class.
 *
 * @since  1.0
 */
class LanguagesHtmlView extends GridView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'languages';

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
        'order_column' => 'language.ordering',
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
     * @param \Windwalker\Legacy\Data\Data $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

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
        PhoenixScript::select2('.has-select2');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();

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
        return parent::setTitle($title);
    }
}
