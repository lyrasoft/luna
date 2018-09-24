<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Category;

use Lyrasoft\Luna\Helper\LunaHelper;
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
     * Property renderer.
     *
     * @var  string
     */
    protected $renderer = RendererHelper::EDGE;

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

        foreach ($data->items as $item) {
            $tags = (array) explode('||', $item->tags);

            $tags = array_filter($tags, 'strlen');

            sort($tags);

            $tags = array_map(function ($value) {
                list($title, $alias) = StringHelper::explode(':', $value);

                return new Data(
                    [
                        'title' => $title,
                        'alias' => $alias,
                    ]
                );
            }, $tags);

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

        HtmlHeader::addOpenGraph('og:image', $data->category->image);
        HtmlHeader::addOpenGraph('og:description', $desc);
        HtmlHeader::addMetadata('description', $desc);
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
