<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Access\AccessService;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Form\Field\ListField;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;

use function Windwalker\value;

class UserRoleListField extends ListField
{
    #[Inject]
    protected AccessService $accessService;

    protected function prepareOptions(): array
    {
        $roles = $this->accessService->getSelectableRoles();

        $options = [];

        $iAmSuperUser = $this->accessService->isSuperUser();

        foreach ($roles as $value => $text) {
            if ($text instanceof EnumTranslatableInterface || is_numeric($value)) {
                $value = value($text);
                $text = $this->accessService->wrapUserRole($value)?->getTitle() ?? $value;
            }

            if (!$iAmSuperUser && $this->accessService->isSuperUserRole($value)) {
                continue;
            }

            $options[] = static::createOption($text, (string) $value);
        }

        return $options;
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
