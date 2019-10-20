<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Admin\Repository\ModuleRepository;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;

/**
 * Interface ModuleSaveInterface
 *
 * @since  1.5.2
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
     * @since  1.5.2
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
     * @since  1.5.2
     */
    public function postSave(Data $data, ModuleRepository $repository);
}
