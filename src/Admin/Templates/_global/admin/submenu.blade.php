<?php
/**
 * @var $helper \Lyrasoft\Merlin\Admin\Helper\MenuHelper
 * @var $router \Windwalker\Core\Router\PackageRouter
 */
?>

<h3 class="visible-xs-block">
    @translate('phoenix.title.submenu')
</h3>

<ul class="nav nav-stacked nav-pills">
    <li class="{{ $helper->menu->active('categories') }}">
        <a href="#">
            @translate('admin.categories.title')
        </a>
    </li>

    <li class="{{ $helper->menu->active('categories') }}">
        <a href="{{ $router->html('categories') }}">
            @translate('admin.categories.title')
        </a>
    </li>

	<li class="{{ $helper->menu->active('articles') }}">
		<a href="{{ $router->html('articles') }}">
			@translate('admin.articles.title')
		</a>
	</li>

    {{-- @muse-placeholder  submenu  Do not remove this line --}}
</ul>
