<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Language;

use Lyrasoft\Luna\Admin\Model\LanguageModel;
use Lyrasoft\Luna\Admin\View\Language\LanguageHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Core\Model\ModelRepository;

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
	 * @var  LanguageModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  LanguageHtmlView
	 */
	protected $view;
}
