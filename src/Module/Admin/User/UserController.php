<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\User;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
use Lyrasoft\Luna\Module\Admin\User\Form\EditForm;
use Lyrasoft\Luna\Repository\UserRepository;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\UserService;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Upload\FileUploadService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\Event\AfterSaveEvent;
use Windwalker\ORM\Event\BeforeDeleteEvent;
use Windwalker\Utilities\Symbol;

use function Windwalker\value;

/**
 * The UserController class.
 */
#[Controller()]
class UserController
{
    use TranslatorTrait;

    public function save(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        #[Autowire] UserRepository $repository,
        #[Autowire] EditForm $form,
        FileUploadService $uploadService,
        AccessService $accessService,
    ): mixed {
        $controller->afterSave(
            function (AfterSaveEvent $event) use ($accessService, $repository, $uploadService, $app) {
                $data = $event->getData();
                $files = $app->file('item');

                unset($data['password']);

                $data['avatar'] = $uploadService->handleFileIfUploaded(
                    $files['avatar'] ?? null,
                    'images/avatar/' . md5((string) $data['id']) . '.jpg'
                )
                    ?->getUri(true) ?? $data['avatar'];

                $roles = $accessService->getAllowedRolesForUser($data['id']);
                
                show($roles);
                exit(' @Checkpoint');

                // User Roles
                $orm = $event->getORM();
                $roles = $app->input('item')['roles'];
                $basicRole = $accessService->unwrapRole($app->config('user.basic_role'));

                if ($basicRole) {
                    $roles[] = $basicRole;
                    $roles = array_unique($roles);
                }

                $superUserRoles = $accessService->getRolesAllowAction(AccessService::SUPERUSER_ACTION);
                $superUserRoles = array_map(static fn (UserRole $role) => $role->getId(), $superUserRoles);

                $maps = [];

                foreach ($roles as $role) {
                    $maps[] = $map = new UserRoleMap();
                    $map->setUserId((int) $data['id']);
                    $map->setRoleId($role);
                }

                $orm->flush(
                    UserRoleMap::class,
                    $maps,
                    [
                        'user_id' => $data['id'],
                        ['role_id', 'not in', $superUserRoles]
                    ]
                );

                $repository->save($data);
            }
        );

        $uri = $app->call([$controller, 'save'], compact('repository', 'form'));

        switch ($app->input('task')) {
            case 'save2close':
                return $nav->to('user_list');

            case 'save2new':
                return $nav->to('user_edit')->var('new', 1);

            case 'save2copy':
                $controller->rememberForClone($app, $repository);

                return $nav->self($nav::WITHOUT_VARS)->var('new', 1);

            default:
                return $uri;
        }
    }

    public function delete(
        AppContext $app,
        #[Autowire] UserRepository $repository,
        CrudController $controller
    ): mixed {
        $controller->beforeDelete(function (BeforeDeleteEvent $event) use ($app) {
            /** @var User $entity */
            $entity = $event->getEntity();

            $userService = $app->service(UserService::class);
            $user = $userService->getCurrentUser();

            if ($entity->getId() === $user->getId()) {
                throw new ValidateFailException(
                    $this->trans('luna.user.message.cant.delete.self')
                );
            }
        });

        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire] UserRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(
        AppContext $app,
        #[Autowire] UserRepository $repository,
        GridController $controller
    ): mixed {
        if ($app->input('task') === 'resend') {
            return $app->call([$this, 'resend']);
        }

        if ($app->input('task') === 'switchUser') {
            return $app->call([$this, 'switch']);
        }

        if ($app->input('task') === 'recover') {
            return $app->call([$this, 'recover']);
        }

        $data = match ($app->input('task')) {
            'enable' => ['enabled' => 1],
            'disable' => ['enabled' => 0],
            'activate' => ['verified' => 1, 'enabled' => 1, 'activation' => Symbol::empty()],
            default => null
        };

        return $app->call([$controller, 'batch'], compact('repository', 'data'));
    }

    public function resend(AppContext $app, ActivationService $activationService, Navigator $nav): RouteUri
    {
        $ids = (array) $app->input('id');

        foreach ($ids as $id) {
            $activationService->sendActivateMail($id);
        }

        $app->addMessage(
            $this->trans('luna.message.batch.resend.activation.success', count: count($ids)),
            'success'
        );

        return $nav->to('user_list');
    }

    public function copy(
        AppContext $app,
        #[Autowire] UserRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'copy'], compact('repository'));
    }

    public function switch(
        AppContext $app,
        Navigator $nav,
        UserService $userService,
        UserSwitchService $userSwitchService
    ): mixed {
        $ids = $app->input('id');
        $id = array_shift($ids);

        $stage = $app->input('stage');
        $options = (array) $app->input('options');

        if (!$id) {
            $app->addMessage('No User ID', 'warning');

            return $nav->back();
        }

        $user = $userService->load($id);

        if (!$user) {
            $app->addMessage('User not found', 'warning');

            return $nav->back();
        }

        if ($stage === 'front') {
            $userSwitchService->frontendLogin($user, $options);
        } else {
            $userSwitchService->switch($user, $options);
        }

        $app->addMessage($this->trans('luna.message.user.switch.success', $user->name), 'success');

        return $nav->back();
    }

    public function recover(
        AppContext $app,
        Navigator $nav,
        UserSwitchService $userSwitchService
    ): mixed {
        $userSwitchService->recover();

        $app->addMessage($this->trans('luna.message.user.recover.success'), 'success');

        return $nav->back();
    }
}
