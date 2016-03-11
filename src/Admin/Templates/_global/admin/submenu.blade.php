<?php
/**
 * @var $helper \Lyrasoft\Luna\Admin\Helper\MenuHelper
 * @var $router \Windwalker\Core\Router\PackageRouter
 */
?>

<h3 class="visible-xs-block">
    @translate('phoenix.title.submenu')
</h3>

<ul class="nav nav-stacked nav-pills">
    <li class="{{ $helper->menu->active('categories') }}">
        <a href="#">
            @translate($lunaPrefix . 'categories.title')
        </a>
    </li>

    <li class="{{ $helper->menu->active('categories') }}">
        <a href="{{ $router->html('categories') }}">
            @translate($lunaPrefix . 'categories.title')
        </a>
    </li>

	<li class="{{ $helper->menu->active('articles') }}">
		<a href="{{ $router->html('articles') }}">
			@translate($lunaPrefix . 'articles.title')
		</a>
	</li>

    {{-- @muse-placeholder  submenu  Do not remove this line --}}
</ul>
