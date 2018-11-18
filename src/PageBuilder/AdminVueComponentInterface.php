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
 * @since  1.5.2
 */
interface AdminVueComponentInterface
{
    /**
     * getVueComponentName
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public static function getVueComponentName();

    /**
     * loadVueComponent
     *
     * @param AssetManager $asset
     *
     * @return  void
     *
     * @since  1.5.2
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
