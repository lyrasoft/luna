<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Merlin\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Merlin\Admin\Record\CategoryRecord;
use Lyrasoft\Merlin\Admin\Table\Table;
use Faker\Factory;
use Windwalker\Core\DateTime\DateTime;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;
use Windwalker\Warder\Admin\DataMapper\UserMapper;

/**
 * The CategorySeeder class.
 * 
 * @since  1.0
 */
class CategorySeeder extends AbstractSeeder
{
	/**
	 * doExecute
	 *
	 * @return  void
	 */
	public function doExecute()
	{
		$faker = Factory::create();

		$mapper = new CategoryMapper;
		$record = new CategoryRecord;
		$userMapper = new UserMapper;

		if ($this->db->getTable($userMapper->getTable())->exists())
		{
			$userIds = $userMapper->findAll()->id;
		}
		else
		{
			$userIds = range(1, 50);
		}

		$existsRecordIds = array(1);

		foreach (range(1, 30) as $i)
		{
			$record->reset();

			$record['title']       = $faker->sentence(rand(3, 5));
			$record['alias']       = OutputFilter::stringURLSafe($record['title']);
			$record['type']        = 'article';
			$record['description'] = $faker->paragraph(5);
			$record['image']       = $faker->imageUrl();
			$record['state']       = $faker->randomElement(array(1, 1, 1, 1, 0, 0));
			$record['version']     = rand(1, 50);
			$record['created']     = $faker->dateTime->format(DateTime::FORMAT_SQL);
			$record['created_by']  = $faker->randomElement($userIds);
			$record['modified']    = $faker->dateTime->format(DateTime::FORMAT_SQL);
			$record['modified_by'] = $faker->randomElement($userIds);
			$record['language']    = 'en-GB';
			$record['params']      = '';

			$record->setLocation($faker->randomElement($existsRecordIds), $record::LOCATION_LAST_CHILD);

			$record->store();

			$record->rebuildPath();

			$existsRecordIds[] = $record->id;

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
		$this->truncate(Table::CATEGORIES);
	}
}
