<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Controller\Contacts\Batch;

use Phoenix\Controller\Batch\AbstractUnpublishController;

/**
 * The PendingController class.
 *
 * @since  1.0
 */
class PendingController extends AbstractUnpublishController
{
	/**
	 * Property action.
	 *
	 * @var  string
	 */
	protected $action = 'pending';
}
