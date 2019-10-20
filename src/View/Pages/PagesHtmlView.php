<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Pages;

use Phoenix\View\ListView;

/**
 * The PagesHtmlView class.
 *
 * @since  1.0
 */
class PagesHtmlView extends ListView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Pages';

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
