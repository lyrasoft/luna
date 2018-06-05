<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Article;

use Lyrasoft\Luna\Admin\Repository\ArticleRepository;
use Lyrasoft\Luna\Admin\View\Article\ArticleHtmlView;
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
     * @var  ArticleRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  ArticleHtmlView
     */
    protected $view;
}
