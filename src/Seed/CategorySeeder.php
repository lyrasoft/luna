<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Utilities\SlugHelper;
use Lyrasoft\Warder\Admin\DataMapper\UserMapper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Legacy\Core\Seeder\AbstractSeeder;

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
        'article' => [
            'max_level' => 3,
            'number' => 30,
        ],
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

        $record = new CategoryRecord();

        $languages   = LanguageMapper::find(['state' => 1])->code;
        $languages[] = '*';

        if (WarderHelper::tableExists('users')) {
            $userIds = UserMapper::findAll()->id;
        } else {
            $userIds = range(1, 50);
        }

        $existsRecordIds = [];

        foreach ($this->types as $type => $detail) {
            $maxLevel = $detail['max_level'];

            $existsRecordIds[$type] = [1];

            foreach (range(1, $detail['number']) as $i) {
                $record->reset();

                $lang = $faker->randomElement($languages);

                $record['title']       = $faker->sentence(random_int(1, 3)) . ' - [' . $lang . ']';
                $record['alias']       = SlugHelper::safe($record['title']);
                $record['type']        = $type;
                $record['description'] = $faker->paragraph(5);
                $record['image']       = $faker->unsplashImage();
                $record['state']       = $faker->randomElement([1, 1, 1, 1, 0, 0]);
                $record['version']     = random_int(1, 50);
                $record['created']     = $faker->dateTime->format($this->getDateFormat());
                $record['created_by']  = $faker->randomElement($userIds);
                $record['modified']    = $faker->dateTime->format($this->getDateFormat());
                $record['modified_by'] = $faker->randomElement($userIds);
                $record['language']    = $lang;
                $record['params']      = '';

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

        $record = new CategoryRecord();
        $record->createRoot();
    }
}
