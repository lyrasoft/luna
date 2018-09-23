<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Page;

use Lyrasoft\Luna\Admin\Record\PageRecord;
use Lyrasoft\Warder\Warder;
use Phoenix\View\ItemView;
use Windwalker\Router\Exception\RouteNotFoundException;

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
        $this->prepareMetadata();
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
     * @return  void
     */
    protected function prepareMetadata()
    {
        $this->setTitle();
    }
}
