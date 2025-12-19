<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Config;

use Lyrasoft\Luna\Repository\ConfigRepository;
use RuntimeException;
use Unicorn\Controller\AjaxControllerTrait;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;

use function Windwalker\chronos;

/**
 * The ConfigController class.
 */
#[Controller()]
class ConfigController
{
    use TranslatorTrait;
    use AjaxControllerTrait;

    public function save(AppContext $app, #[Autowire] ConfigRepository $repository, Navigator $nav): mixed
    {
        $vars = $app->getUrlVars();
        $type = (string) $vars['type'];
        $formClass = (string) $vars['form'];
        $subtype = (string) ($vars['subtype'] ?? null);

        $form = $app->make($formClass);

        try {
            $item = (array) $app->input('item');

            /** @var object $item */
            $action = $repository->createSaveAction();

            $item = $action->processDataAndValidate($item, $form);

            $item = [
                'type' => $type,
                'subtype' => (string) $subtype,
                'content' => $item,
                'modified' => chronos(),
                'modified_by' => null,
            ];

            $old = $repository->getItem(compact('type', 'subtype'));

            if ($old) {
                $repository->getEntityMapper()->updateOne($item);
            } else {
                $repository->getEntityMapper()->createOne($item);
            }

            $app->addMessage(
                $this->trans('unicorn.message.save.success'),
                'success'
            );

            return $nav->self();
        } catch (RuntimeException $e) {
            $item = $app->input('item');
            $repository->getState()->remember('edit.data', $item);

            throw $e;
        }
    }

    public function delete(AppContext $app, #[Autowire] ConfigRepository $repository, CrudController $controller): mixed
    {
        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(AppContext $app, #[Autowire] ConfigRepository $repository, GridController $controller): mixed
    {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(AppContext $app, #[Autowire] ConfigRepository $repository, GridController $controller): mixed
    {
        $task = $app->input('task');
        $data = match ($task) {
            'publish' => ['state' => 1],
            'unpublish' => ['state' => 0],
            default => null
        };

        return $app->call([$controller, 'batch'], compact('repository', 'data'));
    }

    public function copy(AppContext $app, #[Autowire] ConfigRepository $repository, GridController $controller): mixed
    {
        return $app->call([$controller, 'copy'], compact('repository'));
    }
}
