<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Phoenix\View\ItemView;

/**
 * The ContactHtmlView class.
 *
 * @since  1.0
 */
class ContactHtmlView extends EditView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Contact';

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
     * Property contactFields.
     *
     * @var  array
     */
    protected $contactFields = ['subject', 'email', 'name', 'url', 'phone'];

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
     * @see  ItemView
     * ------------------------------------------------------
     * @var                         $data ->state  \Windwalker\Registry\Registry
     * @var                         $data ->item   \Luna\Record\ContactRecord
     *
     * @see  EditView
     * ------------------------------------------------------
     * @var                         $data ->form   \Windwalker\Form\Form
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        // Check fields exists
        foreach ($this->contactFields as $field) {
            if (!$data->item->hasField($field)) {
                $data->form->removeField($field);
            }
        }

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
        PhoenixScript::chosen('select.hasChosen');
        PhoenixScript::formValidation();
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::buttonRadio();
        BootstrapScript::tooltip();
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
