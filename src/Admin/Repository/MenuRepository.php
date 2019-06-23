<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Phoenix\Repository\NestedAdminRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Database\Driver\AbstractDatabaseDriver;
use Windwalker\Record\Record;
use Windwalker\Structure\Structure;

/**
 * The MenuRepository class.
 *
 * @since  1.0
 */
class MenuRepository extends NestedAdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Menu';

    /**
     * Property record.
     *
     * @var  string
     */
    protected $record = 'Menu';

    /**
     * Property mapper.
     *
     * @var  string
     */
    protected $mapper = 'Menu';

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
     * @param Record|MenuRecord $record
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
     * @param   Record|MenuRecord $record   Item table to save.
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
     * @param DataInterface|MenuRecord $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
        $item->variables = json_decode($item->variables, true);
        $item->params = json_decode($item->params, true);
    }

    /**
     * prepareSave
     *
     * @param Record|MenuRecord $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareSave(Record $data)
    {
        $data->type = $data->type ?: $this['menu.type'];

        if (!$data->alias) {
            $data->alias = uniqid();
        }

        parent::prepareSave($data);
    }

    /**
     * postSave
     *
     * @param Record|MenuRecord $data
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
     * @param Record|MenuRecord $data
     *
     * @return  void
     */
    protected function postDelete($conditions, Record $data)
    {
        parent::postDelete($conditions, $data);
    }
}
