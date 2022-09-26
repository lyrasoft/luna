<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Page;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\PageBuilder\PageService;
use ReflectionClass;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Exception\SassException;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Filesystem\Path;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Attributes\Prop;

/**
 * The PageView class.
 */
#[ViewModel(
    layout: 'page',
)]
class PageView implements ViewModelInterface
{
    use LocaleAwareTrait;

    #[Prop]
    protected mixed $id = null;

    /**
     * Constructor.
     */
    public function __construct(
        protected ORM $orm,
        protected HtmlFrame $htmlFrame,
        protected PageService $pageService,
        protected AssetService $asset,
    ) {
        //
    }

    /**
     * Prepare View.
     *
     * @param  AppContext  $app   The web app context.
     * @param  View        $view  The view object.
     *
     * @return  mixed
     * @throws \ReflectionException
     * @throws SassException
     */
    public function prepare(AppContext $app, View $view): array
    {
        $path = $app->input('path');

        if ($path) {
            // Load root layout
            $file = $app->path('@views/front/page/' . Path::normalize($path) . '.blade.php');

            if (!is_file($file)) {
                // Load front module layout
                $file = WINDWALKER_SOURCE . '/Module/Front/Page/views/' . Path::normalize($path) . '.blade.php';
            }

            if (!is_file($file)) {
                // Load self layout
                $ref = new ReflectionClass($this);
                $file = dirname($ref->getFileName()) . '/views/' . Path::normalize($path) . '.blade.php';
            }

            if (is_file($file)) {
                if (str_starts_with(static::class, 'Lyrasoft\\')) {
                    $view->addPath(WINDWALKER_SOURCE . '/Module/Front/Page/views/');
                }

                // Render layout file
                $layout = Path::normalize($path, '.');
                $view->setLayout($layout);

                if (!$app->isDebug()) {
                    $protects = $app->config('pages.protects');

                    foreach ($protects as $protect) {
                        if (str_starts_with($layout, $protect)) {
                            throw new RouteNotFoundException();
                        }
                    }
                }

                return compact('layout');
            }
        }

        /** @var Page|null $page */
        $page = null;

        if ($this->id) {
            $page = $this->orm->mapper(Page::class)->findOne($this->id);
        }

        if (!$page) {
            $conditions = ['alias' => $path];

            if ($this->isLocaleEnabled()) {
                $conditions['language'] = $this->getLocale();
            }

            $page = $this->orm->mapper(Page::class)->mustFindOne($conditions);
        }

        $previewSecret = $app->input('preview');

        if (
            $page->getState()->equals(BasicState::UNPUBLISHED())
            && (!$previewSecret || !$this->pageService->secretVerify($page->getId(), (string) $previewSecret))
        ) {
            throw new RouteNotFoundException();
        }

        $rows = $page->getContent();

        $css = $this->renderCSS($page);

        $this->prepareMeta($page);

        return compact(
            'rows',
            'css',
            'page'
        );
    }

    public function prepareMeta(Page $page): void
    {
        $meta = $page->getMeta();

        $this->htmlFrame->setDescriptionIfNotEmpty($meta->getDescription());

        if (trim($meta->getOgDescription()) !== '') {
            $this->htmlFrame->addOpenGraph('og:description', $meta->getOgDescription(), true);
        }

        if (trim($meta->getKeywords()) !== '') {
            $this->htmlFrame->addMetadata('keywords', $meta->getKeywords(), true);
        }

        if ($page->getImage()) {
            $this->htmlFrame->setCoverImages($page->getImage());
        }

        if (trim($meta->getTitle()) !== '') {
            $this->htmlFrame->setTitle($meta->getTitle());
        } else {
            $this->htmlFrame->setTitle($page->getTitle());
        }

        if ($meta->getOgTitle()) {
            $this->htmlFrame->addOpenGraph('og:title', $meta->getOgTitle(), true);
        }
    }

    /**
     * getCss
     *
     * @param  Page  $page
     *
     * @return  string
     *
     * @throws \ScssPhp\ScssPhp\Exception\SassException
     */
    protected function renderCSS(Page $page): string
    {
        $css = $page->getCss();

        $scss = new Compiler();

        $css = $scss->compileString($css)->getCss();
        $this->asset->internalCSS($css);

        return $css;
    }
}
