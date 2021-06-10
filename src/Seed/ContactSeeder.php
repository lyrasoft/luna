<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Lyrasoft\Luna\Admin\DataMapper\ContactMapper;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Core\Seeder\AbstractSeeder;
use Windwalker\Legacy\Data\Data;

/**
 * The ContactSeeder class.
 *
 * @since  1.0
 */
class ContactSeeder extends AbstractSeeder
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

        foreach (range(1, 150) as $i) {
            $created = $faker->dateTimeThisYear;
            $data    = new Data();

            $data['subject']     = $faker->sentence(random_int(3, 5));
            $data['email']       = $faker->email;
            $data['name']        = $faker->name;
            $data['url']         = $faker->url;
            $data['phone']       = $faker->phoneNumber;
            $data['content']     = $faker->paragraph(5);
            $data['details']     = array_combine($faker->words(7), $faker->words(7));
            $data['state']       = $faker->randomElement([-1, 2, 2, 1, 1, 0]);
            $data['created']     = $created->format($this->getDateFormat());
            $data['created_by']  = random_int(20, 100);
            $data['modified']    = $created->modify('+5 days')->format($this->getDateFormat());
            $data['modified_by'] = random_int(20, 100);
            $data['params']      = '';

            ContactMapper::createOne($data);

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
        $this->truncate(LunaTable::CONTACTS);
    }
}
