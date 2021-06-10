<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Phoenix\Repository\CrudRepository;
use Windwalker\Legacy\Core\DateTime\Chronos;
use Windwalker\Legacy\Core\User\User;
use Windwalker\Legacy\Record\Record;

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
