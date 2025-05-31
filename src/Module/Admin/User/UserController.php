<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\User;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
use Lyrasoft\Luna\LunaPackage;
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
use Windwalker\Core\Attributes\JsonApi;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\Event\AfterSaveEvent;
use Windwalker\ORM\Event\BeforeDeleteEvent;
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Symbol;

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
        UserService $userService,
        SRPService $srpService,
    ): mixed {
        $controller->beforeSave(
            function (BeforeSaveEvent $event) use ($srpService, $app) {
                $data = &$event->data;

                if ($srpService->isEnabled()) {
                    $data = $srpService->handleRegister($app, $data);
                }
            }
        );

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($userService, $repository, $uploadService, $app) {
                $data = $event->data;
                /** @var User $user */
                $user = $event->entity;
                $files = $app->file('item');

                $user->setId((int) $data['id']);

                unset($data['password']);

                $data['avatar'] = $uploadService->handleFileIfUploaded(
                    $files['avatar'] ?? null,
                    'images/avatar/' . md5((string) $data['id']) . '.jpg'
                )
                    ?->getUri(true) ?? $data['avatar'];

                // User Roles
                $roles = $app->input('item')['roles'] ?? null;

                if ($roles !== null && $userService->can(AccessService::ROLE_MODIFY_ACTION)) {
                    $app->call([$this, 'saveUserRoles'], ['user' => $user, 'roles' => $roles]);
                }

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

    public function saveUserRoles(
        User $user,
        array $roles,
        AppContext $app,
        ORM $orm,
        AccessService $accessService
    ): void {
        $me = $accessService->getUser();
        $iAmSuperUser = $accessService->isSuperUser($me);
        $theyAreSuperUser = $accessService->isSuperUser($user);

        if ($theyAreSuperUser && !$iAmSuperUser) {
            return;
        }

        $basicRoles = array_map(static fn (UserRole $role) => $role->getId(), $accessService->getBasicRoles());

        // Add basic role if is empty
        $roles = $roles ?: $basicRoles;
        $roles = array_unique($roles);

        $maps = [];
        $newRolesIsSuperUser = false;

        foreach ($roles as $role) {
            $maps[] = $map = new UserRoleMap();
            $map->setUserId($user->getId());
            $map->setRoleId($role);

            if (!$newRolesIsSuperUser) {
                $newRolesIsSuperUser = $accessService->isSuperUserRole($role);
            }
        }

        $conditions = ['user_id' => $user->getId()];

        // If I'm not superuser, always ignore superuser roles
        // This will prevent a non-superuser delete another superuser's role
        // And we also must prevent a superuser delete own superuser roles
        if (!$iAmSuperUser || !$newRolesIsSuperUser) {
            $superUserRoles = $accessService->getRolesAllowAction(AccessService::SUPERUSER_ACTION);
            $superUserRoles = array_map([$accessService, 'unwrapRole'], $superUserRoles);

            $conditions[] = ['role_id', 'not in', $superUserRoles];
        }

        $orm->flush(UserRoleMap::class, $maps, $conditions);
    }

    public function delete(
        AppContext $app,
        #[Autowire] UserRepository $repository,
        CrudController $controller
    ): mixed {
        $controller->beforeDelete(function (BeforeDeleteEvent $event) use ($app) {
            /** @var User $entity */
            $entity = $event->entity;

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

    #[JsonApi]
    public function accountCheck(AppContext $app, LunaPackage $lunaPackage, UserService $userService): array
    {
        $field = $app->input('field');
        $value = $app->input('value');

        if ($field !== 'email') {
            $field = $lunaPackage->getLoginName() ?? 'username';
        }

        $user = $userService->load([$field => $value]);

        return ['exists' => (bool) $user];
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

        return $nav->to('user_list');
    }
}
