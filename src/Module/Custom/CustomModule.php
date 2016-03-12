<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Custom;

use Lyrasoft\Luna\Module\AbstractModule;
use Windwalker\Data\Data;

/**
 * The CustomModule class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CustomModule extends AbstractModule
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected static $name = 'luna.module.custom.title';

	/**
	 * Property description.
	 *
	 * @var  string
	 */
	protected static $description = 'luna.module.custom.desc';

	/**
	 * Property icon.
	 *
	 * @var  string
	 */
	protected static $icon = 'glyphicon glyphicon-pencil fa fa-pencil';

	/**
	 * prepareData
	 *
	 * @param Data $data
	 *
	 * @return  void
	 */
	protected function prepareData(Data $data)
	{
		show($data);
	}
}
