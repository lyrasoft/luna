<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\UserRole;
use Unicorn\Enum\BasicState;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Form\Field\ListField;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;

use function Windwalker\value;

class UserRoleListField extends ListField
{
    #[Inject]
    protected AccessService $accessService;

    protected ?bool $loadDbRoles = null;

    protected bool $publishedOnly = false;

    protected function prepareOptions(): array
    {
        $roles = $this->accessService->getSelectableRoles();

        $options = [];

        $iAmSuperUser = $this->accessService->isSuperUser();

        foreach ($roles as $value => $text) {
            if ($text instanceof EnumTranslatableInterface || is_numeric($value)) {
                $value = value($text);
                $text = $this->accessService->wrapUserRole($value)?->title ?? $value;
            }

            if (!$iAmSuperUser && $this->accessService->isSuperUserRole($value)) {
                continue;
            }

            $options[] = static::createOption($text, (string) $value);
        }

        if ($this->loadDbRoles ?? $this->accessService->isDbRolesEnabled()) {
            $dbRoles = $this->accessService->loadDBRoles();

            foreach ($dbRoles->getChildren() as $dbRole) {
                if ($this->publishedOnly && $dbRole->getValue()->state === BasicState::UNPUBLISHED) {
                    continue;
                }

                /** @var UserRole $role */
                $role = $dbRole->getValue();

                $options[] = static::createOption($role->title, (string) $role->id);
            }
        }

        return $options;
    }

    public function isLoadDbRoles(): ?bool
    {
        return $this->loadDbRoles;
    }

    public function loadDbRoles(?bool $loadDbRoles): static
    {
        $this->loadDbRoles = $loadDbRoles;

        return $this;
    }

    public function isPublishedOnly(): bool
    {
        return $this->publishedOnly;
    }

    public function publishedOnly(bool $publishedOnly): static
    {
        $this->publishedOnly = $publishedOnly;

        return $this;
    }

    /**
     * @return  array
     */
    protected function getAccessors(): array
    {
        return array_merge(
            parent::getAccessors(),
            []
        );
    }
}
