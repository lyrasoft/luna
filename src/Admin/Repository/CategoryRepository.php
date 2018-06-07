<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Unidev\Seo\SlugHelper;
use Phoenix\Repository\NestedAdminRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Form\Filter\MaxlengthFilter;
use Windwalker\Record\Record;

/**
 * The CategoryModel class.
 *
 * @since  1.0
 */
class CategoryRepository extends NestedAdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'category';

    /**
     * Property reorderConditions.
     *
     * @var  array
     */
    protected $reorderConditions = [];

    /**
     * postGetItem
     *
     * @param DataInterface $item
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
     * @param Record $record
     *
     * @return  void
     */
    protected function prepareRecord(Record $record)
    {
        $record->type = $record->type ?: $this['category.type'];

        parent::prepareRecord($record);
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
        return (new MaxlengthFilter(255))->clean(SlugHelper::slugify($alias));
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
