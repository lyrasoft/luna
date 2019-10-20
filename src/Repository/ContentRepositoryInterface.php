<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Repository;

/**
 * Interface ContentRepoitoryInterface
 *
 * @since  1.2
 */
interface ContentRepositoryInterface extends
    LocaleRepositoryInterface,
    StateRepositoryInterface,
    TagMapRepositoryInterface,
    CategorizedRepositoryInterface,
    ViewAccessRepositoryInterface
{
}
