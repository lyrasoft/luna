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
class RowRenderer extends AbstractPageRenderer
{
    /**
     * Property type.
     *
     * @var  string
     */
    protected $cssPrefix = '.l-section';

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
        $row = new Structure($content);

        if ($row['options.html_id'] === '') {
            $row['options.html_id'] = 'luna-' . $row['id'];
        }

        $this->prepareAssets($row);

        return WidgetHelper::render('page.row', [
            'pageRenderer' => $this,
            'row' => $row
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

        // Title
        $this->prepareTitleCSS($options, $styles);

        // Title & Subtitle
        $styles->select('.l-section__header')
            ->add('text-align', $options['title_align']);

        // Background
        $this->prepareBackgroundCSS($options, $styles);

        $this->asset->internalCSS($styles->render());
    }

    /**
     * prepareBasicCSS
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareBasicCSS(Structure $options, StyleContainer $styles)
    {
        $styles->self()
            ->add('color', $options['text_color']);

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            static::addOffsets($style->self(), 'padding', $options['padding.' . $size]);
            static::addOffsets($style->self(), 'margin', $options['margin.' . $size]);
        });
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
}
