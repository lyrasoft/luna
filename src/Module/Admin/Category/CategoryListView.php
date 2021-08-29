<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use App\Datavideo\Region\RegionService;
use Lyrasoft\Luna\Module\Admin\Category\Form\GridForm;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;
use Windwalker\Query\Query;

/**
 * The CategoryView class.
 */
#[ViewModel(
    layout: [
        'default' => 'category-list',
        'modal' => 'category-modal',
    ],
    js: 'category-list.js'
)]
class CategoryListView implements ViewModelInterface
{
    use \App\Region\RegionEditTrait;

    /**
     * CategoriesView constructor.
     *
     * @param    ORM               $orm
     * @param    CategoryRepository  $repository
     * @param    FormFactory       $formFactory
     */
    public function __construct(
        protected ORM $orm,
        #[Autowire]
        protected CategoryRepository $repository,
        protected FormFactory $formFactory,
        #[Autowire]
        protected RegionService $regionService
    ) {
    }

    public function prepare(AppContext $app, View $view): array
    {
        $state = $this->repository->getState();

        // Prepare Items
        $page     = $state->rememberFromRequest('page');
        $limit    = $state->rememberFromRequest('limit');
        $filter   = (array) $state->rememberFromRequest('filter');
        $search   = (array) $state->rememberFromRequest('search');
        $ordering = $state->rememberFromRequest('list_ordering') ?? static::getDefaultOrdering();

        $items = $this->repository->getListSelector()
            ->modifyQuery(
                fn(Query $query) => $this->joinCurrentRegion($query, $filter['region'] ?? 1 ?: 1)
            )
            ->setFilters($filter)
            ->searchTextFor(
                $search['*'] ?? '',
                static::getSearchFields()
            )
            ->ordering($ordering)
            ->page($page)
            ->limit($limit)
            ->addFilter('category.type', $app->input('type'))
            ->disableSelectGroup(true);

        $pagination = $items->getPagination();

        // Prepare Form
        $form = $this->formFactory->create(GridForm::class);
        $form->fill(compact('search', 'filter'));

        $showFilters = $this->showFilterBar($filter);

        $type = $app->input('type');

        $items = $items->all();

        $this->setTitle($app);

        return compact('items', 'pagination', 'form', 'showFilters', 'ordering', 'type');
    }

    public function prepareItem(Collection $item): object
    {
        $this->prepareListItemRegion($item);

        return $this->repository->getEntityMapper()->toEntity($item);
    }

    public function setTitle(AppContext $app)
    {
        $type = $app->input('type');

        $langKey = "luna.$type.categories";

        if ($app->service(LangService::class)->has($langKey)) {
            $title = __($langKey);
        } else {
            $title = __(
                'luna.category.manager.title',
                __('luna.' . $type . '.title')
            );
        }

        $app->service(HtmlFrame::class)->setTitle($title);
    }

    /**
     * Get default ordering.
     *
     * @return    string
     */
    public static function getDefaultOrdering(): string
    {
        return 'category.lft ASC';
    }

    /**
     * Get search fields.
     *
     * @return    string[]
     */
    public static function getSearchFields(): array
    {
        return [
            'lang.title',
            'category.alias',
        ];
    }

    /**
     * Can show Filter bar
     *
     * @param    array  $filter
     *
     * @return    bool
     */
    public function showFilterBar(array $filter): bool
    {
        foreach ($filter as $value) {
            if ($value !== null && (string) $value !== '') {
                return true;
            }
        }

        return false;
    }
}
