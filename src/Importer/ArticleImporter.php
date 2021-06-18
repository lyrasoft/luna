<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Unicorn\Utilities\SlugHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Legacy\Data\Data;

/**
 * The ArticleImporter class.
 *
 * @since  1.7.12
 */
class ArticleImporter extends AbstractDataImporter
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
        $data->alias      = $data->alias ?: SlugHelper::safe($data->title);
        $data->state      = $data->state ?? 1;
        $data->created    = $data->created ?: Chronos::create();
        $data->created_by = $data->created_by ?? 1;
        $data->language   = $data->language ?: '*';
        $data->params     = is_json($data->params) ? $data->params : json_encode($data->params ?? []);

        return ArticleMapper::createOne($data);
    }
}
