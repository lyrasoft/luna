<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu;

use Windwalker\Core\Widget\WidgetHelper;

/**
 * The SelfRenderMenuTrait class.
 *
 * @since  1.7
 */
trait SelfRenderMenuTrait
{
    /**
     * render
     *
     * @param MenuNode $menu
     * @param array    $variables
     * @param array    $params
     *
     * @return  string
     *
     * @since  1.7
     */
    public function render(MenuNode $menu, array $variables, array $params): string
    {
        $viewInstance = $this;

        return WidgetHelper::render(
            $this->getLayout($variables, $params),
            compact('variables', 'params', 'menu', 'viewInstance'),
            'edge'
        );
    }
}
