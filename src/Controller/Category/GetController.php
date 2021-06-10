<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Category;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\TagRecord;
use Lyrasoft\Luna\Controller\AbstractCategoryController;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Repository\ArticlesRepository;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Lyrasoft\Luna\Repository\TagRepository;
use Lyrasoft\Luna\View\Category\CategoryHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Phoenix\Repository\ListRepository;
use Phoenix\View\AbstractPhoenixHtmView;
use Windwalker\Legacy\Core\Repository\Repository;
use Windwalker\Legacy\Core\View\AbstractView;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Filter\InputFilter;
use Windwalker\Legacy\Router\Exception\RouteNotFoundException;
use Windwalker\Legacy\Utilities\Arr;

/**
 * The GetController class.
 *
 * @since  1.0
 */
class GetController extends AbstractCategoryController
{
    /**
     * Property repository.
     *
     * @var  ListRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  AbstractPhoenixHtmView
     */
    protected $view;

    /**
     * Property type.
     *
     * @var  string
     */
    protected $type = 'article';

    /**
     * Property joinPrefix.
     *
     * @var  string
     */
    protected $joinPrefix = 'article';

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'article.created';

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = 'DESC';
}
