<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Windwalker\Core\Seeder\AbstractSeeder;

/**
 * The DatabaseSeeder class.
 *
 * @since  1.0
 */
class MainSeeder extends AbstractSeeder
{
    /**
     * doExecute
     *
     * @return  void
     * @throws ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     */
    public function doExecute()
    {
        $this->execute(LunaSeeder::class);
    }

    /**
     * doClear
     *
     * @return  void
     * @throws ReflectionException
     */
    public function doClear()
    {
        $this->clear(LunaSeeder::class);
    }
}
