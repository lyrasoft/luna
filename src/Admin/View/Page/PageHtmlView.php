<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Page;

use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Phoenix\View\ItemView;
use Windwalker\Data\Data;

/**
 * The PageHtmlView class.
 *
 * @since  1.0
 */
class PageHtmlView extends EditView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Page';

    /**
     * Property formDefinition.
     *
     * @var  string
     */
    protected $formDefinition = 'Edit';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * Property formLoadData.
     *
     * @var  boolean
     */
    protected $formLoadData = true;

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data            $data
     *
     * @see  ItemView
     * ------------------------------------------------------
     * @var  \WindWalker\Structure\Structure   $data ->state
     * @var  \Lyrasoft\Luna\Record\PageRecord $data ->item
     *
     * @see  EditView
     * ------------------------------------------------------
     * @var    \Windwalker\Form\Form           $data ->form
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $this->prepareScripts($data);
        $this->prepareMetadata();
    }

    /**
     * prepareDocument
     *
     * @param Data $data
     *
     * @return  void
     */
    protected function prepareScripts(Data $data)
    {
        PhoenixScript::core();
        PhoenixScript::select2('select.has-select2');
        PhoenixScript::validation();
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::buttonRadio();
        BootstrapScript::tooltip('.has-tooltip');

        PhoenixScript::data('builder-content', json_decode($data->item->content, true) ?: []);
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
