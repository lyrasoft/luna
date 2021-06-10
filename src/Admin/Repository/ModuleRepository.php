<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Phoenix\Repository\AdminRepository;
use Windwalker\Legacy\Data\DataInterface;
use Windwalker\Legacy\Record\Record;

/**
 * The ModuleModel class.
 *
 * @since  1.0
 */
class ModuleRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'module';

    /**
     * Property reorderConditions.
     *
     * @var  array
     */
    protected $reorderConditions = [
        'position',
    ];

    /**
     * postGetItem
     *
     * @param DataInterface $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
    }

    /**
     * prepareRecord
     *
     * @param Record $record
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareRecord(Record $record)
    {
        parent::prepareRecord($record);
    }

    /**
     * getReorderConditions
     *
     * @param Record $record
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
     * @param   Record $record   Item table to save.
     * @param   string $position `first` or other are `last`.
     *
     * @return  void
     */
    public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
    {
        parent::setOrderPosition($record, $position);
    }
}
