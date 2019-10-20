<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Config;

use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Phoenix\View\ItemView;

/**
 * The ConfigHtmlView class.
 *
 * @since  1.0
 */
class ConfigHtmlView extends EditView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Config';

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
     * Property langPrefix.
     *
     * @var  string
     */
    protected $langPrefix = 'luna.';

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data            $data
     *
     * @see  ItemView
     * ------------------------------------------------------
     * @var  \WindWalker\Structure\Structure   $data ->state
     * @var  \Lyrasoft\Luna\Admin\Record\ConfigRecord $data ->item
     *
     * @see  EditView
     * ------------------------------------------------------
     * @var    \Windwalker\Form\Form           $data ->form
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        $this->formDefinition = $data->type;

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
        PhoenixScript::select2('select.has-select2');
        PhoenixScript::validation();
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::buttonRadio();
        BootstrapScript::tooltip('.has-tooltip');
        PhoenixScript::disableWhenSubmit();
    }

    /**
     * prepareMetadata
     *
     * @return  void
     */
    protected function prepareMetadata()
    {
        $this->setTitle(
            __(
                $this->langPrefix . 'config.edit.title',
                __($this->langPrefix . 'config.type.' . $this->getData()->type)
            )
        );
    }
}
