<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Profile;

use Lyrasoft\Luna\Module\Admin\User\Form\EditForm;
use Lyrasoft\Luna\Repository\UserRepository;
use Lyrasoft\Luna\User\UserService;
use Unicorn\Controller\CrudController;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Upload\FileUploadService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\Event\AfterSaveEvent;

/**
 * The ProfileController class.
 */
#[Controller(
    config: __DIR__ . '/profile.config.php'
)]
class ProfileController
{
    use TranslatorTrait;

    public function save(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        UserService $userService,
        #[Autowire] UserRepository $repository,
        #[Autowire] EditForm $form,
        FileUploadService $uploadService
    ): mixed {
        $controller->prepareSave(
            function (PrepareSaveEvent $event) use ($userService, $repository, $uploadService, $app) {
                $data = &$event->getData();

                $user = $userService->getUser();

                if (!$user) {
                    throw new ValidateFailException('User not found.');
                }

                $key = $repository->getEntityMapper()->getMainKey();
                $data[$key] = $user->getId();
            }
        );

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($repository, $uploadService, $app) {
                $data = $event->getData();
                $files = $app->file('item');

                unset($data['password']);

                $data['avatar'] = $uploadService->handleFileIfUploaded(
                    $files['avatar'] ?? null,
                    'images/avatar/' . md5((string) $data['id']) . '.jpg'
                )
                    ?->getUri(true) ?? $data['avatar'];

                $repository->save($data);
            }
        );

        $app->call([$controller, 'save'], compact('repository', 'form'));

        return $nav->self();
    }
}
