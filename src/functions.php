<?php

declare(strict_types=1);

namespace Lyrasoft\Luna {

    use Lyrasoft\Luna\Access\AccessService;
    use Lyrasoft\Luna\Entity\UserRole;
    use Lyrasoft\Luna\Tree\Node;
    use Unicorn\Enum\BasicState;

    if (!function_exists('Lyrasoft\Luna\create_role')) {
        function create_role(string $title, string $desc = '', array $children = []): Node
        {
            $role = new UserRole();
            $role->title = $title;
            $role->description = $desc;
            $role->state = BasicState::PUBLISHED;

            return new Node($role, AccessService::injectIdToRoles($children));
        }
    }
}
