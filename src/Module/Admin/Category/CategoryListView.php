<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use Lyrasoft\Luna\Module\Admin\Category\Form\GridForm;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

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
    use TranslatorTrait;

    /**
     * CategoriesView constructor.
     *
     * @param  ORM                 $orm
     * @param  CategoryRepository  $repository
     * @param  FormFactory         $formFactory
     */
    public function __construct(
        protected ORM $orm,
        #[Autowire]
        protected CategoryRepository $repository,
        protected FormFactory $formFactory,
    ) {
    }

    public function prepare(AppContext $app, View $view): array
    {
        $state = $this->repository->getState();

        // Prepare Items
        $page = $state->rememberFromRequest('page');
        $limit = $state->rememberFromRequest('limit');
        $filter = (array) $state->rememberFromRequest('filter');
        $search = (array) $state->rememberFromRequest('search');
        $ordering = $state->rememberFromRequest('list_ordering') ?? static::getDefaultOrdering();

        $items = $this->repository->getListSelector()
            ->setFilters($filter)
            ->searchTextFor(
                $search['*'] ?? '',
                static::getSearchFields()
            )
            ->addFilter('category.type', $app->input('type'))
            ->ordering($ordering)
            ->page($page)
            ->limit($limit);

        $pagination = $items->getPagination();

        // Prepare Form
        $form = $this->formFactory->create(GridForm::class);
        $form->fill(compact('search', 'filter'));

        $showFilters = $this->showFilterBar($filter);

        $type = $app->input('type');

        $items = $items->all();

        $this->prepareMetadata($app, $view);

        return compact('items', 'pagination', 'form', 'showFilters', 'ordering', 'type');
    }

    public function prepareItem(Collection $item): object
    {
        return $this->repository->getEntityMapper()->toEntity($item);
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
            'category.id',
            'category.title',
            'category.alias',
            'category.description',
        ];
    }

    /**
     * Can show Filter bar
     *
     * @param  array  $filter
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

    /**
     * Prepare Metadata and HTML Frame.
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  void
     */
    protected function prepareMetadata(AppContext $app, View $view): void
    {
        $type = $app->input('type');

        $langKey = "luna.$type.category.list.title";
        $appLangKey = "app.$type.category.list.title";

        if ($this->lang->has($langKey)) {
            $title = $this->trans($langKey);
        } elseif ($this->lang->has($appLangKey)) {
            $title = $this->trans($appLangKey);
        } else {
            $title = $this->trans(
                'luna.category.list.title',
                title: $this->trans('luna.' . $type . '.title')
            );
        }

        $view->setTitle($title);
    }
}
