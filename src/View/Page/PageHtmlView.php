<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Page;

use Lyrasoft\Luna\Admin\Record\PageRecord;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Warder\Warder;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Data\Data;
use Windwalker\Renderer\EdgeRenderer;
use Windwalker\Router\Exception\RouteNotFoundException;
use Windwalker\Test\TestHelper;

/**
 * The PageHtmlView class.
 *
 * @since  1.0
 */
class PageHtmlView extends ItemView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Page';

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        $paths = $data->paths;

        $paths = implode('.', $paths);

        // Handle static pages
        if ($paths && $this->getRenderer()->has($paths)) {
            $allow = true;

            if (!WINDWALKER_DEBUG) {
                $protects = LunaHelper::getPackage()->get('page.protects');

                $matched = array_filter($protects, function ($prefix) use ($paths) {
                    return strpos($paths, $prefix) === 0;
                });
                
                if ($matched) {
                    $allow = false;
                }
            }

            if ($allow) {
                $this->layout = $paths;

                return;
            }
        }

        // Reset renderer loader and engine to reload
        /** @var EdgeRenderer $renderer */
        $renderer = $this->getRenderer();
        $renderer->setLoader(null);
        $renderer->setEngine($renderer->getEngine(true));

        parent::prepareData($data);

        $user = Warder::getUser();

        // Check access
        /** @var PageRecord $item */
        $item = $data->item;

        if ($item->state < 1) {
            if ($user->isGuest() || ($user->isMember() && $data->previewSecret !== $item->preview_secret)) {
                throw new RouteNotFoundException('Page not found.');
            }
        }

        $data->rows = json_decode($item->content, true);

        $this->prepareScripts();
        $this->prepareMetadata($data);
    }

    /**
     * prepareDocument
     *
     * @return  void
     */
    protected function prepareScripts()
    {
    }

    /**
     * prepareMetadata
     *
     * @param Data $data
     *
     * @return  void
     */
    protected function prepareMetadata(Data $data)
    {
        $meta = new Data(json_decode($data->item->meta, true));

        $this->setTitle($meta->meta_title ?: $data->item->title);

        if ($meta->meta_desc) {
            HtmlHeader::addMetadata('description', $meta->meta_desc, true);
        }

        if ($meta->meta_keyword) {
            HtmlHeader::addMetadata('keyword', $meta->meta_keyword, true);
        }

        if ($meta->og_image) {
            HtmlHeader::addOpenGraph('og:image', $meta->og_image, true);
        }

        $ogDesc = $meta->og_desc ?: $meta->meta_desc;

        if ($ogDesc) {
            HtmlHeader::addOpenGraph('og:description', $ogDesc, true);
        }
    }
}
