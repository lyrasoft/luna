<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Style\StyleRules;
use Lyrasoft\Luna\PageBuilder\StyleHelper;
use Windwalker\Core\Widget\WidgetHelper;
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
            'builder' => $this,
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
        $styles->self()
            ->add('color', $options['text_color']);

        // Title
        $styles->select('.c-section-title')
            ->add('color', $options['title.color'])
            ->add('font-weight', $options['title.font_weight']);

        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select('.c-section-title')
                ->add('font-size', $options['title.font_size.' . $size], 'px')
                ->add('margin-top', $options['title.margin_top.' . $size], 'px')
                ->add('margin-bottom', $options['title.margin_bottom.' . $size], 'px');
        });

        // Subtitle
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            $style->select('.c-section-subtitle')
                ->add('font-size', $options['title.font_size.' . $size], 'px');
        });

        // Title & Subtitle
        $styles->select('.l-section__header')
            ->add('text-align', $options['title_align']);

        // Padding & Margin
        $styles->rwd(function (StyleContainer $style, $size) use ($options) {
            StyleHelper::addOffsets($style->self(), 'padding', $options['padding.' . $size]);
            StyleHelper::addOffsets($style->self(), 'margin', $options['margin.' . $size]);
        });

        // Background
        $self = $styles->self();

        if ($options['background.overlay'] !== '') {
            $styles->select('.l-bg-overlay')
                ->add('background-color', $options['background.overlay']);
        }

        switch ($options['background.type']) {
            case 'color':
                $self->add('background-color', $options['background.color']);
                break;

            case 'image':
                if ($options['background.image.url'] !== '') {
                    $self->add('background-image', sprintf('url(%s)', $options['background.image.url']));
                }

                $self->add('background-size', $options['background.image.size']);
                $self->add('background-position', $options['background.image.position']);
                $self->add('background-repeat', $options['background.image.repeat']);
                $self->add('background-attachment', $options['background.image.attachment']);
                break;

            case 'gradient':
                if ($options['background.gradient.type'] === 'linear') {
                    $self->add('background-image', sprintf(
                        'linear-gradient(%sdeg, %s %s%%, %s %s%%)',
                        $options['background.gradient.angle'],
                        $options['background.gradient.start_color'],
                        $options['background.gradient.start_pos'],
                        $options['background.gradient.end_color'],
                        $options['background.gradient.end_pos']
                    ));
                } else {
                    $self->add('background-image', sprintf(
                        'radial-gradient(%s %s%%, %s %s%%)',
                        $options['background.gradient.start_color'],
                        $options['background.gradient.start_pos'],
                        $options['background.gradient.end_color'],
                        $options['background.gradient.end_pos']
                    ));
                }
                break;

            case 'video':

                break;
        }
        
        show($styles->render());

        $this->asset->internalCSS($styles->render());
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
