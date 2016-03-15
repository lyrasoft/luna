<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\DataMapper\TagMapMapper;
use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Luna\Admin\Table\Table;
use Faker\Factory;
use Windwalker\Core\DateTime\DateTime;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;
use Windwalker\Warder\Admin\DataMapper\UserMapper;

/**
 * The ArticleSeeder class.
 * 
 * @since  1.0
 */
class ArticleSeeder extends AbstractSeeder
{
	/**
	 * doExecute
	 *
	 * @return  void
	 */
	public function doExecute()
	{
		$faker = Factory::create();

		$mapper = new ArticleMapper;
		$catMapper = new CategoryMapper;
		$tagMapper = new TagMapper;
		$tagMapMapper = new TagMapMapper;

		$categories = $catMapper->findAll();

		if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
		{
			$userMapper = new UserMapper;

			$userIds = $userMapper->findAll()->id;
		}
		else
		{
			$userIds = range(1, 50);
		}

		$tags = $tagMapper->findAll()->dump();

		foreach ($categories as $category)
		{
			foreach (range(7, 15) as $i)
			{
				$data = new Data;

				$data['category_id'] = $category->id;
				$data['title']       = $faker->sentence(rand(3, 5));
				$data['alias']       = OutputFilter::stringURLSafe($data['title']);
				$data['introtext']   = $faker->paragraph(5);
				$data['fulltext']    = $faker->paragraph(5);
				$data['image']       = $faker->imageUrl();
				$data['state']       = $faker->randomElement(array(1, 1, 1, 1, 0, 0));
				$data['version']     = rand(1, 50);
				$data['created']     = $faker->dateTime->format(DateTime::FORMAT_SQL);
				$data['created_by']  = $faker->randomElement($userIds);
				$data['modified']    = $faker->dateTime->format(DateTime::FORMAT_SQL);
				$data['modified_by'] = $faker->randomElement($userIds);
				$data['ordering']    = $i;
				$data['language']    = 'en-GB';
				$data['params']      = '';

				$mapper->createOne($data);

				foreach ($faker->randomElements($tags, rand(5, 7)) as $tag)
				{
					$map = new Data;

					$map->tag_id = $tag->id;
					$map->target_id = $data->id;
					$map->type = 'article';

					$tagMapMapper->createOne($map);
				}

				$this->command->out('.', false);
			}
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
		$this->truncate(Table::ARTICLES);
	}
}
