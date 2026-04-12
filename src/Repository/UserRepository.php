<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\BatchAction;
use Unicorn\Repository\Actions\DeleteAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
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
    use PasswordHandleTrait;

    protected bool $processPassword = true;

    public function __construct(
        protected PasswordHasherInterface $password,
        protected LunaPackage $lunaPackage,
    ) {
    }

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(User::class);

        return $selector;
    }

    /**
     * @template T or object
     *
     * @param  array|T  $item
     * @param  int      $options
     *
     * @return  T
     */
    public function saveWithoutProcessPassword(array|object $item, int $options = 0): object
    {
        $this->processPassword = false;

        $item = $this->save($item, $options);

        $this->processPassword = true;

        return $item;
    }

    #[ConfigureAction(SaveAction::class)]
    protected function configureSaveAction(SaveAction $action): void
    {
        $action->prepareSave(
            function (PrepareSaveEvent $event) {
                $data = &$event->data;

                if ($this->processPassword) {
                    if ($data['password'] ?? null) {
                        // If has password, means user wants to change password
                        $data = $this->prepareUserPasswordData($data);
                    } else {
                        unset($data['password'], $data['password2']);
                    }
                }
            }
        );

        $action->beforeSave(
            function (BeforeSaveEvent $event) {
                $data = &$event->data;

                $this->checkUserLoginNameExists($data);
            }
        );
    }

    /**
     * @throws ValidateFailException
     */
    public function checkUserLoginNameExists(array|User $user): void
    {
        if ($user instanceof User) {
            $user = $this->getEntityMapper()->extract($user);
        }

        $loginName = $this->lunaPackage->getLoginName();

        $account = $user[$loginName];

        $exists = $this->getEntityMapper()->select()
            ->where($loginName, $account)
            ->where('id', '!=', $user['id'] ?? null)
            ->get();

        if ($exists) {
            throw new ValidateFailException($this->trans('luna.message.user.account.exists'));
        }

        if ($loginName !== 'email') {
            $email = $user['email'];

            $exists = $this->getEntityMapper()->select()
                ->where('email', $email)
                ->where('id', '!=', $user['id'] ?? null)
                ->get();

            if ($exists) {
                throw new ValidateFailException($this->trans('luna.message.user.email.exists'));
            }
        }
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

    #[ConfigureAction(DeleteAction::class)]
    protected function configureDeleteAction(DeleteAction $action): void
    {
        //
    }
}
