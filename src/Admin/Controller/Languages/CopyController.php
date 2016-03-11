<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Languages;

use Phoenix\Controller\Batch\AbstractCopyController;

/**
 * The CopyController class.
 *
 * @since  1.0
 */
class CopyController extends AbstractCopyController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'languages';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'language';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'languages';
}
