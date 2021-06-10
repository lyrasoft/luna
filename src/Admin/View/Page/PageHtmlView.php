<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Page;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\AddonHelper;
use Lyrasoft\Luna\PageBuilder\AddonType;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Phoenix\View\ItemView;
use Windwalker\Legacy\Core\Asset\Asset;
use Windwalker\Legacy\Core\Asset\AssetManager;
use Windwalker\Legacy\Core\Package\PackageHelper;
use Windwalker\Legacy\Data\Data;

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
     * Property langPrefix.
     *
     * @var  string
     */
    protected $langPrefix = 'luna.';

    /**
     * prepareData
     *
     * @param \Windwalker\Legacy\Data\Data           $data
     *
     * @see  ItemView
     * ------------------------------------------------------
     * @var  \Windwalker\Legacy\Structure\Structure  $data ->state
     * @var  \Lyrasoft\Luna\Admin\Record\PageRecord $data ->item
     *
     * @see  EditView
     * ------------------------------------------------------
     * @var    \Windwalker\Legacy\Form\Form          $data ->form
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);
        
        $data->addonTypes = AddonHelper::getAddonTypes();

        $this->prepareScripts($data);
        $this->prepareMetadata();
    }

    /**
     * prepareDocument
     *
     * @param Data $data
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
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

        $luna = LunaHelper::getPackage();

        JQueryScript::csrfToken();
        PhoenixScript::addRoute('page_ajax', $this->router->route('_luna_ajax_page'));
        PhoenixScript::addRoute('single_image_upload', $this->router->route('_luna_img_upload'));
        PhoenixScript::addRoute('loading_image', Asset::path(
            PackageHelper::getAlias(LunaPackage::class) . '/images/ring-loading.gif'
        ));

        PhoenixScript::data('builder-content', json_decode($data->item->content, true) ?: []);
        PhoenixScript::data('css', $data->item->css);
        PhoenixScript::data('tinymce_content_css', Asset::root() . '/' . $luna->name . '/css/tinymce5/content.css');

        $asset = $this->app->service(AssetManager::class);
        $asset->addJS(PackageHelper::getAlias(LunaPackage::class) . '/js/page-builder/addon-mixin.min.js');

        /** @var AddonType $addonType */
        foreach ($data->addonTypes as $addonType) {
            $class = $addonType->class;

            $class::loadVueComponent($asset);

            PhoenixScript::data('addons', [$addonType->type => $addonType], true);
        }

        PhoenixScript::data('asset:locale', str_replace('-', '_', Locale::getLocale()));
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
