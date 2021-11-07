<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Services\MenuService;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Form\Field\ListField;

/**
 * The TypeListField class.
 */
class MenuTypeListField extends ListField
{
    #[Inject]
    protected MenuService $menuService;

    protected function prepareOptions(): array
    {
        $options = parent::prepareOptions();

        $types = $this->menuService->getMenuTypes();

        foreach ($types as $type) {
            $options[] = static::createOption($type['name'], $type['type']);
        }

        $values = (array) ($this->getValue() ?: []);

        foreach ($values as $value) {
            if (!isset($types[$value])) {
                $options[] = static::createOption($value, $value);
            }
        }

        return $options;
    }
}
