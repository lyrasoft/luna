<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Core;

use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\Filesystem\Path;
use Windwalker\Uri\UriNormalizer;
use Windwalker\Utilities\Str;

/**
 * The LocaleController class.
 */
#[Controller]
class LocaleController
{
    public function switch(string $alias, AppContext $app, Navigator $nav, LocaleService $localeService): RouteUri
    {
        $return = $app->input('return');

        if ($return) {
            $return = Base64Url::decode($return);
        }

        $nav->cacheReset();

        $previousLang = $localeService->getCurrentLanguage();
        $lang = $localeService->getLanguageByAlias($alias);

        if (!$lang) {
            throw new \RangeException('Language ' . $alias . ' not exists.', 404);
        }

        $localeService->setLocale($lang->getCode());

        if ($return) {
            $uri = $app->getSystemUri();
            $scriptName = $uri->getScriptName('index.php');
            $root = $uri->root() . $scriptName;
            $path = ltrim(Str::removeLeft($return, UriNormalizer::clean($root)), '/');
            $path = Str::removeLeft($path, $previousLang?->getAlias() . '/');

            $path = $lang->getAlias() . '/' . $path;

            $path = Str::removeLeft($scriptName . '/' . $path, '/');

            $return = $nav->createRouteUri($uri->root($path));
        } else {
            $return = $nav->to('home');
        }

        return $return;
    }
}
