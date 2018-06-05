<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Language;

use Lyrasoft\Luna\Admin\Repository\LanguageRepository;
use Lyrasoft\Luna\Admin\View\Language\LanguageHtmlView;
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
     * @var  LanguageRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  LanguageHtmlView
     */
    protected $view;
}
