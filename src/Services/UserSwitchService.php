<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\ORM\ORM;
use Windwalker\Session\Session;

/**
 * The UserSwitchService class.
 */
class UserSwitchService
{
    public const ORIGIN_USER_ID_SESS_KEY = 'origin_user_id';
    public const USER_MASK_ID = 'user_mask_id';

    /**
     * UserSwitchService constructor.
     *
     * @param  ApplicationInterface  $app
     * @param  Session               $session
     * @param  UserService           $userService
     */
    public function __construct(
        protected ApplicationInterface $app,
        protected Session $session,
        protected UserService $userService
    ) {
        //
    }

    /**
     * getOriginUser
     *
     * @return  mixed
     *
     * @since  1.7
     */
    public function getOriginUserId(): mixed
    {
        return $this->session->get(static::ORIGIN_USER_ID_SESS_KEY);
    }

    /**
     * setOriginUser
     *
     * @param mixed $id
     *
     * @return  static
     *
     * @since  1.7
     */
    public function setOriginUserId(mixed $id): self
    {
        $this->session->set(static::ORIGIN_USER_ID_SESS_KEY, $id);

        return $this;
    }

    /**
     * hasSwitched
     *
     * @return  bool
     *
     * @since  1.7
     */
    public function hasSwitched(): bool
    {
        return $this->session->has(static::ORIGIN_USER_ID_SESS_KEY);
    }

    /**
     * removeOriginUser
     *
     * @return  static
     *
     * @since  1.7
     */
    public function removeOriginUserId(): self
    {
        $this->session->remove(static::ORIGIN_USER_ID_SESS_KEY);
        $this->session->remove('keepaccess');

        return $this;
    }

    /**
     * switch
     *
     * @param  UserEntityInterface  $targetUser
     * @param  array                $options
     *
     * @return  static
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \Windwalker\DI\Exception\DefinitionException
     * @since  1.7
     */
    public function switch(UserEntityInterface $targetUser, array $options = []): self
    {
        $userId = $this->getOriginUserId() ?: $this->userService->getUser()->getId();

        $this->setOriginUserId($userId);

        $this->userService->login($targetUser);

        if ($options['keepaccess'] ?? false) {
            $this->session->set(static::USER_MASK_ID, $userId);
        } else {
            $this->session->set(static::USER_MASK_ID, null);
        }

        return $this;
    }

    /**
     * frontendLogin
     *
     * @param  UserEntityInterface  $targetUser
     * @param  array                $options
     *
     * @return  static
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @since  1.7.14
     */
    public function frontendLogin(UserEntityInterface $targetUser, array $options = []): self
    {
        $userId = $this->getOriginUserId() ?: $this->userService->getUser()->getId();

        $backup = $_SESSION ?? [];
        $currentName = $this->session->getName();
        $sessName = $this->app->config('session.ini.name') ?? 'WINDWALKER_SESSID';

        $currentId = $this->session->getId();

        $this->session->stop();
        $this->session->setName($sessName);
        $this->session->start();
        $this->session->clear();
        $this->session->regenerate();

        $this->userService->login($targetUser);

        if ($options['keepaccess'] ?? false) {
            $this->session->set(static::USER_MASK_ID, $userId);
        } else {
            $this->session->set(static::USER_MASK_ID, null);
        }

        $this->session->stop();

        $this->session->setName($currentName);
        $this->session->getBridge()->setId($currentId);
        $this->session->start();

        if (isset($_SESSION)) {
            $_SESSION = $backup;
        }

        // foreach ($this->session->getBags() as $name => $bag) {
        //     if (isset($_SESSION['_' . $name])) {
        //         $bag->setData($_SESSION['_' . $name]);
        //     }
        // }

        return $this;
    }

    /**
     * recover
     *
     * @return  static
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \Windwalker\DI\Exception\DefinitionException
     * @since  1.7
     */
    public function recover(): self
    {
        $userId = $this->getOriginUserId();

        if (!$userId) {
            throw new ValidateFailException('No origin user');
        }

        $this->userService->login($userId);

        $this->removeOriginUserId();

        return $this;
    }
}
