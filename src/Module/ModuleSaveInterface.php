<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Admin\Repository\ModuleRepository;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;

/**
 * Interface ModuleSaveInterface
 *
 * @since  __DEPLOY_VERSION__
 */
interface ModuleSaveInterface
{
    /**
     * preSave
     *
     * @param Data|DataInterface $data
     * @param ModuleRepository   $repository
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public function preSave(Data $data, ModuleRepository $repository);

    /**
     * postSave
     *
     * @param Data|DataInterface $data
     * @param ModuleRepository   $repository
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public function postSave(Data $data, ModuleRepository $repository);
}
