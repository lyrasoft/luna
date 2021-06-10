<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Contacts;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\CoreScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Phoenix\View\ListView;
use Windwalker\Legacy\Core\Asset\Asset;

/**
 * The ContactsHtmlView class.
 *
 * @since  1.0
 */
class ContactsHtmlView extends GridView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Contacts';

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
        'order_column' => 'contact.ordering',
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
     * @param \Windwalker\Legacy\Data\Data $data
     *
     * @see ListView
     * ------------------------------------------------------
     * @var                         $data ->state          \Windwalker\Legacy\Registry\Registry
     * @var                         $data ->items          \Windwalker\Legacy\Data\DataSet
     * @var                         $data ->pagination     \Windwalker\Legacy\Core\Pagination\Pagination
     * @var                         $data ->total          integer
     * @var                         $data ->limit          integer
     * @var                         $data ->start          integer
     * @var                         $data ->page           integer
     *
     * @see GridView
     * ------------------------------------------------------
     * @var                         $data ->filterForm     \Windwalker\Legacy\Form\Form
     * @var                         $data ->batchForm      \Windwalker\Legacy\Form\Form
     * @var                         $data ->filterBar      \Windwalker\Legacy\Core\Widget\Widget
     * @var                         $data ->showFilterBar  boolean
     * @var                         $data ->grid           \Phoenix\View\Helper\GridHelper
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $data->entity = $this->repository->getRecord('Contact');

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
        PhoenixScript::chosen('select.has-select2');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();

        // Preview
        PhoenixScript::ajax();
        CoreScript::simpleUri();
        PhoenixScript::addRoute('contact_preview', $this->router->to('contact_preview')->addVar('format', 'json'));
        PhoenixScript::addRoute('contact_edit', $this->router->to('contact'));
        Asset::addJS(LunaHelper::getPackage()->getName() . '/js/cmf/contacts.min.js');

        foreach ($this->data->entity as $key => $value) {
            PhoenixScript::translate(LunaHelper::getLangPrefix() . '.contact.field.' . $key);
        }
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
