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
use Windwalker\Legacy\Structure\Structure;

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
     * @param array    $content
     * @param  string  $path
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content, string $path): string
    {
        $row = new Structure($content);

        if ($row['options.html_id'] === '') {
            $row['options.html_id'] = 'luna-' . $row['id'];
        }

        $this->prepareAssets($row);

        return $this->createRenderer()->render(
            'page.row',
            [
                'pageRenderer' => $this,
                'row' => $row,
                'path' => $path
            ]
        );
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

        $this->internalCSS($styles->render());

        // Custom CSS
        $css = $content['options.html_css'];

        if (trim($css)) {
            $scss = new Compiler();

            $css = $scss->compile("#{$content['options.html_id']} { {$content['options.html_css']} }");

            $this->internalCSS($css);
        }
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
            ->add('color', $options['text_color'])
            ->add('width', '100%');

        $this->handleContentAlign($options, $styles);

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

    /**
     * handleContentAlign
     *
     * @param Structure      $options
     * @param StyleContainer $styles
     *
     * @return  void
     *
     * @since  1.8.5
     */
    protected function handleContentAlign(Structure $options, StyleContainer $styles): void
    {
        switch ($options['valign']) {
            case 'middle':
                $styles->select($this->cssPrefix . '__container')->add('align-items', 'center');
                break;

            case 'bottom':
                $styles->select($this->cssPrefix . '__container')->add('align-items', 'end');
                break;
        }
    }
}
