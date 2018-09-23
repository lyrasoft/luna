<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Windwalker\Core\Asset\AssetManager;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Structure\Structure;

/**
 * The AbstractPageRenderer class.
 *
 * @since  __DEPLOY_VERSION__
 */
abstract class AbstractPageRenderer implements PageRendererInterface
{
    /**
     * Property asset.
     *
     * @Inject()
     *
     * @var AssetManager
     */
    protected $asset;

    /**
     * prepareAssets
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareAssets(Structure $content)
    {
        $this->prepareCSS($content);
        $this->prepareJS($content);
    }

    /**
     * prepareCSS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function prepareCSS(Structure $content);

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function prepareJS(Structure $content);
}
