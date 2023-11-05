<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\User\PasswordInterface;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\BatchAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\Core\Attributes\Ref;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\ORM\Event\BeforeSaveEvent;

/**
 * The UserRepository class.
 */
#[Repository(entityClass: User::class)]
class UserRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use ManageRepositoryTrait;
    use ListRepositoryTrait;
    use TranslatorTrait;

    public function __construct(protected PasswordInterface $password, protected LunaPackage $lunaPackage)
    {
    }

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(User::class);

        return $selector;
    }

    #[ConfigureAction(SaveAction::class)]
    protected function configureSaveAction(SaveAction $action): void
    {
        $action->prepareSave(
            function (PrepareSaveEvent $event) {
                $data = &$event->getData();

                if ($data['password'] ?? null) {
                    if ($data['password'] !== $data['password2']) {
                        throw new ValidateFailException('Password not match');
                    }

                    $data['password'] = $this->password->hash($data['password']);

                    unset($data['password2']);
                } else {
                    unset($data['password']);
                }
            }
        );

        $action->beforeSave(
            function (BeforeSaveEvent $event) {
                $data = &$event->getData();

                $loginName = $this->lunaPackage->getLoginName();

                $account = $data[$loginName];

                $exists = $this->getEntityMapper()->select()
                    ->where($loginName, $account)
                    ->where('id', '!=', $data['id'] ?? null)
                    ->get();

                if ($exists) {
                    throw new ValidateFailException($this->trans('luna.message.user.account.exists'));
                }

                if ($loginName !== 'email') {
                    $email = $data['email'];

                    $exists = $this->getEntityMapper()->select()
                        ->where('email', $email)
                        ->where('id', '!=', $data['id'] ?? null)
                        ->get();

                    if ($exists) {
                        throw new ValidateFailException($this->trans('luna.message.user.email.exists'));
                    }
                }
            }
        );
    }

    #[ConfigureAction(ReorderAction::class)]
    protected function configureReorderAction(ReorderAction $action): void
    {
        //
    }

    #[ConfigureAction(BatchAction::class)]
    protected function configureBatchAction(BatchAction $action): void
    {
        //
    }
}
