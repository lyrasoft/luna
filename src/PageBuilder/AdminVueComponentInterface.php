<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use Windwalker\Core\Asset\AssetService;
use Windwalker\Renderer\CompositeRenderer;

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
    public static function getVueComponentName(): string;

    /**
     * loadVueComponent
     *
     * @param  \Windwalker\Core\Application\AppContext  $asset
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function loadVueComponent(\Windwalker\Core\Application\AppContext $app): void;

    /**
     * getVueComponentTemplate
     *
     * @param array $data
     *
     * @return string
     * @throws \ReflectionException
     */
    public static function getVueComponentTemplate(CompositeRenderer $renderer, array $data = []): string;
}
