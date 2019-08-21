<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Article;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\MenuService;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\DataInterface;
use Windwalker\DI\Annotation\Inject;
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
     * Property menuService.
     *
     * @Inject()
     *
     * @var MenuService
     */
    protected $menuService;

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
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
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
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     */
    protected function prepareHeader(DataInterface $data)
    {
        // Menu
        if (LunaHelper::tableExists('menus') && !$this->menuService->getActiveMenu()) {
            $this->menuService->forceMenuActive('article_category', ['id' => $data->item->category_id]);
        }

        // Header
        $this->setTitle($data->item->title);

        $desc = (string) str(strip_tags($data->item->introtext))->truncate(150, '...');

        HtmlHeader::addOpenGraph('og:image', $data->item->image, true);
        HtmlHeader::addOpenGraph('og:description', $desc, true);
        HtmlHeader::addMetadata('description', $desc, true);
    }
}
