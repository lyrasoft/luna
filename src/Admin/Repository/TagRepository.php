<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\DataMapper\TagMapMapper;
use Phoenix\Repository\AdminRepository;
use Phoenix\Utilities\SlugHelper;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Data\DataInterface;
use Windwalker\Legacy\Data\DataSet;
use Windwalker\Legacy\Form\Filter\MaxLengthFilter;
use Windwalker\Legacy\Record\Record;

/**
 * The TagModel class.
 *
 * @since  1.0
 */
class TagRepository extends AdminRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'tag';

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
     * handleAlias
     *
     * @param string $alias
     *
     * @return  string
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
     * @param Record $record   Item table to save.
     * @param string $position `first` or other are `last`.
     *
     * @return  void
     */
    public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
    {
        parent::setOrderPosition($record, $position);
    }

    /**
     * saveTags
     *
     * @param string        $type
     * @param integer       $targetId
     * @param array|DataSet $tags
     *
     * @return  void
     * @throws \Exception
     */
    public function saveTagMaps($type, $targetId, $tags)
    {
        if ($tags instanceof DataSet) {
            $tags = $tags->id;
        }

        $tags = (array) $tags;

        $maps = [];

        foreach ($tags as $tagId) {
            if (strpos($tagId, 'new#') === 0) {
                $data        = new Data();
                $data->title = substr($tagId, 4);
                $data->state = 1;

                $this->save($data);

                $tagId = $data->id;
            }

            $maps[] = [
                'type' => $type,
                'target_id' => $targetId,
                'tag_id' => $tagId
            ];
        }

        TagMapMapper::sync(
            $maps,
            [
                'type' => $type,
                'target_id' => $targetId
            ],
            ['type', 'target_id', 'tag_id']
        );
    }
}
