<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\User;

use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
use Lyrasoft\Luna\Enum\UserEnabled;
use Lyrasoft\Luna\Enum\UserVerified;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Module\Admin\User\Form\GridForm;
use Lyrasoft\Luna\Repository\UserRepository;
use Unicorn\Html\State\StateButton;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

use function Windwalker\collect;

/**
 * The UserListView class.
 */
#[ViewModel(
    layout: [
        'default' => 'user-list',
        'modal' => 'user-modal',
    ],
    js: 'user-list.js'
)]
class UserListView implements ViewModelInterface
{
    use TranslatorTrait;

    /**
     * @var Collection
     */
    protected Collection $roles;

    public function __construct(
        protected ORM $orm,
        protected LunaPackage $luna,
        #[Autowire]
        protected UserRepository $repository,
        protected FormFactory $formFactory
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

        // Prepare Items
        $page = $state->rememberFromRequest('page');
        $limit = $state->rememberFromRequest('limit');
        $filter = (array) $state->rememberFromRequest('filter');
        $search = (array) $state->rememberFromRequest('search');
        $ordering = $state->rememberFromRequest('list_ordering') ?? $this->getDefaultOrdering();

        $items = $this->repository->getListSelector()
            ->setFilters($filter)
            ->searchTextFor(
                $search['*'] ?? '',
                $this->getSearchFields()
            )
            ->ordering($ordering)
            ->page($page)
            ->limit($limit);

        $pagination = $items->getPagination();

        $items = $items->all();

        // Prepare Form
        $form = $this->formFactory->create(GridForm::class);
        $form->fill(compact('search', 'filter'));

        // Load Roles
        $ids = $items->column('id')->dump();
        $this->roles = $this->orm->select()
            ->from(UserRoleMap::class)
            ->where('user_id', $ids)
            ->all(UserRoleMap::class)
            ->groupBy(fn (UserRoleMap $map) => $map->getUserId());

        $showFilters = $this->showFilterBar($filter);

        $this->prepareMetadata($app, $view);

        return compact('items', 'pagination', 'form', 'showFilters', 'ordering');
    }

    public function prepareItem(Collection $item): object
    {
        return $this->repository->getEntityMapper()->toEntity($item);
    }

    /**
     * Get default ordering.
     *
     * @return  string
     */
    public function getDefaultOrdering(): string
    {
        return 'user.id DESC';
    }

    /**
     * Get search fields.
     *
     * @return  string[]
     */
    public function getSearchFields(): array
    {
        return [
            'user.id',
            'user.name',
            'user.username',
            'user.' . $this->luna->getLoginName(),
            'user.email',
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
        return $ordering === 'user.ordering ASC';
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
        $view->getHtmlFrame()
            ->setTitle(
                $this->trans('unicorn.title.grid', title: $this->trans('luna.user.title'))
            );
    }

    public function createEnabledButton(): StateButton
    {
        $enabledButton = StateButton::create();

        $enabledButton->addState(UserEnabled::ENABLED())
            ->task('disable')
            ->title(UserEnabled::ENABLED()->trans($this->lang))
            ->icon('fa fa-check')
            ->color('success');

        $enabledButton->addState(UserEnabled::DISABLED())
            ->task('enable')
            ->title(UserEnabled::DISABLED()->trans($this->lang))
            ->icon('fa fa-times')
            ->color('danger');

        return $enabledButton;
    }

    public function createVerifiedButton(): StateButton
    {
        $button = StateButton::create();

        $button->addState(UserVerified::VERIFIED())
            ->task('unactivate')
            ->title(UserVerified::VERIFIED()->trans($this->lang))
            ->icon('fa fa-check')
            ->disabled(true)
            ->color('success');

        $button->addState(UserVerified::UNVERIFIED())
            ->task('activate')
            ->title(UserVerified::UNVERIFIED()->trans($this->lang))
            ->icon('fa fa-times')
            ->color('danger');

        return $button;
    }

    /**
     * @param  int  $userId
     *
     * @return  Collection|UserRoleMap[]
     */
    public function getUserRoles(int $userId): Collection
    {
        return $this->roles[$userId] ?? collect();
    }
}
