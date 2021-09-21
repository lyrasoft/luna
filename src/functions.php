<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

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
            $role->setTitle($title);
            $role->setDescription($desc);
            $role->setState(BasicState::PUBLISHED());

            return new Node($role, AccessService::injectIdToRoles($children));
        }
    }
}

