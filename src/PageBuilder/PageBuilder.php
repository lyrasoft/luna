<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\RowRenderer;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Asset\AssetManager;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\DI\Annotation\Inject;

/**
 * The PageBuilder class.
 *
 * @since  __DEPLOY_VERSION__
 */
class PageBuilder
{
    /**
     * Property rendererFactory.
     *
     * @Inject()
     *
     * @var PageRendererFactory
     */
    protected $rendererFactory;

    /**
     * Property asset.
     *
     * @Inject()
     *
     * @var AssetManager
     */
    protected $asset;

    /**
     * renderPage
     *
     * @param array $rows
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function renderPage(array $rows)
    {
        LunaScript::wow();
        LunaScript::animate();

        $this->asset->addCSS(
            PackageHelper::getAlias(LunaPackage::class) . '/css/page/page.min.css'
        );

        $html = [];

        $rowRenderer = $this->rendererFactory->create('row');

        foreach ($rows as $row) {
            $html[] = $rowRenderer->render($row, $this);
        }

        return implode("\n", $html);
    }
}
