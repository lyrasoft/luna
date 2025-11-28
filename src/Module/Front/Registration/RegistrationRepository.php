<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Registration;

use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\User\ActivationService;
use Symfony\Component\Mailer\SentMessage;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\CrudRepositoryInterface;
use Unicorn\Repository\CrudRepositoryTrait;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\ORM\EntityMapper;

/**
 * The RegistrationRepository class.
 */
#[Repository(User::class)]
class RegistrationRepository implements CrudRepositoryInterface
{
    use TranslatorTrait;
    use CrudRepositoryTrait;

    public function __construct(
        protected LunaPackage $luna,
        protected ActivationService $activationService,
        protected PasswordHasherInterface $hasher,
        protected SRPService $srpService,
    ) {
    }

    public function register(array|object $user, mixed $form = null): object
    {
        /** @var EntityMapper<User> $mapper */
        $mapper = $this->getEntityMapper();

        $user = $mapper->extract($user);
        $loginName = $this->luna->getLoginName();

        $oldUser = $this->getItem([$loginName => $user[$loginName]]);

        if ($oldUser) {
            throw new ValidateFailException(
                $this->trans('luna.message.user.account.exists')
            );
        }

        if (!$this->srpService->isEnabled()) {
            $password = $user['password'];
            $password2 = $user['password2'];

            if ($password !== $password2) {
                throw new ValidateFailException($this->trans('luna.message.password.not.match'));
            }

            $user['password'] = $this->hasher->hash($password);
            unset($user['password2']);
        }

        return $this->createSaveAction()
            ->processDataAndSave($user, $form);
    }

    public function activate(string $token): void
    {
        /** @var EntityMapper<User> $mapper */
        $mapper = $this->getEntityMapper();

        $payload = $this->activationService->decodeToken($token);
        $key = $mapper->getMainKey();

        $email = $payload['email'];
        $id = $payload[$key];

        /** @var User $user */
        $user = $this->getItem(['email' => $email, $key => $id]);

        $ac = $user->activation;

        if ($ac !== $token) {
            throw new ValidateFailException($this->trans('luna.message.activate.fail'));
        }

        $user->activation = '';
        $user->verified = true;
        $user->enabled = true;

        $mapper->updateOne($user);
    }

    public function sendActivateMail(mixed $id): SentMessage
    {
        $key = $this->getEntityMapper()->getMainKey();

        return $this->activationService->sendActivateMail([$key => $id]);
    }

    #[ConfigureAction(SaveAction::class)]
    public function configureSaveAction(SaveAction $saveAction): void
    {
        $saveAction->prepareSave(
            function (PrepareSaveEvent $event) {
                $data = &$event->data;

                $data['enabled'] ??= 0;
                $data['verified'] ??= 0;
            }
        );
    }
}
