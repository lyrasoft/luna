<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Config;

use Windwalker\Legacy\Core\Facade\AbstractProxyFacade;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Structure\Structure;

/**
 * The ConfigHelper class.
 *
 * phpcs:disable
 *
 * @method static Structure  getConfig(string $type, string $subtype = null, array $conditions = [], bool $refresh = false)
 * @method static Data       getConfigItem(string $type, string $subtype = null, array $conditions = [], bool $refresh = false)
 *
 * phpcs:enable
 * @since  1.5.2
 */
class ConfigHelper extends AbstractProxyFacade
{
    /**
     * Property _key.
     *
     * @var  string
     * phpcs:disable
     */
    protected static $_key = ConfigService::class;
    // phpcs:enable
}
