{{-- Part of Front project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                  Package object.
 * @var $view     \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Legacy\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Windwalker\Legacy\Data\Data
 * @var $params   \Windwalker\Legacy\Structure\Structure
 */
?>
{!! $item->content !!}
