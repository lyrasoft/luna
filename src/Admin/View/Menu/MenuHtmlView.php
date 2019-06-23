<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Menu;

use Lyrasoft\Luna\Menu\MenuService;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Phoenix\View\ItemView;
use Windwalker\Data\Data;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Form\Form;

/**
 * The MenuHtmlView class.
 *
 * @since  1.0
 */
class MenuHtmlView extends EditView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Menu';

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
     * Property menuService.
     *
     * @Inject()
     *
     * @var MenuService
     */
    protected $menuService;

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data $data
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @see  ItemView
     * ------------------------------------------------------
     * @see  EditView
     * ------------------------------------------------------
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $type = $data->type;

        /** @var Form $form */
        $form = $data->form;

        $form->getField('type')->setValue($type);

        $data->viewInstance = $viewInstance = $this->menuService->getViewInstance(
            $form->getField('view')->getValue() ?: $data->item->view
        );

        if ($viewInstance) {
            $form->defineFormFields($viewInstance);
            $form->bind(['variables' => $data->item->variables]);
            $form->bind(['params' => $data->item->params]);

            $data->tabs = $data->viewInstance->getTabs();
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
        PhoenixScript::select2('select.has-select2');
        PhoenixScript::validation();
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::buttonRadio();
        BootstrapScript::tooltip('.has-tooltip');
        PhoenixScript::disableWhenSubmit();
        PhoenixScript::keepAlive($this->package->app->uri->root);
        BootstrapScript::tabState();
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
        $this->setTitle();
    }
}
