<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Field\MenuModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use Lyrasoft\Luna\Services\MenuService;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;
use Windwalker\Uri\Uri;

/**
 * The AliasMenuView class.
 */
class AliasMenuView extends AbstractMenuView
{
    use TranslatorTrait;

    public function __construct(protected ORM $orm, protected MenuService $menuService)
    {
    }

    /**
     * @inheritDoc
     */
    public static function getName(): string
    {
        return 'menu_alias';
    }

    /**
     * @inheritDoc
     */
    protected function defineVariablesForm(Form $form): void
    {
        $form->add('target', MenuModalField::class)
            ->label($this->trans('luna.menu.alias.target'));
    }

    /**
     * @inheritDoc
     */
    protected function defineParamsForm(Form $form): void
    {
    }

    /**
     * prepareVariablesStore
     *
     * @param array $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesStore(array &$variables): void
    {
        parent::prepareVariablesStore($variables);

        $target = $variables['target'];

        $variables['type'] = $this->orm->findResult(Menu::class, 'type', $target);
    }

    /**
     * @inheritDoc
     */
    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        $menu = $this->findTarget($variables, $params);

        if (!$menu) {
            return new Uri('javascript://');
        }

        return $menu->route($nav);
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        $menu = $this->findTarget($variables, $params);

        if (!$menu) {
            return false;
        }

        return $menu->isActive(true);
    }

    /**
     * findTarget
     *
     * @param array $variables
     * @param array $params
     *
     * @return  DbMenuNode|null
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  1.7
     */
    protected function findTarget(array $variables, array $params): ?DbMenuNode
    {
        $menuId = $variables['target'] ?? 0;

        $menus = $this->menuService->getMenusTree($variables['type'] ?? '');

        return $menus->getMenuById($menuId);
    }
}
