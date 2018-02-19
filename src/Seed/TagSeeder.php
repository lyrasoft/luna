<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Faker\Factory;
use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;

/**
 * The TagSeeder class.
 *
 * @since  1.0
 */
class TagSeeder extends AbstractSeeder
{
    /**
     * doExecute
     *
     * @return  void
     */
    public function doExecute()
    {
        $faker = Factory::create();

        if (WarderHelper::tableExists('users')) {
            $userIds = UserMapper::findAll()->id;
        } else {
            $userIds = range(1, 50);
        }

        foreach (range(1, 30) as $i) {
            $data = new Data;

            $data['title']       = ucfirst($faker->word);
            $data['alias']       = OutputFilter::stringURLSafe($data['title']);
            $data['state']       = $faker->randomElement([1, 1, 1, 1, 0, 0]);
            $data['created']     = $faker->dateTime->format(Chronos::getSqlFormat());
            $data['created_by']  = $faker->randomElement($userIds);
            $data['modified']    = $faker->dateTime->format(Chronos::getSqlFormat());
            $data['modified_by'] = $faker->randomElement($userIds);
            $data['language']    = 'en-GB';
            $data['params']      = '';

            TagMapper::createOne($data);

            $this->outCounting();
        }
    }

    /**
     * doClear
     *
     * @return  void
     */
    public function doClear()
    {
        $this->truncate(LunaTable::TAGS);
    }
}
