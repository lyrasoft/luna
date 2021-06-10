<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ModuleMapper;
use Lyrasoft\Luna\Module\ModuleHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Legacy\Core\Seeder\AbstractSeeder;
use Windwalker\Legacy\Data\Data;

/**
 * The ModuleSeeder class.
 *
 * @since  1.0
 */
class ModuleSeeder extends AbstractSeeder
{
    /**
     * doExecute
     *
     * @return  void
     * @throws Exception
     */
    public function doExecute()
    {
        $faker = $this->faker->create();

        if (WarderHelper::tableExists('users')) {
            $userIds = UserMapper::findAll()->id;
        } else {
            $userIds = range(1, 50);
        }

        $positions = $faker->words(20);

        $types = ModuleHelper::getModuleTypes()->dump();

        foreach (range(1, 75) as $i) {
            $data = new Data();

            /** @var \Lyrasoft\Luna\Module\ModuleType $module */
            $module = $faker->randomElement($types);

            $data['title']       = $faker->sentence(random_int(3, 5));
            $data['type']        = $module->type;
            $data['class']       = $module->class;
            $data['position']    = $faker->randomElement($positions);
            $data['note']        = $faker->sentence(5);
            $data['content']     = $faker->paragraph(5);
            $data['state']       = $faker->randomElement([1, 1, 1, 1, 0, 0]);
            $data['created']     = $faker->dateTime->format($this->getDateFormat());
            $data['created_by']  = $faker->randomElement($userIds);
            $data['modified']    = $faker->dateTime->format($this->getDateFormat());
            $data['modified_by'] = $faker->randomElement($userIds);
            $data['ordering']    = $i;
            $data['language']    = 'en-GB';
            $data['params']      = '';

            ModuleMapper::createOne($data);

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
        $this->truncate(LunaTable::MODULES);
    }
}
