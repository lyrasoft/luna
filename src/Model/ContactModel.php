<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

use Phoenix\Model\CrudModel;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\User\User;
use Windwalker\Record\Record;

/**
 * The ContactModel class.
 * 
 * @since  1.0
 */
class ContactModel extends CrudModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'Contact';

	/**
	 * prepareRecord
	 *
	 * @param Record $record
	 *
	 * @return  void
	 */
	protected function prepareRecord(Record $record)
	{
		parent::prepareRecord($record);

		$user = User::get();
		$date = Chronos::create();

		$record->created = $date->toSql();

		if ($user->isMember())
		{
			$record->created_by = $user->id;
			$record->name = $user->name;
		}
	}
}
