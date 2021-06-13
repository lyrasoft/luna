<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Article;

use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\View\Article\ArticleHtmlView;
use Phoenix\Controller\Display\ItemDisplayController;
use Windwalker\Legacy\Core\Repository\Repository;
use Windwalker\Legacy\Core\Security\Exception\UnauthorizedException;
use Windwalker\Legacy\Core\View\AbstractView;
use Windwalker\Legacy\Router\Exception\RouteNotFoundException;
use function Windwalker\tap;

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
     * @var  ArticleRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  ArticleHtmlView
     */
    protected $view;

    /**
     * Prepare view and default model.
     *
     * You can configure default model state here, or add more sub models to view.
     * Remember to call parent to make sure default model already set in view.
     *
     * @param AbstractView    $view  The view to render page.
     * @param Repository $repository The default mode.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareViewModel(AbstractView $view, Repository $repository)
    {
        parent::prepareViewModel($view, $repository);

        $repository->published(true);
    }

    /**
     * The main execution process.
     *
     * @return  mixed
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Throwable
     */
    protected function doExecute()
    {
        /** @var ArticleHtmlView $view */
        $view = parent::doExecute();

        $item = $this->repository->getItem();

        if ($item->page_id) {
            $this->app->set('route.extra.layout', 'page');

            return tap(
                $this->hmvc(
                    \Lyrasoft\Luna\Controller\Page\GetController::class,
                    [
                        'id' => $item->page_id
                    ]
                ),
                static function () use ($view, $item) {
                    $data = $view->getData();
                    $data->item = $item;

                    $view->forceActiveMenu($data);
                }
            );
        }

        return $view;
    }

    /**
     * Check user has access to view this page.
     *
     * Throw exception with 4xx code to block unauthorised access.
     *
     * @return  bool
     *
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function authorise()
    {
        // Model will cache data so we can get item first before view
        $item = $this->repository->getItem();

        if ($item->isNull()) {
            throw new RouteNotFoundException('Article not found.', 404);
        }

        if ($item->state <= 0) {
            throw new RouteNotFoundException('Article not published.', 404);
        }

        if (Locale::isEnabled() && $item->id) {
            if (Locale::getLocale() !== $item->language && $item->language !== '*') {
                throw new RouteNotFoundException(sprintf('Language %s not support for this article',
                    Locale::getLocale()), 404);
            }
        }

        return true;
    }
}
