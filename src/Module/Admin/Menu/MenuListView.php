<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Menu;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Module\Admin\Menu\Form\GridForm;
use Lyrasoft\Luna\Repository\MenuRepository;
use Lyrasoft\Luna\Services\MenuService;
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
 * The MenuListView class.
 */
#[ViewModel(
    layout: [
        'default' => 'menu-list',
        'modal' => 'menu-modal',
    ],
    js: 'menu-list.js'
)]
class MenuListView implements ViewModelInterface
{
    use TranslatorTrait;

    public function __construct(
        protected ORM $orm,
        #[Autowire]
        protected MenuRepository $repository,
        protected FormFactory $formFactory,
        protected MenuService $menuService,
    ) {
    }

    /**
     * Prepare view data.
     *
     * @param  AppContext  $app   The request app context.
     * @param  View        $view  The view object.
     *
     * @return  array
     */
    public function prepare(AppContext $app, View $view): array
    {
        $state = $this->repository->getState();
        $type = $app->input('type');

        // Prepare Items
        $page = $state->rememberFromRequest('page');
        $limit = $state->rememberFromRequest('limit') ?? 45;
        $filter = (array) $state->rememberMergeRequest('filter');
        $search = (array) $state->rememberMergeRequest('search');
        $ordering = $state->rememberFromRequest('list_ordering') ?? $this->getDefaultOrdering();

        $items = $this->repository->getListSelector()
            ->setFilters($filter)
            ->searchTextFor(
                $search['*'] ?? '',
                $this->getSearchFields()
            )
            ->addFilter('menu.type', $type)
            ->ordering($ordering)
            ->page($page)
            ->limit($limit);

        $pagination = $items->getPagination();

        // Prepare Form
        $form = $this->formFactory->create(GridForm::class);
        $form->fill(compact('search', 'filter'));

        $showFilters = $this->showFilterBar($filter);

        $this->prepareMetadata($app, $view);

        return compact('items', 'pagination', 'form', 'showFilters', 'ordering', 'type');
    }

    public function prepareItem(Collection $item): object
    {
        return $this->repository->getEntityMapper()->toEntity($item);
    }

    public function getViewInstance(?string $viewName): ?AbstractMenuView
    {
        if (!$viewName) {
            return null;
        }

        return $this->menuService->getViewInstance($viewName);
    }

    /**
     * Get default ordering.
     *
     * @return  string
     */
    public function getDefaultOrdering(): string
    {
        return 'menu.lft ASC';
    }

    /**
     * Get search fields.
     *
     * @return  string[]
     */
    public function getSearchFields(): array
    {
        return [
            'menu.id',
            'menu.title',
            'menu.alias',
        ];
    }

    /**
     * Is reorder enabled.
     *
     * @param  string  $ordering
     *
     * @return  bool
     */
    public function reorderEnabled(string $ordering): bool
    {
        return $ordering === 'menu.lft ASC';
    }

    /**
     * Can show Filter bar
     *
     * @param  array  $filter
     *
     * @return  bool
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

        $langKey = "luna.$type.menu.list.title";
        $appLangKey = "app.$type.menu.list.title";

        if ($this->lang->has($langKey)) {
            $title = $this->trans($langKey);
        } elseif ($this->lang->has($appLangKey)) {
            $title = $this->trans($appLangKey);
        } else {
            $types = $this->menuService->getMenuTypes();

            if ($types[$type] ?? null) {
                $title = $types[$type]['title'];
            } else {
                $title = $this->trans('luna.menu.type.' . $type);
            }

            $title = $this->trans(
                'luna.menu.list.title',
                title: $title
            );
        }

        $view->setTitle($title);
    }
}
