<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use ScssPhp\ScssPhp\Compiler;
use Windwalker\Core\Asset\AssetService;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Filesystem\FileObject;
use Windwalker\ORM\ORM;

use function Windwalker\fs;

/**
 * The PageBuilder class.
 *
 * @since  1.5.2
 */
class PageBuilder
{
    #[Inject]
    protected PageRendererFactory $rendererFactory;

    #[Inject]
    protected AssetService $asset;

    /**
     * PageBuilder constructor.
     */
    public function __construct(protected ORM $orm)
    {
    }

    public function prepareAssets(?string $html = null): void
    {
        $script = $this->rendererFactory->getScript();
        $script->wow();
        $script->animate();

        $this->asset->css('@luna/dist/page.css');

        if ($html !== null && str_contains($html, 'jarallax')) {
            $this->rendererFactory->getScript()->jarallax();
        }
    }

    /**
     * renderPage
     *
     * @param  array  $rows
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function renderPage(array $rows): string
    {
        $html = $this->renderLayout($rows);

        $this->prepareAssets($html);

        return $html;
    }

    public function renderByEntityAndCache(Page $page, bool $refresh = false): string
    {
        $cache = $this->getCacheFile($page->getId());

        if ($cache->isFile() && !$refresh) {
            return (string) $cache->read();
        }

        $html = $this->renderByEntity($page);

        $cache->write($html);

        return $html;
    }

    public function renderFrontend(Page $page): string
    {
        $html = $this->renderByEntityAndCache($page);

        $this->prepareAssets($html);

        return $html;
    }

    public function renderByEntity(Page $page): string
    {
        $customCSS = $page->getCss();

        $html = $this->renderLayout($page->getContent(), $customCSS);

        $this->prepareAssets($html);

        return $html;
    }

    public function renderLayout(array $rows, string $customCSS = ''): string
    {
        $this->rendererFactory->resetAssets();

        $html = [];

        $rowRenderer = $this->rendererFactory->createRenderer('row');

        foreach ($rows as $i => $row) {
            if ($row['disabled']) {
                continue;
            }

            $html[] = $rowRenderer->render($row, (string) $i);
        }

        $css = $this->getRenderedCSS();

        if (trim($customCSS)) {
            $scss = new Compiler();

            try {
                $customCSS = $scss->compileString($customCSS)->getCss();
            } catch (\Throwable) {
                //
            }

            $css = $customCSS . (WINDWALKER_DEBUG ? "\n\n" : ' ') . $css;
        }

        return "<style>$css</style>" . implode("\n", $html);
    }

    public function getRenderedCSS(): string
    {
        $styles = $this->rendererFactory->getAsset()->getInternalStyles();

        return implode("\n", $styles);
    }

    public function getCacheFile(int $id): FileObject
    {
        return fs(WINDWALKER_CACHE . '/renderer/pages/' . $id . '.data');
    }
}
