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
use Lyrasoft\Luna\PageBuilder\PageService;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Filesystem\Path;
use Windwalker\ORM\ORM;

/**
 * The PageView class.
 */
#[ViewModel(
    layout: 'page',
)]
class PageView implements ViewModelInterface
{
    /**
     * Constructor.
     */
    public function __construct(
        protected ORM $orm,
        protected HtmlFrame $htmlFrame,
        protected PageService $pageService
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
     */
    public function prepare(AppContext $app, View $view): array
    {
        $path = $app->input('path');

        if (!$path) {
            throw new RouteNotFoundException();
        }

        // Load root layout
        $file = $app->path('@views/front/page/' . Path::normalize($path) . '.blade.php');

        if (!is_file($file)) {
            // Load self layout
            $ref = new \ReflectionClass($this);
            $file = dirname($ref->getFileName()) . '/views/' . Path::normalize($path) . '.blade.php';
        }

        if (is_file($file)) {
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

        /** @var Page|null $page */
        $page = $this->orm->mapper(Page::class)->findOne(['alias' => $path]);

        if (!$page) {
            throw new RouteNotFoundException();
        }

        $previewSecret = $app->input('preview');

        if (
            $page->getState()->equals(BasicState::UNPUBLISHED())
            && (!$previewSecret || !$this->pageService->secretVerify($page->getId(), (string) $previewSecret))
        ) {
            throw new RouteNotFoundException();
        }

        $rows = $page->getContent();
        $css = $page->getCss();

        $this->prepareMeta($page, $page->getMeta());

        return compact(
            'rows',
            'css',
            'page'
        );
    }

    public function prepareMeta(Page $page, array $meta): void
    {
        if ($meta['meta_desc'] ?? null) {
            $this->htmlFrame->setDescription($meta['meta_desc']);
        }

        if ($meta['og_desc'] ?? null) {
            $this->htmlFrame->addOpenGraph('og:description', $meta['og_desc']);
        }

        if ($meta['meta_keyword'] ?? null) {
            $this->htmlFrame->addMetadata('keywords', $meta['meta_keyword'], true);
        }

        if ($page->getImage()) {
            $this->htmlFrame->setCoverImages($page->getImage());
        }

        if ($meta['meta_title'] ?? null) {
            $this->htmlFrame->setTitle($meta['meta_title']);
        } else {
            $this->htmlFrame->setTitle($page->getTitle());
        }

        if ($meta['og_title']) {
            $this->htmlFrame->addOpenGraph('og:title', $meta['og_title'], true);
        }
    }
}
