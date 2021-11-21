<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Windwalker\Core\Asset\AssetService;
use Windwalker\DI\Attributes\Inject;
use Windwalker\ORM\ORM;

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
        $script = $this->rendererFactory->getScript();
        $script->wow();
        $script->animate();

        $this->asset->css('@luna/dist/page.css');

        $html = [];

        $rowRenderer = $this->rendererFactory->createRenderer('row');

        foreach ($rows as $i => $row) {
            if ($row['disabled']) {
                continue;
            }

            $html[] = $rowRenderer->render($row, (string) $i);
        }

        return implode("\n", $html);
    }
}
