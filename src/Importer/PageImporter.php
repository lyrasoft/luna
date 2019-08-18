<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Importer;

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Lyrasoft\Luna\Admin\DataMapper\PageMapper;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Phoenix\Utilities\SlugHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Data\Data;

/**
 * The ArticleImporter class.
 *
 * @since  1.7.12
 */
class PageImporter extends AbstractDataImporter
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
        $data->extends    = $data->extends ?? '_global.html';
        $data->state      = $data->state ?? 1;
        $data->meta       = is_json($data->meta) ? $data->meta : json_encode($data->meta ?? []);
        $data->created    = $data->created ?: Chronos::create()->toSql();
        $data->created_by = $data->created_by ?? 1;
        $data->language   = $data->language ?: '*';
        $data->preview_secret = $data->preview_secret ?? md5(uniqid('Luna:page:', true));
        $data->params     = is_json($data->params) ? $data->params : json_encode($data->params ?? []);

        return PageMapper::createOne($data);
    }
}
