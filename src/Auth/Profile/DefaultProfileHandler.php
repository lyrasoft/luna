<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth\Profile;

use Hybridauth\Adapter\AdapterInterface;
use Lyrasoft\Luna\LunaPackage;

/**
 * The DefaultProfileHandler class.
 */
class DefaultProfileHandler implements ProfileHandlerInterface
{
    public function __construct(protected LunaPackage $luna)
    {
    }

    public function handle(AdapterInterface $adapter): array
    {
        $userProfile = $adapter->getUserProfile();
        $loginName = $this->luna->getLoginName();

        $user = [];

        if ($loginName !== 'email') {
            $username = strtolower(
                str_replace(
                    ' ',
                    '',
                    $userProfile->displayName
                )
            );
            $user[$loginName] = $username . '-' . $userProfile->identifier;
        }

        $user['email'] = $userProfile->email;
        $user['name'] = $userProfile->displayName;

        return $user;
    }

    public function getLoginName(): string
    {
        return 'email';
    }
}
