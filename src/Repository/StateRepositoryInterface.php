<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Repository;

/**
 * The StateRepositoryInterface class.
 *
 * @since  __DEPLOY_VERSION__
 */
interface StateRepositoryInterface
{
	/**
	 * published
	 *
	 * @param bool $published
	 *
	 * @return static
	 */
	public function published($published = true);
}
