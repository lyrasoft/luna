<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Category;

use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ListView;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\String\StringHelper;
use Windwalker\String\Utf8String;

/**
 * The CategoryHtmlView class.
 *
 * @since  1.0
 */
class CategoryHtmlView extends ListView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'category';

    /**
     * init
     *
     * @return  void
     */
    protected function init()
    {
        $this->langPrefix = LunaHelper::getLangPrefix();
    }

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data $data
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        // Load tags
        $ids = $data->items->id;
        $db = TagMapper::getDb();

        $tagItems = TagMapper::leftJoin(
            'map',
            LunaTable::TAG_MAPS,
            $db->format('%n = %n AND map.type = %q', 'map.tag_id', 'tags.id', 'article')
        )->find(['map.target_id' => $ids ?: [0], 'tags.state' => 1], 'tags.title');

        foreach ($data->items as $item) {
            $tags = $tagItems->filter(function (Data $tag) use ($item) {
                return $tag->map_target_id === $item->id;
            });

            $item->tags = $tags;

            if ($item->page_id) {
                $item->link = $this->router->route('page', ['path' => $item->page_alias]);
            } else {
                $item->link = $this->router->route('article', ['alias' => $item->alias, 'id' => $item->id]);
            }
        }

        $this->prepareHeader($data);
    }

    /**
     * prepareHeader
     *
     * @param DataInterface $data
     *
     * @return  void
     */
    protected function prepareHeader(DataInterface $data)
    {
        $this->setTitle($data->category->title);

        $desc = Utf8String::substr(strip_tags($data->category->description), 0, 150);

        HtmlHeader::addOpenGraph('og:image', $data->category->image, true);
        HtmlHeader::addOpenGraph('og:description', $desc, true);
        HtmlHeader::addMetadata('description', $desc, true);
    }

    /**
     * setTitle
     *
     * @param string $title
     *
     * @return  static
     */
    public function setTitle($title = null)
    {
        return parent::setTitle($title);
    }
}
