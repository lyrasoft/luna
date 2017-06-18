<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Repository;

/**
 * Interface CategorizedRepositoryInterface
 *
 * @since  1.2
 */
interface CategorizedRepositoryInterface
{
	/**
	 * filterCategory
	 *
	 * @param mixed $category
	 *
	 * @return  static
	 */
	public function category($category);

	/**
	 * categoryKeys
	 *
	 * @param int $lft
	 * @param int $rgt
	 *
	 * @return  static
	 */
	public function categoryKeys($lft, $rgt);
}
