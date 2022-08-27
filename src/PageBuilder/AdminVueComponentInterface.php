<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder;

use ReflectionException;
use Windwalker\Core\Application\AppContext;
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
     * @param  AppContext  $app
     *
     * @return  string|null
     *
     * @since  1.5.2
     */
    public static function loadVueComponent(AppContext $app): ?string;

    /**
     * getVueComponentTemplate
     *
     * @param  CompositeRenderer  $renderer
     * @param  array              $data
     *
     * @return string
     * @throws ReflectionException
     */
    public static function getVueComponentTemplate(CompositeRenderer $renderer, array $data = []): string;
}
