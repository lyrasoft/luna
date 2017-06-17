<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Repository;

/**
 * The LocaleRepositoryInterface class.
 *
 * @since  __DEPLOY_VERSION__
 */
interface LocaleRepositoryInterface
{
	/**
	 * locale
	 *
	 * @param string $locale
	 *
	 * @return  static
	 */
	public function locale($locale);
}
