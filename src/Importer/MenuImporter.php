<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Phoenix\Utilities\SlugHelper;
use Windwalker\Core\Database\DatabaseAdapter;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Data\Data;
use Windwalker\Utilities\Arr;
use function Windwalker\tap;

/**
 * The MenuImporter class.
 *
 * @since  __DEPLOY_VERSION__
 */
class MenuImporter extends AbstractDataImporter
{
    /**
     * store
     *
     * @param Data $data
     *
     * @return  Data
     *
     * @throws \Exception
     * @since  __DEPLOY_VERSION__
     */
    public function store(Data $data): Data
    {
        $data->alias      = SlugHelper::safe($data->alias ?: $data->title);
        $data->state      = $data->state ?? 1;
        $data->hidden     = $data->hidden ?? '0';
        $data->target     = $data->target ?? '_self';
        $data->variables  = is_json($data->variables) ? $data->variables : json_encode($data->variables ?? []);
        $data->created    = $data->created ?: Chronos::create()->toSql();
        $data->created_by = $data->created_by ?? 1;
        $data->language   = $data->language ?: '*';
        $data->params     = is_json($data->params) ? $data->params : json_encode($data->params ?? []);

        $record = new MenuRecord();

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
     * @since  __DEPLOY_VERSION__
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
