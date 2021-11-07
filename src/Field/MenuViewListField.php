<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Services\MenuService;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Form\Field\ListField;

/**
 * The ViewListField class.
 */
class MenuViewListField extends ListField
{
    use TranslatorTrait;

    #[Inject]
    protected MenuService $menuService;

    /**
     * @inheritDoc
     */
    protected function prepareOptions(): array
    {
        $options = parent::prepareOptions();

        foreach ($this->menuService->getViews(true) as $group => $views) {
            /** @var AbstractMenuView $view */
            foreach ($views as $name => $view) {
                $g = $this->trans('luna.menu.group.' . $view::getGroup());
                $options[$g][] = static::createOption(
                    $view::getTitle($this->lang),
                    $view::getName()
                );
            }
        }

        return $options;
    }
}
