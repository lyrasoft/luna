<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Record\ArticleRecord;
use Lyrasoft\Luna\Tag\TagHelper;
use Phoenix\Utilities\SlugHelper;
use Phoenix\Repository\AdminRepository;
use Windwalker\Legacy\Data\DataInterface;
use Windwalker\Legacy\Form\Filter\MaxLengthFilter;
use Windwalker\Legacy\Record\Record;

/**
 * The ArticleModel class.
 *
 * @since  1.0
 */
class ArticleRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'article';

    /**
     * Property reorderConditions.
     *
     * @var  array
     */
    protected $reorderConditions = [
        'category_id',
    ];

    /**
     * postGetItem
     *
     * @param DataInterface|ArticleRecord $item
     *
     * @return  void
     * @throws \Exception
     */
    protected function postGetItem(DataInterface $item)
    {
        // Readmore line
        $item->text = $item->introtext . ($item->fulltext ? '<hr id="luna-readmore">' . $item->fulltext : null);

        // tags
        $item->tags = TagHelper::getTags('article', $item->id)->id;
    }

    /**
     * handleAlias
     *
     * @param string $alias
     *
     * @return  string
     * @throws \Exception
     */
    public function handleAlias($alias)
    {
        return (new MaxLengthFilter(255))->clean(SlugHelper::safe($alias));
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
