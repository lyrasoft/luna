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
use Windwalker\Data\Collection;

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
    protected string $cssPrefix = '.l-section';

    /**
     * render
     *
     * @param  array   $content
     * @param  string  $path
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content, string $path): string
    {
        $row = new Collection($content);

        if ($row->getDeep('options.html_id') === '') {
            $row->setDeep('options.html_id', 'luna-' . $row['id']);
        }

        $this->prepareAssets($row);

        return $this->doRender(
            'page.row',
            [
                'pageRenderer' => $this,
                'row' => $row,
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
     * @since  1.5.2
     */
    protected function prepareCSS(Collection $content): void
    {
        $styles = new StyleContainer('#' . $content->getDeep('options.html_id'));

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Title
        $this->prepareTitleCSS($options, $styles);

        // Title & Subtitle
        $styles->select('.l-section__header')
            ->add('text-align', $options->getDeep('title_align'));

        // Background
        $this->prepareBackgroundCSS($options, $styles);

        $this->internalCSS($styles->render());

        // Custom CSS
        $css = (string) $content->getDeep('options.html_css');

        if (trim($css)) {
            $scss = new Compiler();

            $css = $scss->compileString(
                "#{$content->getDeep('options.html_id')} { {$content->getDeep('options.html_css')} }"
            )
                ->getCss();

            $this->internalCSS($css);
        }
    }

    /**
     * prepareBasicCSS
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareBasicCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->self()
            ->add('color', $options->getDeep('text_color'))
            ->add('width', '100%');

        $this->handleContentAlign($options, $styles);

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            static::addOffsets($style->self(), 'padding', $options->getDeep('padding.' . $size));
            static::addOffsets($style->self(), 'margin', $options->getDeep('margin.' . $size));
        });
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
     * handleContentAlign
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.8.5
     */
    protected function handleContentAlign(Collection $options, StyleContainer $styles): void
    {
        switch ($options->getDeep('valign')) {
            case 'middle':
                $styles->select($this->cssPrefix . '__container')->add('align-items', 'center');
                break;

            case 'bottom':
                $styles->select($this->cssPrefix . '__container')->add('align-items', 'end');
                break;
        }
    }
}
