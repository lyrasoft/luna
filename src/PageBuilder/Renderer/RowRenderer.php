<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\PageBuilder;
use Lyrasoft\Luna\PageBuilder\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\StyleHelper;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Structure\Structure;

/**
 * The RowStyleRenderer class.
 *
 * @since  __DEPLOY_VERSION__
 */
class RowRenderer extends AbstractPageRenderer
{
    /**
     * render
     *
     * @param array $content
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareCSS(Structure $content)
    {
        $styles = new StyleContainer('#' . $content['options.html_id']);

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Title
        $this->prepareTitleCSS($options, $styles);

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
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareBasicCSS(Structure $options, StyleContainer $styles)
    {
        $styles->self()
            ->add('color', $options['text_color']);
    }

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareJS(Structure $content)
    {
    }
}
