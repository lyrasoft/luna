<?php

namespace Lyrasoft\Luna\PageBuilder\Addon\Button;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;

/**
 * The ButtonAddon class.
 *
 * @since  1.5.2
 */
class ButtonAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'button';
    }

    /**
     * @inheritDoc
     */
    public static function getIcon(): string
    {
        return 'fa fa-toggle-off';
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
    public static function loadVueComponent(AppContext $app): ?string
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function prepareCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->select('.c-button')
            ->add('border-radius', $options->getDeep('border_radius'), 'px');
    }

    /**
     * @inheritDoc
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
    }
}
