<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use LogicException;
use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\PageService;
use Lyrasoft\Luna\Script\PageScript;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Asset\AssetService;

/**
 * The PageRendererFactory class.
 *
 * @since  1.5.2
 */
class PageRendererFactory
{
    /**
     * PageRendererFactory constructor.
     */
    public function __construct(
        protected ApplicationInterface $app,
        protected PageService $pageService,
        protected AssetService $asset,
    ) {
        $this->resetAssets();
    }

    /**
     * create
     *
     * @param  string  $type
     *
     * @return  PageRendererInterface
     *
     * @since  1.5.2
     */
    public function createRenderer(string $type): PageRendererInterface
    {
        $class = sprintf(__NAMESPACE__ . '\%sRenderer', ucfirst($type));

        return $this->app->make(
            $class,
            [
                static::class => $this,
                'factory' => $this,
            ]
        );
    }

    public function createAddonInstance(string $type, array $data): AbstractAddon
    {
        $addonType = $this->pageService->getAddonType($type);

        if (!$addonType) {
            throw new LogicException("Addon type: \"$type\" not exists.");
        }

        return $this->app->make(
            $addonType->getClassName(),
            [
                'data' => $data,
                static::class => $this,
                'factory' => $this,
            ]
        );
    }

    public function getScript(): PageScript
    {
        return $this->app->service(PageScript::class);
    }

    /**
     * @return AssetService
     */
    public function getAsset(): AssetService
    {
        return $this->asset;
    }

    /**
     * @return  void
     */
    public function resetAssets(): void
    {
        $this->asset = clone $this->asset;

        $this->asset->setStyles([]);
        $this->asset->setInternalStyles([]);
        $this->asset->setScripts([]);
        $this->asset->setInternalScripts([]);
    }
}
