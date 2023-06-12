<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use Hybridauth\Storage\StorageInterface;
use Windwalker\Session\Session;

/**
 * The HASessionStorage class.
 */
class HASessionStorage implements StorageInterface
{
    /**
     * Namespace
     *
     * @var string
     */
    protected string $storeNamespace = 'HYBRIDAUTH::STORAGE';

    public function __construct(protected Session $session)
    {
    }

    public function get($key)
    {
        return $this->session->get($this->storeNamespace)[$key] ?? null;
    }

    public function set($key, $value)
    {
        $store = $this->session->get($this->storeNamespace) ?? [];

        $store[$key] = $value;

        $this->session->set($this->storeNamespace, $store);
    }

    public function delete($key)
    {
        $store = &$this->session->get($this->storeNamespace);

        unset($store[$key]);
    }

    public function deleteMatch($key)
    {
        $store = &$this->session->get($this->storeNamespace);

        if (!$store) {
            return;
        }

        foreach ($store as $k => $v) {
            if (str_contains($k, $key)) {
                unset($store[$k]);
            }
        }
    }

    public function clear()
    {
    }
}
