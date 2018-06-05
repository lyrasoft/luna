<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Record\ContactRecord;
use Phoenix\Repository\AdminRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Record\Record;

/**
 * The ContactModel class.
 *
 * @since  1.0
 */
class ContactRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Contact';

    /**
     * Property record.
     *
     * @var  string
     */
    protected $record = 'Contact';

    /**
     * Property mapper.
     *
     * @var  string
     */
    protected $mapper = 'Contact';

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
     * postGetItem
     *
     * @param DataInterface|ContactRecord $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
        // Do some stuff
    }

    /**
     * prepareRecord
     *
     * @param Record|ContactRecord $record
     *
     * @return  void
     */
    protected function prepareRecord(Record $record)
    {
        parent::prepareRecord($record);
    }

    /**
     * postSaveHook
     *
     * @param Record|ContactRecord $record
     *
     * @return  void
     */
    protected function postSaveHook(Record $record)
    {
        parent::postSaveHook($record);
    }

    /**
     * getReorderConditions
     *
     * @param Record|ContactRecord $record
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
     * @param   Record|ContactRecord $record   Item table to save.
     * @param   string               $position `first` or other are `last`.
     *
     * @return  void
     */
    public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
    {
        parent::setOrderPosition($record, $position);
    }
}
