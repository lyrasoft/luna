<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Page;

use Lyrasoft\Luna\Entity\Config;
use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Entity\PageTemplate;
use Lyrasoft\Luna\Module\Admin\Page\Form\EditForm;
use Lyrasoft\Luna\Repository\PageRepository;
use Lyrasoft\Luna\Services\ConfigService;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Image\ImagePlaceholder;
use Unicorn\Upload\FileUploadService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Arr;

use function Windwalker\collect;

/**
 * The PageController class.
 */
#[Controller()]
class PageController
{
    public function create(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        #[Autowire] PageRepository $repository,
    ): mixed {
        /** @var Page $page */
        $page = $repository->save([]);

        return $nav->to('page_edit')->id($page->getId())->var('new', 1);
    }

    public function delete(
        AppContext $app,
        #[Autowire] PageRepository $repository,
        CrudController $controller
    ): mixed {
        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire] PageRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(
        AppContext $app,
        #[Autowire] PageRepository $repository,
        GridController $controller
    ): mixed {
        $task = $app->input('task');
        $data = match ($task) {
            'publish' => ['state' => 1],
            'unpublish' => ['state' => 0],
            default => null
        };

        return $app->call([$controller, 'batch'], compact('repository', 'data'));
    }

    public function copy(
        AppContext $app,
        #[Autowire] PageRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'copy'], compact('repository'));
    }

    public function ajax(AppContext $app): mixed
    {
        return $app->call([$this, $app->input('task')]);
    }

    /**
     * savePage
     *
     * @param  AppContext         $app
     * @param  PageRepository     $repository
     * @param  FileUploadService  $fileUploadService
     *
     * @return array
     *
     * @throws \Exception
     * @since  1.8.8
     */
    public function savePage(
        AppContext $app,
        #[Autowire]
        PageRepository $repository,
        FileUploadService $fileUploadService,
    ): array {
        $item = $app->input('item');

        /** @var Page $entity */
        $entity = $repository->save($item);

        $image = $fileUploadService->handleFileIfUploaded(
                $app->file('item')['image'] ?? null,
                'images/pages/' . md5((string) $entity->getId()) . '.{ext}'
            )?->getUri() ?? $item['image'];

        $entity->setImage((string) $image);

        $repository->save($entity);

        return [
            'item' => $entity,
        ];
    }

    /**
     * getTemplates
     *
     * @param  ConfigService  $configService
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  1.8
     */
    public function getTemplates(
        AppContext $app,
        ORM $orm,
        #[Autowire] ImagePlaceholder $imagePlaceholder
    ): array {
        $type  = $app->input('type');
        $types = Arr::explodeAndClear(',', $type);

        $mapper = $orm->mapper(PageTemplate::class);
        $templates = $mapper->findList([], Collection::class)
            ->all()
            ->map(
                function ($tmpl) {
                    $tmpl['can_delete'] = true;
                    return $tmpl;
                }
            )
            ->dump(true);

        $templates = array_merge(
            $templates,
            array_values($app->config('pages.templates') ?? [])
        );

        $found = [];

        foreach ($templates as $template) {
            $template = $this->value($template, $app);

            if (!in_array($template['type'], $types, true)) {
                continue;
            }

            if (!isset($template['content']) && isset($template['file'])) {
                $template['content'] = file_get_contents($this->value($template['file'], $app));
            }

            if (!empty($template['image'])) {
                $template['image'] = $this->value($template['image'], $app);
            } else {
                $template['image'] = $imagePlaceholder->placeholder();
            }

            $found[] = $template;
        }

        return $found;
    }

    /**
     * saveTemplate
     *
     * @param  AppContext  $app
     * @param  ORM         $orm
     *
     * @return object
     *
     * @throws \ReflectionException
     * @since  1.8
     */
    public function saveTemplate(AppContext $app, ORM $orm): object
    {
        $id      = (int) $app->input('id');
        $title   = $app->input('title');
        $description = $app->input('description');
        $type    = $app->input('type');
        $image   = $app->input('image');
        $content = $app->input('content');

        /** @var EntityMapper<PageTemplate> $mapper */
        $mapper = $orm->mapper(PageTemplate::class);

        if (!$title) {
            throw new \RuntimeException('No title');
        }

        $item = $mapper->findOne($id) ?? new PageTemplate();

        $item->setId($id ?: null);
        $item->setTitle($title);
        $item->setDescription($description);
        $item->setContent(json_decode($content, true));
        $item->setImage($image);
        $item->setType($type);

        return $mapper->saveOne($item);
    }

    /**
     * removeTemplate
     *
     * @param  AppContext  $app
     * @param  ORM         $orm
     *
     * @return PageTemplate|null
     *
     * @since  1.8
     */
    public function removeTemplate(AppContext $app, ORM $orm): ?PageTemplate
    {
        $id = $app->input('id');

        if (!$id) {
            throw new \RuntimeException('No ID');
        }

        $item = $orm->findOne(PageTemplate::class, $id);

        $orm->deleteWhere(PageTemplate::class, $id);

        return $item;
    }

    /**
     * value
     *
     * @param  mixed       $value
     * @param  AppContext  $app
     *
     * @return  mixed
     *
     * @throws \ReflectionException
     * @since  1.8
     */
    protected function value(mixed $value, AppContext $app): mixed
    {
        if (is_callable($value)) {
            return $app->getContainer()->call($value);
        }

        return $value;
    }
}
