<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\View\View;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Cache\InstanceCacheTrait;
use Windwalker\Utilities\Wrapper\RawWrapper;

use function Windwalker\raw;

/**
 * The WidgetService class.
 */
class WidgetService
{
    use InstanceCacheTrait;
    use TranslatorTrait;

    /**
     * Property colors.
     *
     * @var  array
     */
    protected $colors = [
        '#00acac',
        '#3e2723',
        '#3f51b5',
        '#3f51b5',
        '#4a148c',
        '#004d40',
        '#4db6ac',
        '#4e342e',
        '#5d4037',
        '#6a1b9a',
        '#7e57c2',
        '#8d6e63',
        '#8e24aa',
        '#9c27b0',
        '#9fa8da',
        '#348fe2',
        '#454b6d',
        '#455a64',
        '#512da8',
        '#607d8b',
        '#673ab7',
        '#00695c',
        '#880e4f',
        '#00897b',
        '#2196f3',
        '#006767',
        '#7266ba',
        '#009688',
        '#15395a',
        '#37474f',
        '#78909c',
        '#263238',
        '#283593',
        '#795548',
        '#993734',
        '#ad1457',
        '#b71c1c',
        '#ba68c8',
        '#e08f18',
        '#e91e63',
        '#e65100',
        '#f44336',
        '#fb6d9d',
        '#ff5252',
        '#ff9800',
        '#ff9800',
        '#ffcc80',
    ];

    public function __construct(
        protected ApplicationInterface $app,
        protected ORM $orm,
    ) {
    }

    /**
     * getWidgets
     *
     * @param  string  $position
     *
     * @return  array<AbstractWidget>
     */
    public function loadWidgets(string $position): array
    {
        return $this->once(
            'widgets.in.' . $position,
            function () use ($position) {
                $items = $this->orm->select()
                    ->from(Widget::class)
                    ->where('position', $position)
                    ->order('ordering', 'ASC')
                    ->getIterator(Widget::class);

                $widgets = [];

                /** @var Widget $item */
                foreach ($items as $item) {
                    $instance = $this->createWidgetInstance($item->getType(), $item);

                    if ($instance) {
                        $widgets[] = $instance;
                    }
                }

                return $widgets;
            }
        );
    }

    public function hasWidgets(...$positions): bool
    {
        foreach ($positions as $position) {
            $widgets = $this->loadWidgets($position);

            if (count($widgets) > 0) {
                return true;
            }
        }

        return false;
    }

    public function getAllPositions(): array
    {
        return $this->once(
            'positions',
            function () {
                // DB
                $items = $this->orm->select(raw('DISTINCT position'))
                    ->from(Widget::class)
                    ->where('position', '!=', '')
                    ->loadColumn();

                // Config
                $items = $items->merge($this->app->config('widget.positions'));
                $items = $items->sortKeys();

                $positions = [];

                foreach ($items as $key => $value) {
                    if (is_numeric($key)) {
                        $positions[$value] = $this->getPositionName($value);
                    } else {
                        $positions[$key] = $this->getPositionName($value);
                    }
                }

                return $positions;
            }
        );
    }

    protected function getPositionName(string|RawWrapper $position): string
    {
        if ($position instanceof RawWrapper) {
            return $position();
        }

        if ($this->lang->has($position)) {
            return $this->trans($position);
        }

        $lang = 'luna.widget.position.' . $position;

        if ($this->lang->has($lang)) {
            return $this->trans($lang);
        }

        return $position;
    }

    public function createWidgetInstance(string $type, ?Widget $data = null): ?AbstractWidget
    {
        $typeClass = $this->getWidgetTypeClass($type);

        if (!$typeClass) {
            return null;
        }

        $typeInstance = $this->app->make($typeClass);

        /** @var AbstractWidget $typeInstance */

        if ($data) {
            $typeInstance->setData($data);
        }

        return $typeInstance;
    }

    /**
     * getWidgetTypes
     *
     * @return  array<AbstractWidget>
     */
    public function getWidgetTypes(): array
    {
        return $this->once(
            'widget.types',
            function () {
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
        );
    }

    public function getWidgetTypeClass(string $type): ?string
    {
        return $this->getWidgetTypes()[$type] ?? null;
    }

    public function getPositionColor(string $position)
    {
        if ($position) {
            $index = $this->getPositionHash($position) % \Windwalker\count($this->colors);

            return $this->colors[abs($index)];
        }

        return '#F5F5F5';
    }

    private function getPositionHash(string $position): int
    {
        return $this->cacheStorage['position.hash.' . $position] ??= abs(crc32($position . md5($position)));
    }

    /**
     * Get text color based on background color luma.
     *
     * @see https://stackoverflow.com/a/12043228
     *
     * @param string $bgHex
     * @param int    $sep
     *
     * @return  string
     */
    public static function getTextColor(string $bgHex, int $sep = 200): string
    {
        [$r, $g, $b] = sscanf($bgHex, '#%02x%02x%02x');

        $luma = $r * 0.2126 + $g * 0.7152 + $b * 0.0722;

        return $luma > $sep ? 'black' : 'white';
    }
}
