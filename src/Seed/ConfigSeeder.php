<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ConfigMapper;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore seeder file

/**
 * The ConfigSeeder class.
 *
 * @since  1.0
 */
class ConfigSeeder extends AbstractSeeder
{
    /**
     * doExecute
     *
     * @return  void
     * @throws Exception
     */
    public function doExecute()
    {
        $faker   = $this->faker->create();
        $userIds = UserMapper::findColumn('id');

        $created = $faker->dateTimeThisYear;
        $data    = new Data();

        $data['type']        = 'core';
        $data['content']     = json_encode(['ga' => 'UA-xxx-xxxx-xxxx']);
        $data['modified']    = $created->modify('+5 days')->format($this->getDateFormat());
        $data['modified_by'] = $faker->randomElement($userIds);

        ConfigMapper::createOne($data);

        $this->outCounting();
    }

    /**
     * doClear
     *
     * @return  void
     */
    public function doClear()
    {
        $this->truncate(LunaTable::CONFIGS);
    }
}
