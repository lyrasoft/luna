<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Repository;

/**
 * The LocaleRepositoryInterface class.
 *
 * @since  1.2
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
