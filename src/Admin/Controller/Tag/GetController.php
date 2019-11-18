<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tag;

use Lyrasoft\Luna\Admin\Repository\TagRepository;
use Lyrasoft\Luna\Admin\View\Tag\TagHtmlView;
use Phoenix\Controller\Display\EditDisplayController;

/**
 * The GetController class.
 *
 * @since  1.0
 */
class GetController extends EditDisplayController
{
    /**
     * Property model.
     *
     * @var  TagRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  TagHtmlView
     */
    protected $view;
}
