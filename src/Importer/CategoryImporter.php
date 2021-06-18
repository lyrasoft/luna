<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Unicorn\Utilities\SlugHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Utilities\Arr;
use function Windwalker\tap;

/**
 * The MenuImporter class.
 *
 * @since  1.7.12
 */
class CategoryImporter extends AbstractDataImporter
{
    /**
     * store
     *
     * @param Data $data
     *
     * @return  Data
     *
     * @throws \Exception
     * @since  1.7.12
     */
    public function store(Data $data): Data
    {
        $data->alias      = SlugHelper::safe($data->alias ?: $data->title);
        $data->state      = $data->state ?? 1;
        $data->created    = $data->created ?: Chronos::create();
        $data->created_by = $data->created_by ?? 1;
        $data->language   = $data->language ?: '*';
        $data->params     = is_json($data->params) ? $data->params : json_encode($data->params ?? []);

        $record = new CategoryRecord();

        $record->reset();

        $record->bind($data);

        $record->setLocation($record->parent_id, $record::LOCATION_LAST_CHILD);

        $record->store();

        $record->rebuildPath();

        return $record;
    }

    /**
     * importItem
     *
     * @param string        $key
     * @param mixed         $item
     * @param array         $defaultData
     * @param callable|null $dataHandler
     *
     * @return  Data
     *
     * @since  1.7.12
     */
    public function importItem(string $key, $item, array $defaultData = [], ?callable $dataHandler = null): Data
    {
        return tap(
            parent::importItem($key, $item, $defaultData, $dataHandler),
            function (Data $data) use ($item, $defaultData, $dataHandler) {
                if (Arr::has($item, 'children')) {
                    $defaultData['parent_id'] = $data->id;

                    $this->import(Arr::get($item, 'children'), $defaultData, $dataHandler);
                }
            }
        );
    }
}
