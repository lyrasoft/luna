<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Addon\Image;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;

/**
 * The ImageAddon class.
 *
 * @since  1.5.2
 */
class ImageAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'image';
    }

    /**
     * @inheritDoc
     */
    public static function getIcon(): string
    {
        return 'fa fa-image';
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
        $styles->select('.c-image')
            ->add('border-radius', $options->getDeep('border_radius'), 'px');
    }

    /**
     * @inheritDoc
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
    }
}
