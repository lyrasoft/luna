<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
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
     * getLayout
     *
     * @param array $variables
     * @param array $params
     *
     * @return  string
     *
     * @since  1.7
     */
    abstract protected function getLayout(array $variables, array $params): string;

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
