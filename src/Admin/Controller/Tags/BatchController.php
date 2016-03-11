<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tags;

use Phoenix\Controller\Batch\BatchDelegationController;

/**
 * The UpdateController class.
 *
 * @since  1.0
 */
class BatchController extends BatchDelegationController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'tags';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'tag';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'tags';
}
