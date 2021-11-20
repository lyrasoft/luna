<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Addon\Feature;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\AbstractPageRenderer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Data\Collection;

/**
 * The FeatureAddon class.
 *
 * @since  1.5.2
 */
class FeatureAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'feature';
    }

    /**
     * @inheritDoc
     */
    public static function getIcon(): string
    {
        return 'fa fa-rocket';
    }

    /**
     * @inheritDoc
     */
    protected function prepareData(Collection $data): void
    {
        
    }

    /**
     * @inheritDoc
     */
    public static function loadVueComponent(\Windwalker\Core\Application\AppContext $app): void
    {
    }

    /**
     * @inheritDoc
     */
    public function prepareCSS(Collection $options, StyleContainer $styles): void
    {
        if ($options->getDeep('layout_type') === 'icon') {
            $styles->select('.c-feature-icon__wrapper')
                ->add('border-color', $options->getDeep('icon.border.color'))
                ->add('border-style', $options->getDeep('icon.border.style'))
                ->add('color', $options->getDeep('icon.color'))
                ->add('background-color', $options->getDeep('icon.bg_color'));

            $styles->select('.c-feature-icon__wrapper')
                ->add('border-color', $options->getDeep('icon.border.color'))
                ->add('border-style', $options->getDeep('icon.border.style'));

            $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
                $styles->select('.c-feature-icon__wrapper')
                    ->add('border-width', $options->getDeep('icon.border.width.' . $size), 'px')
                    ->add('border-radius', $options->getDeep('icon.border.radius.' . $size), 'px')
                    ->add('margin-top', $options->getDeep('icon.margin_top.' . $size), 'px')
                    ->add('margin-bottom', $options->getDeep('icon.margin_bottom.' . $size), 'px');

                AbstractPageRenderer::addOffsets(
                    $styles->select('.c-feature-icon__wrapper'),
                    'padding',
                    $options->getDeep('icon.padding.' . $size)
                );

                $styles->select('.c-feature-icon__wrapper > span')
                    ->add('font-size', $options->getDeep('icon.font_size.' . $size), 'px')
                    ->add('width', $options->getDeep('icon.font_size.' . $size), 'px')
                    ->add('height', $options->getDeep('icon.font_size.' . $size), 'px')
                    ->add('line-height', $options->getDeep('icon.font_size.' . $size), 'px');
            });
        }

        $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
            $styles->select('.c-addon__content-text')
                ->add('font-size', $options->getDeep('content_font_size.' . $size), 'px')
                ->add('line-height', $options->getDeep('content_line_height.' . $size), 'px');
        });
    }

    /**
     * @inheritDoc
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
    }
}
