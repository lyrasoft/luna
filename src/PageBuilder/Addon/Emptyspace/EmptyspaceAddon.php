<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Addon\Emptyspace;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;

/**
 * The EmptyspaceAddon class.
 *
 * @since  1.5.2
 */
class EmptyspaceAddon extends AbstractAddon implements HasOwnStyleInterface
{
    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'emptyspace';
    }

    /**
     * @inheritDoc
     */
    public static function getIcon(): string
    {
        return 'far fa-square';
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
    public static function loadVueComponent(AppContext $app): void
    {
    }

    /**
     * @inheritDoc
     */
    public function prepareCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->rwd(function (StyleContainer $styles, $size) use ($options) {
            $styles->select('.c-empty-space')
                ->add('height', $options->getDeep('height.' . $size), 'px');
        });
    }

    /**
     * @inheritDoc
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
    }
}
