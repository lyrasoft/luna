<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Structure\Structure;

/**
 * The RowStyleRenderer class.
 *
 * @since  1.5.2
 */
class ColumnRenderer extends AbstractPageRenderer
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected $cssPrefix = '.l-column';

    /**
     * render
     *
     * @param array $content
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content)
    {
        $col = new Structure($content);

        if ((string) $col['options.html_id'] === '') {
            $col['options.html_id'] = 'luna-' . $col['id'];
        }

        $this->prepareAssets($col);

        return WidgetHelper::render('page.column', [
            'pageRenderer' => $this,
            'col' => $col
        ], 'edge');
    }

    /**
     * prepareCSS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareCSS(Structure $content)
    {
        $styles = new StyleContainer('#' . $content['options.html_id']);

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Background
        $this->prepareBackgroundCSS($options, $styles);

        $this->asset->internalCSS($styles->render());
    }

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareJS(Structure $content)
    {
    }

    /**
     * prepareElement
     *
     * @param Structure $options
     * @param array     $classes
     * @param array     $attrs
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function prepareElement(Structure $options, array &$classes, array &$attrs)
    {
        $classes = array_merge($classes, array_values($options['display']));

        parent::prepareElement($options, $classes, $attrs);
    }
}
