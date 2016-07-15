<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Controller\Categories\Batch;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Phoenix\Controller\Batch\AbstractUnpublishController;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;

/**
 * The UnpublishController class.
 *
 * @since  1.0
 */
class UnpublishController extends AbstractUnpublishController
{
	/**
	 * save
	 *
	 * @param int|string     $pk
	 * @param DataInterface  $data
	 *
	 * @return  boolean
	 */
	protected function save($pk, DataInterface $data)
	{
		parent::save($pk, clone $data);

		// Find Children
		$mapper = new CategoryMapper;

		$parent = $mapper->findOne($pk);

		return $mapper->updateBatch($data, array(
			'lft > ' . $parent->lft,
			'rgt < ' . $parent->rgt
		));
	}
}
