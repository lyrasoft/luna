<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Module\ModuleHelper;
use Lyrasoft\Luna\PageBuilder\AddonHelper;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Package\AbstractPackage;

define('LUNA_ROOT', dirname(__DIR__));
define('LUNA_SOURCE', LUNA_ROOT . '/src');
define('LUNA_SOURCE_ADMIN', LUNA_SOURCE . '/Admin');

/**
 * The LunaPackage class.
 *
 * @since  1.0
 */
class LunaPackage extends AbstractPackage
{
    /**
     * WarderPackage constructor.
     */
    public function __construct()
    {
        LunaHelper::setPackage($this);
    }

    /**
     * initialise
     *
     * @return  void
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     */
    public function boot()
    {
        parent::boot();

        Translator::loadAll($this);

        ModuleHelper::addPath(__NAMESPACE__ . '\Module', $this->getDir() . '/Module');
        AddonHelper::addPath(__NAMESPACE__ . '\PageBuilder', $this->getDir() . '/PageBuilder');
    }

    /**
     * isFrontend
     *
     * @param   string $name
     *
     * @return  boolean
     */
    public function isFrontend($name = null)
    {
        $package = $this->getCurrentPackage();

        if (!$package) {
            return false;
        }

        $name = $name ?: $package->getName();

        return in_array($name, (array) $this->get('frontend.package', 'front'), true);
    }

    /**
     * isFrontend
     *
     * @param   string $name
     *
     * @return  boolean
     */
    public function isAdmin($name = null)
    {
        $package = $this->getCurrentPackage();

        if (!$package) {
            return false;
        }

        $name = $name ?: $package->getName();

        return in_array($name, (array) $this->get('admin.package', 'admin'), true);
    }

    /**
     * isEnabled
     *
     * @param   string $name
     *
     * @return  boolean
     */
    public function isEnabled($name = null)
    {
        return $this->isFrontend($name) || $this->isAdmin($name);
    }

    /**
     * getCurrentPackage
     *
     * @return  AbstractPackage
     */
    public function getCurrentPackage()
    {
        if (!$this->container->exists('current.package')) {
            return null;
        }

        return $this->container->get('current.package');
    }

    /**
     * getLangPrefix
     *
     * @return  string
     */
    public function getLangPrefix()
    {
        if ($this->isAdmin()) {
            $langPrefix = $this->get('admin.language.prefix', 'luna.');
        } else {
            $langPrefix = $this->get('frontend.language.prefix', 'luna.');
        }

        return $langPrefix;
    }
}
