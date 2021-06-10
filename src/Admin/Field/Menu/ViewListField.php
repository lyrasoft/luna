<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Admin\Field\Menu;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuService;
use Windwalker\Legacy\Form\Field\ListField;
use Windwalker\Legacy\Html\Option;
use Windwalker\Legacy\Ioc;

/**
 * The ViewListField class.
 *
 * @since  1.7
 */
class ViewListField extends ListField
{
    /**
     * prepareOptions
     *
     * @return  array|Option[]
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareOptions()
    {
        $menuService = Ioc::service(MenuService::class);

        $options = [];

        foreach ($menuService->getViews(true) as $group => $views) {
            /** @var AbstractMenuView $view */
            foreach ($views as $name => $view) {
                $options[__('luna.menu.group.' . $view::getGroup())][] = new Option(
                    $view::getTitle(),
                    $view::getName()
                );
            }
        }

        return $options;
    }
}
