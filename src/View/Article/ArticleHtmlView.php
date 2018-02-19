<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Article;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\DataInterface;
use Windwalker\String\Mbstring;

/**
 * The ArticleHtmlView class.
 *
 * @since  1.0
 */
class ArticleHtmlView extends ItemView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'article';

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
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $data->item->text = $data->item->introtext . $data->item->fulltext;

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
        $this->setTitle($data->item->title);

        $desc = Mbstring::substr(strip_tags($data->item->introtext), 0, 150);

        HtmlHeader::addOpenGraph('og:image', $data->item->image);
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
