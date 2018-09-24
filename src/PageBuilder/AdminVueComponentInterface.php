<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder;

use Windwalker\Core\Asset\AssetManager;

/**
 * Interface AdminVueComponentInterface
 *
 * @since  __DEPLOY_VERSION__
 */
interface AdminVueComponentInterface
{
    /**
     * getVueComponentName
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function getVueComponentName();

    /**
     * loadVueComponent
     *
     * @param AssetManager $asset
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function loadVueComponent(AssetManager $asset);

    /**
     * getForm
     *
     * @param array $data
     *
     * @return string
     * @throws \ReflectionException
     */
    public static function getVueComponentTemplate(array $data = []);
}
