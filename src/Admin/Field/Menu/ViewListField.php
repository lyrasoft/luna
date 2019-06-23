<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\Field\Menu;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuService;
use Windwalker\Form\Field\ListField;
use Windwalker\Html\Option;
use Windwalker\Ioc;

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
