<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\MetaRule;

use Lyrasoft\Luna\Entity\MetaRule;
use Lyrasoft\Luna\Repository\MetaRuleRepository;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Upload\FileUploadOptions;
use Unicorn\Upload\FileUploadService;
use Unicorn\Upload\ResizeConfig;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\DI\Attributes\Inject;
use Windwalker\ORM\Event\AfterSaveEvent;

#[Controller()]
class MetaRuleController
{
    public function save(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        #[Autowire]
        MetaRuleRepository $repository,
        #[Inject(tag: 'image')]
        FileUploadService $fileUploadService,
    ): mixed {
        $form = $app->make(MetaRuleEditForm::class);

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($app, $repository, $fileUploadService, &$uploaded) {
                /** @var MetaRule $entity */
                $entity = $event->entity;
                $meta = $entity->meta;

                $meta->ogImage = $fileUploadService->handleFileIfUploaded(
                    $app->file('item')['meta']['ogImage'] ?? null,
                    'images/meta-rule/og-' . hash('xxh128', (string) $entity->id) . '.{ext}',
                    new FileUploadOptions(
                        resize: new ResizeConfig(width: 1200, height: 630, crop: true)
                    )
                )?->getUriString(true) ?? $meta->ogImage ?? '';

                $event->data['meta'] = $meta;

                $repository->save($event->data);
            }
        );
        $uri = $app->call($controller->saveWithNamespace(...), compact('repository', 'form'));

        return match ($app->input('task')) {
            'save2close' => $nav->to('meta_rule_list'),
            default => $uri,
        };
    }

    public function delete(
        AppContext $app,
        #[Autowire]
        MetaRuleRepository $repository,
        CrudController $controller
    ): mixed {
        return $app->call($controller->delete(...), compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire]
        MetaRuleRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call($controller->filter(...), compact('repository'));
    }

    public function batch(
        AppContext $app,
        Navigator $nav,
        LangService $lang,
        #[Autowire]
        MetaRuleRepository $repository,
        GridController $controller
    ): mixed {
        $task = $app->input('task');
        $data = match ($task) {
            'publish' => ['state' => 1],
            'unpublish' => ['state' => 0],
            default => null
        };

        if ($data === null) {
            $data = (array) $app->input('batch');

            // Robots lives inside the meta JSON column, so it can't be batch-updated as a plain column
            $robots = (string) ($data['robots'] ?? '');
            unset($data['robots']);

            if ($robots !== '') {
                $ids = (array) $app->input('id');

                foreach ($ids as $id) {
                    /** @var MetaRule $item */
                    $item = $repository->getEntityMapper()->findOne($id);
                    $item->meta->robots = $robots === '__none__' ? '' : $robots;

                    $repository->save($item);
                }

                if (array_filter($data, static fn ($v) => (string) $v !== '') === []) {
                    $app->addMessage($lang->trans('unicorn.message.batch.update.success', count($ids)), 'success');

                    return $nav->back();
                }
            }
        }

        return $app->call($controller->batch(...), compact('repository', 'data'));
    }

    public function copy(
        AppContext $app,
        #[Autowire]
        MetaRuleRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call($controller->copy(...), compact('repository'));
    }
}
