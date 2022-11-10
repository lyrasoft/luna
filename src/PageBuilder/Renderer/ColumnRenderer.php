<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Exception\SassException;
use Windwalker\Data\Collection;

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
    protected string $cssPrefix = '.l-column';

    /**
     * render
     *
     * @param  array  $content
     * @param  string  $path
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content, string $path): string
    {
        $col = new Collection($content);

        if ((string) $col->getDeep('options.html_id') === '') {
            $col->setDeep('options.html_id', 'luna-' . $col->getDeep('id'));
        }

        $this->prepareAssets($col);

        return $this->doRender(
            'page.column',
            [
                'pageRenderer' => $this,
                'col' => $col,
                'path' => $path,
            ]
        );
    }

    /**
     * prepareCSS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @throws SassException
     * @since  1.5.2
     */
    protected function prepareCSS(Collection $content): void
    {
        $styles = new StyleContainer('#' . $content->getDeep('options.html_id'));

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Background
        $this->prepareBackgroundCSS($options, $styles);

        $this->internalCSS($styles->render());

        // Custom CSS
        $css = (string) $content->getDeep('options.html_css');

        if (trim($css)) {
            $this->renderCustomCSS($content);
        }
    }

    /**
     * prepareJS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareJS(Collection $content): void
    {
    }

    /**
     * prepareElement
     *
     * @param  Collection  $options
     * @param  array       $classes
     * @param  array       $attrs
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
        $display = array_values($options->getDeep('display'));

        // B/C convert block to flex
        foreach ($display as &$class) {
            $class = str_replace('block', 'flex', $class);
        }

        unset($class);

        $classes = array_merge($classes, $display);

        parent::prepareElement($options, $classes, $attrs);
    }
}
