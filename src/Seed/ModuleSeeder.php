<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ModuleMapper;
use Lyrasoft\Luna\Admin\Table\Table;
use Faker\Factory;
use Windwalker\Core\DateTime\DateTime;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;
use Windwalker\Warder\Admin\DataMapper\UserMapper;

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
	 */
	public function doExecute()
	{
		$faker = Factory::create();

		$mapper = new ModuleMapper;
		$userIds = with(new UserMapper)->findAll();

		$positions = array('flower', 'sakura', 'rose', 'olive');

		foreach (range(1, 30) as $i)
		{
			$data = new Data;

			$data['title']       = $faker->sentence(rand(3, 5));
			$data['class']       = 'Lyrasoft\Luna\Module\Custom\CustomModule';
			$data['position']    = $faker->randomElement($positions);
			$data['note']        = $faker->sentence(5);
			$data['content']     = $faker->paragraph(5);
			$data['state']       = $faker->randomElement(array(1, 1, 1, 1, 0, 0));
			$data['created']     = $faker->dateTime->format(DateTime::FORMAT_SQL);
			$data['created_by']  = $faker->randomElement($userIds);
			$data['modified']    = $faker->dateTime->format(DateTime::FORMAT_SQL);
			$data['modified_by'] = $faker->randomElement($userIds);
			$data['ordering']    = $i;
			$data['language']    = 'en-GB';
			$data['params']      = '';

			$mapper->createOne($data);

			$this->command->out('.', false);
		}

		$this->command->out();
	}

	/**
	 * doClean
	 *
	 * @return  void
	 */
	public function doClean()
	{
		$this->truncate(Table::MODULES);
	}
}
