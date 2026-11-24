<?php

declare(strict_types=1);

/**
 * Menu file fixture loaded by MenuBuilderTest::loadIncludesMenuFilesWithBuilderAndLangInScope().
 * $menu and $lang are provided by MenuBuilder::load() scope.
 *
 * @var  \Lyrasoft\Luna\Menu\MenuBuilder        $menu
 * @var  \Windwalker\Core\Language\LangService  $lang
 */

$menu->header('Loaded header');
$menu->text($lang instanceof \Windwalker\Core\Language\LangService ? 'lang-ok' : 'lang-missing');
