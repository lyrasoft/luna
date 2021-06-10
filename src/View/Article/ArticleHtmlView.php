<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Article;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\MenuService;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Legacy\Core\Renderer\RendererHelper;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Data\DataInterface;
use Windwalker\Legacy\DI\Annotation\Inject;
use Windwalker\Legacy\String\Mbstring;

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
     * @param \Windwalker\Legacy\Data\Data $data
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
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
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     */
    protected function prepareHeader(DataInterface $data)
    {
        $this->forceActiveMenu($data);

        // Header
        $this->setTitle($data->item->title);

        $desc = (string) str(strip_tags($data->item->introtext))->truncate(150, '...');

        HtmlHeader::addOpenGraph('og:image', $data->item->image, true);
        HtmlHeader::addOpenGraph('og:description', $desc, true);
        HtmlHeader::addMetadata('description', $desc, true);
    }

    /**
     * forceActiveMenu
     *
     * @param Data $data
     *
     * @return  void
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     *
     * @since  1.7.18
     */
    public function forceActiveMenu(Data $data): void
    {
        // Menu
        if (LunaHelper::tableExists('menus')) {
            $this->menuService->forceActiveIfNoExists('article_category', ['id' => $data->item->category_id]);
        }
    }
}
