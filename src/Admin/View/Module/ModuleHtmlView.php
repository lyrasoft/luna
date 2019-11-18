<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Module;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Windwalker\Core\Frontend\Bootstrap;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Utilities\Queue\PriorityQueue;

/**
 * The ModuleHtmlView class.
 *
 * @since  1.0
 */
class ModuleHtmlView extends EditView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'module';

    /**
     * Property renderer.
     *
     * @var  string
     */
    protected $renderer = RendererHelper::EDGE;

    /**
     * Property formDefinition.
     *
     * @var  string
     */
    protected $formDefinition = 'edit';

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
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $this->prepareScripts();

        $data->type = $data->item->type ?: $data->state->get('module.type', $data->form->getField('type')->getValue());

        if ($data->type) {
            $data->form->getField('type')->setValue($data->type);
        }

        if (!$data->type) {
            $this->package->app->addMessage(
                __($this->langPrefix . 'module.edit.message.no.type'),
                Bootstrap::MSG_WARNING
            )
                ->redirect($this->router->route('modules'));
        }

        $data->moduleType = ModuleHelper::getModuleType($data->type);
        $data->module = $data->moduleType->createInstance($data->item);

        // Add layout path
        $this->addPath($data->module->getDir() . '/Templates', PriorityQueue::BELOW_NORMAL);

        $this->setTitle(
            Translator::sprintf(
                'phoenix.title.edit',
                __($this->langPrefix . $this->getName() . '.title')
            ) . ': ' . $data->moduleType->name
        );
    }

    /**
     * prepareDocument
     *
     * @return  void
     */
    protected function prepareScripts()
    {
        PhoenixScript::core();
        PhoenixScript::select2('.has-select2');
        PhoenixScript::validation();
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::buttonRadio();
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();
    }
}
