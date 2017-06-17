<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Article;

use Lyrasoft\Luna\Model\ArticleModel;
use Lyrasoft\Luna\View\Article\ArticleHtmlView;
use Phoenix\Controller\Display\ItemDisplayController;
use Windwalker\Core\Model\ModelRepository;

/**
 * The GetController class.
 * 
 * @since  1.0
 */
class GetController extends ItemDisplayController
{
	/**
	 * Property model.
	 *
	 * @var  ArticleModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  ArticleHtmlView
	 */
	protected $view;
}
