<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Admin\Record\ArticleRecord;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Repository\StateRepositoryInterface;
use Lyrasoft\Luna\Tag\TagHelper;
use Phoenix\Repository\ItemRepository;
use Windwalker\Data\DataInterface;

/**
 * The ArticleModel class.
 *
 * @since  1.0
 */
class ArticleRepository extends ItemRepository implements StateRepositoryInterface
{
    /**
     * postGetItem
     *
     * @param DataInterface|ArticleRecord $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
        $item->category = $this->getDataMapper('Category')->findOne($item->category_id);

        $item->tags = TagHelper::getAvailableTags('article', $item->id);

        if (LunaHelper::tableExists('comments')) {
            $commentsModel = new CommentsRepository;

            $commentsModel->published(true);
            $commentsModel->target('article', $item->id);
            $commentsModel->ordering('comment.ordering', 'ASC');

            $item->comments = $commentsModel->getItems();
        }
    }

    /**
     * published
     *
     * @param bool $published
     *
     * @return static
     */
    public function published($published = true)
    {
        $this->state->push('load.conditions', 'state = ' . (int) $published);
    }


}
