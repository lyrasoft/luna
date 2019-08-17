<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Phoenix\Utilities\SlugHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Data\Data;

/**
 * The ArticleImporter class.
 *
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public function store(Data $data): Data
    {
        $data->alias      = $data->alias ?: SlugHelper::safe($data->title);
        $data->state      = $data->state ?? 1;
        $data->created    = $data->created ?: Chronos::create()->toSql();
        $data->created_by = $data->created_by ?? 1;
        $data->language   = $data->language ?: '*';
        $data->params     = is_json($data->params) ? $data->params : json_encode($data->params ?? []);

        return ArticleMapper::createOne($data);
    }
}
