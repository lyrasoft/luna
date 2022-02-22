<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Page;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Module\Admin\Page\Form\EditForm;
use Lyrasoft\Luna\PageBuilder\PageService;
use Lyrasoft\Luna\Repository\PageRepository;
use Unicorn\Image\ImagePlaceholder;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\StrNormalize;

/**
 * The PageEditView class.
 */
#[ViewModel(
    layout: 'page-edit',
    js: 'page-edit.js'
)]
class PageEditView implements ViewModelInterface
{
    use TranslatorTrait;

    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        protected PageService $pageService,
        protected UnicornScript $unicornScript,
        #[Autowire] protected PageRepository $repository
    ) {
    }

    /**
     * Prepare
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $id = $app->input('id');

        /** @var Page|null $item */
        $item = $this->repository->getItem($id);

        $form = $this->formFactory
            ->create(EditForm::class)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            )
            ->fill(
                [
                    'meta' => static::asSnakes($item?->getMeta()->dump() ?? [])
                ]
            );

        $this->prepareScripts($app, $item, $form);

        $this->prepareMetadata($app, $view);

        return compact('form', 'id', 'item');
    }

    protected static function asSnakes(array $values): array
    {
        $items = [];

        foreach ($values as $key => $value) {
            $items[StrNormalize::toSnakeCase($key)] = $value;
        }

        return $items;
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
                $this->trans('unicorn.title.edit', title: 'Page')
            );
    }

    protected function prepareScripts(AppContext $app, ?Page $item, Form $form)
    {
        $imagePlaceholder = $app->service(ImagePlaceholder::class);

        $addons = [];

        foreach ($this->pageService->getAddonTypes() as $addonType) {
            $class = $addonType->getClassName();
            $class::loadVueComponent($app);

            $addons[$addonType->getType()] = $addonType->toArray($this->lang);
        }

        $this->unicornScript->data('builder-content', $item?->getContent() ?? []);
        $this->unicornScript->data('addons', $addons);

        $this->unicornScript->addRoute(
            'loading_image',
            $imagePlaceholder->ajaxLoader()
        );

        $this->unicornScript->addRoute(
            '@file_upload',
            $this->nav->to('file_upload')->var('profile', 'image')
        );

        $this->unicornScript->addRoute('@page_ajax');
    }
}
