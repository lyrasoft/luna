<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Lyrasoft\Luna\Admin\Table\Table;
use Faker\Factory;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Utilities\SlugHelper;
use Windwalker\Core\Seeder\AbstractSeeder;
use Windwalker\Data\Data;
use Windwalker\Filter\OutputFilter;

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace -- Ignore seeder file

/**
 * The MenuSeeder class.
 *
 * @since  1.0
 */
class MenuSeeder extends AbstractSeeder
{
    /**
     * Property types.
     *
     * @var  array
     */
    protected $types = [
        'mainmenu' => [
            'max_level' => 3,
            'number' => 30,
        ]
    ];

    /**
     * doExecute
     *
     * @return  void
     * @throws Exception
     */
    public function doExecute()
    {
        $faker = $this->faker->create();
        $articles = ArticleMapper::find(['state' => 1])->dump();
        $categories = CategoryMapper::find(['type' => 'article'])->dump();

        $record = new MenuRecord();

        $languages   = LanguageMapper::find(['state' => 1])->code;
        $languages[] = '*';

        if (WarderHelper::tableExists('users')) {
            $userIds = UserMapper::findAll()->id;
        } else {
            $userIds = range(1, 50);
        }

        $existsRecordIds = [];
        $views = [
            'article',
            'article_category'
        ];

        foreach ($this->types as $type => $detail) {
            $maxLevel = $detail['max_level'];

            $existsRecordIds[$type] = [1];

            foreach (range(1, $detail['number']) as $i) {
                $record->reset();

                $lang = $faker->randomElement($languages);
                $view = $faker->randomElement($views);

                $record['title']       = $faker->sentence(random_int(1, 3)) . ' - [' . $lang . ']';
                $record['alias']       = SlugHelper::safe($record['title']);
                $record['type']        = $type;
                $record['view']        = $view;

                switch ($view) {
                    case 'article':
                        $article = $faker->randomElement($articles);

                        $record['variables'] = json_encode([
                            'id' => $article->id,
                            'alias' => $article->alias
                        ]);
                        break;

                    case 'article_category':
                        $category = $faker->randomElement($categories);

                        $record['variables'] = json_encode([
                            'id' => $category->id,
                            'path' => $category->path
                        ]);
                        break;
                }

                $record['image']       = $faker->unsplashImage();
                $record['state']       = 1;
                $record['taerget']     = '_self';
                $record['created']     = $faker->dateTime->format($this->getDateFormat());
                $record['created_by']  = $faker->randomElement($userIds);
                $record['modified']    = $faker->dateTime->format($this->getDateFormat());
                $record['modified_by'] = $faker->randomElement($userIds);
                $record['language']    = $lang;
                $record['params']      = json_encode([]);

                $record->setLocation(
                    $faker->randomElement($existsRecordIds[$record['type']]),
                    $record::LOCATION_LAST_CHILD
                );

                $record->store();

                $record->rebuildPath();

                if ($record->level < $maxLevel) {
                    $existsRecordIds[$record['type']][] = $record->id;
                }

                $this->outCounting();
            }
        }
    }

    /**
     * doClear
     *
     * @return  void
     * @throws Exception
     */
    public function doClear()
    {
        $this->truncate(LunaTable::CATEGORIES);

        $record = new MenuRecord();
        $record->createRoot();
    }
}
