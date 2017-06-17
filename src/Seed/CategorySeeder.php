<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Faker\Factory;
use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Unidev\Helper\UnsplashHelper;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Filter\OutputFilter;

/**
 * The CategorySeeder class.
 *
 * @since  1.0
 */
class CategorySeeder extends AbstractSeeder
{
	/**
	 * Property types.
	 *
	 * @var  array
	 */
	protected $types = [
		'article'
	];

	/**
	 * doExecute
	 *
	 * @return  void
	 */
	public function doExecute()
	{
		$faker = Factory::create();

		$record = new CategoryRecord;

		$languages = LanguageMapper::find(['state' => 1])->code;
		$languages[] = '*';

		if (WarderHelper::tableExists('users'))
		{
			$userIds = UserMapper::findAll()->id;
		}
		else
		{
			$userIds = range(1, 50);
		}

		$existsRecordIds = [];

		foreach ($this->types as $type)
		{
			$existsRecordIds[$type] = [1];
		}

		foreach (range(1, 30) as $i)
		{
			$record->reset();

			$lang = $faker->randomElement($languages);

			$record['title']       = $faker->sentence(mt_rand(1, 3)) . ' - [' . $lang . ']';
			$record['alias']       = OutputFilter::stringURLSafe($record['title']);
			$record['type']        = $faker->randomElement($this->types);
			$record['description'] = $faker->paragraph(5);
			$record['image']       = UnsplashHelper::getImageUrl();
			$record['state']       = $faker->randomElement([1, 1, 1, 1, 0, 0]);
			$record['version']     = mt_rand(1, 50);
			$record['created']     = $faker->dateTime->format(Chronos::getSqlFormat());
			$record['created_by']  = $faker->randomElement($userIds);
			$record['modified']    = $faker->dateTime->format(Chronos::getSqlFormat());
			$record['modified_by'] = $faker->randomElement($userIds);
			$record['language']    = $lang;
			$record['params']      = '';

			$record->setLocation($faker->randomElement($existsRecordIds[$record['type']]), $record::LOCATION_LAST_CHILD);

			$record->store();

			$record->rebuildPath();

			$existsRecordIds[$record['type']][] = $record->id;

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
		$this->truncate(LunaTable::CATEGORIES);

		$record = new CategoryRecord;
		$record->createRoot();
	}
}
