<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Record\PageRecord;
use Lyrasoft\Unidev\Seo\SlugHelper;
use Phoenix\Repository\AdminRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Database\Driver\AbstractDatabaseDriver;
use Windwalker\Record\Record;
use Windwalker\Structure\Structure;

/**
 * The PageRepository class.
 *
 * @since  1.0
 */
class PageRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Page';

    /**
     * Property record.
     *
     * @var  string
     */
    protected $record = 'Page';

    /**
     * Property mapper.
     *
     * @var  string
     */
    protected $mapper = 'Page';

    /**
     * Property reorderConditions.
     *
     * @var  array
     */
    protected $reorderConditions = [];

    /**
     * Property reorderPosition.
     *
     * @var  string
     */
    protected $reorderPosition = self::ORDER_POSITION_LAST;

    /**
     * Instantiate the model.
     *
     * @param   Structure|array        $config The model config.
     * @param   AbstractDatabaseDriver $db     The database driver.
     *
     * @since   1.0
     */
    public function __construct($config = null, AbstractDatabaseDriver $db = null)
    {
        parent::__construct($config, $db);
    }

    /**
     * getReorderConditions
     *
     * @param Record|PageRecord $record
     *
     * @return  array  An array of conditions to add to ordering queries.
     */
    public function getReorderConditions(Record $record)
    {
        return parent::getReorderConditions($record);
    }

    /**
     * Method to set new item ordering as first or last.
     *
     * @param   Record|PageRecord $record   Item table to save.
     * @param   string              $position `first` or other are `last`.
     *
     * @return  void
     */
    public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
    {
        parent::setOrderPosition($record, $position);
    }

    /**
     * postGetItem
     *
     * @param DataInterface|PageRecord $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
        $item->meta = json_decode($item->meta, true);
    }

    /**
     * prepareSave
     *
     * @param Record|PageRecord $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareSave(Record $data)
    {
        parent::prepareSave($data);

        if (!$data->preview_secret) {
            $data->preview_secret = $this->genPreviewSecret();
        }

        if (!is_string($data->meta)) {
            $data->meta = json_encode($data->meta);
        }
    }

    /**
     * handleAlias
     *
     * @param   string $alias
     *
     * @return  string
     */
    public function handleAlias($alias)
    {
        return implode('/', array_map([SlugHelper::class, 'safe'], explode('/', $alias)));
    }

    /**
     * getPreviewSecret
     *
     * @return  string
     *
     * @throws \Exception
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function genPreviewSecret()
    {
        return md5(uniqid('Luna:page:' . random_int(1, 1000), true));
    }

    /**
     * postSave
     *
     * @param Record|PageRecord $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function postSave(Record $data)
    {
        parent::postSave($data);
    }

    /**
     * postDelete
     *
     * @param array               $conditions
     * @param Record|PageRecord $data
     *
     * @return  void
     */
    protected function postDelete($conditions, Record $data)
    {
        parent::postDelete($conditions, $data);
    }
}
