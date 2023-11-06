<?php

namespace Lyrasoft\Luna\PageBuilder\Addon\Text;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Psr\Cache\InvalidArgumentException;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;

/**
 * The TextAddon class.
 *
 * @since  1.5.2
 */
class TextAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * @inheritDoc
     */
    public static function getIcon(): string
    {
        return 'fa fa-font';
    }

    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'text';
    }

    /**
     * prepareData
     *
     * @param  Collection  $data
     *
     * @return  void
     */
    protected function prepareData(Collection $data): void
    {
        //
    }

    /**
     * prepareCSS
     *
     * @param  Collection      $options
     * @param  StyleContainer  $styles
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
            $styles->select('.c-addon__content-text')
                ->add('font-size', $options->getDeep('content_font_size.' . $size), 'px')
                ->add('line-height', $options->getDeep('content_line_height.' . $size), 'px');
        });
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
        //
    }

    /**
     * loadVueComponent
     *
     * @param  AppContext  $app
     *
     * @return  string|null
     *
     * @throws InvalidArgumentException
     * @since  1.5.2
     */
    public static function loadVueComponent(AppContext $app): ?string
    {
        return null;
    }
}
