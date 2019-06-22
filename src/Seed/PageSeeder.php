<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\PageMapper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Utilities\SlugHelper;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;
use Windwalker\String\Mbstring;

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore seeder file

/**
 * The PageSeeder class.
 *
 * @since  1.0
 */
class PageSeeder extends AbstractSeeder
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

        $content = file_get_contents(__DIR__ . '/fixtures/page.json');

        foreach (range(1, 150) as $i) {
            $created = $faker->dateTimeThisYear;
            $data    = new Data();

            $data['extends']        = '_global.html';
            $data['title']          = Mbstring::ucwords(trim($faker->sentence(2), '.'));
            $data['alias']          = SlugHelper::safe($data['title']);
            $data['content']        = $content;
            $data['meta']           = '{}';
            $data['fulltext']       = $faker->paragraph(5);
            $data['image']          = $faker->unsplashImage();
            $data['state']          = 1;
            $data['ordering']       = $i;
            $data['created']        = $created->format($this->getDateFormat());
            $data['created_by']     = $faker->randomElement($userIds);
            $data['modified']       = $created->modify('+5 days')->format($this->getDateFormat());
            $data['modified_by']    = $faker->randomElement($userIds);
            $data['language']       = 'en-GB';
            $data['preview_secret'] = md5(uniqid('Luna:page:', true));
            $data['params']         = '';

            PageMapper::createOne($data);

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
        $this->truncate(LunaTable::PAGES);
    }
}
