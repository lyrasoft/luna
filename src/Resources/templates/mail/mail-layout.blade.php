{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Core\Asset\AssetManager         The Asset manager.
 */
?>
<!DOCTYPE html>
<html lang="{{ $app->get('language.locale', 'en') }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ \Phoenix\Html\HtmlHeader::getSiteName() }}</title>
</head>
<body>
    {{-- Wrapper --}}
    <table style="width: 100%">
        <tr>
            <td align="center">
                {{-- Body --}}
                <table style="max-width: 700px">
                    <tr>
                        <td>
                            @yield('content', 'Content')
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
