<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Text;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\Script\EditorScript;
use Phoenix\Script\PhoenixScript;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\Data\DataInterface;

/**
 * The TextAddon class.
 *
 * @since  __DEPLOY_VERSION__
 */
class TextAddon extends AbstractAddon
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected static $type = 'text';

    /**
     * Property icon.
     *
     * @var string
     */
    protected static $icon = 'fa fa-font';

    /**
     * prepareData
     *
     * @param DataInterface $data
     *
     * @return  void
     */
    protected function prepareData(DataInterface $data)
    {
        //
    }

    /**
     * loadVueComponent
     *
     * @param AssetManager $asset
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function loadVueComponent(AssetManager $asset)
    {
        // Vue component loaded from core
        EditorScript::tinymce();

        $uploadUrl = LunaHelper::getPackage()
            ->getCurrentPackage()->router->route('_luna_img_upload');

        PhoenixScript::addRoute('addon-text:image-upload-url', $uploadUrl);
    }
}
