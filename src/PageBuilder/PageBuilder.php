<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Legacy\Core\Asset\AssetManager;
use Windwalker\Legacy\Core\Package\PackageHelper;
use Windwalker\Legacy\DI\Annotation\Inject;

/**
 * The PageBuilder class.
 *
 * @since  1.5.2
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
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     * @since  1.5.2
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
            if ($row['disabled']) {
                continue;
            }

            $html[] = $rowRenderer->render($row);
        }

        return implode("\n", $html);
    }
}
