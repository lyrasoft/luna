<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Phoenix\Repository\CrudRepository;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\User\User;
use Windwalker\Record\Record;

/**
 * The ContactModel class.
 *
 * @since  1.0
 */
class ContactRepository extends CrudRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Contact';

    /**
     * prepareSave
     *
     * @param Record $data
     *
     * @return  void
     *
     * @throws \Exception
     */
    protected function prepareSave(Record $data)
    {
        parent::prepareSave($data);

        $date = Chronos::create();

        $data->created = $date->toSql();
    }
}
