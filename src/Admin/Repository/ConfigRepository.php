<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Record\ConfigRecord;
use Phoenix\Repository\AdminRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Database\Driver\AbstractDatabaseDriver;
use Windwalker\Record\Record;
use Windwalker\Structure\Structure;

/**
 * The ConfigRepository class.
 *
 * @since  1.0
 */
class ConfigRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Config';

    /**
     * Property record.
     *
     * @var  string
     */
    protected $record = 'Config';

    /**
     * Property mapper.
     *
     * @var  string
     */
    protected $mapper = 'Config';

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
     * @param Record|ConfigRecord $record
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
     * @param   Record|ConfigRecord $record   Item table to save.
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
     * @param DataInterface|ConfigRecord $item
     *
     * @return  void
     * @throws \Exception
     */
    protected function postGetItem(DataInterface $item)
    {
        $content = $item->content;

        $item->reset();
        $item->bind(json_decode($content, true));
    }

    /**
     * prepareSave
     *
     * @param Record|ConfigRecord $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareSave(Record $data)
    {
        parent::prepareSave($data);
    }

    /**
     * postSave
     *
     * @param Record|ConfigRecord $data
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
     * @param Record|ConfigRecord $data
     *
     * @return  void
     */
    protected function postDelete($conditions, Record $data)
    {
        parent::postDelete($conditions, $data);
    }
}
