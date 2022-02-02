<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget;

use Windwalker\Core\Application\ApplicationInterface;

/**
 * The WidgetService class.
 */
class WidgetService
{
    public function __construct(protected ApplicationInterface $app)
    {
    }

    /**
     * getWidgetTypes
     *
     * @return  array<AbstractWidget>
     */
    public function getWidgetTypes(): array
    {
        $typeClasses = $this->app->config('widget.types') ?? [];

        $types = [];

        /** @var AbstractWidget $typeClass */
        foreach ($typeClasses as $typeName => $typeClass) {
            if ($typeClass && is_subclass_of($typeClass, AbstractWidget::class, true)) {
                $types[$typeName] = $typeClass;
            }
        }

        return $types;
    }
}
