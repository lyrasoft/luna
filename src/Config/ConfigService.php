<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Config;

use Lyrasoft\Luna\Admin\DataMapper\ConfigMapper;
use Lyrasoft\Luna\Admin\Repository\ConfigRepository;
use Windwalker\Legacy\Core\Cache\RuntimeCacheTrait;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Structure\Structure;

/**
 * The ConfigService class.
 *
 * @since  1.5.2
 */
class ConfigService
{
    use RuntimeCacheTrait;

    /**
     * Property repo.
     *
     * @var ConfigRepository
     */
    protected $repo;

    /**
     * getConfig
     *
     * @param string $type
     * @param string $subtype
     * @param array  $conditions
     * @param bool   $refresh
     *
     * @return  Structure
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  1.5.2
     */
    public function getConfig($type, $subtype = null, array $conditions = [], $refresh = false)
    {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->once($id, function () use ($conditions) {
            $config = ConfigMapper::findOne($conditions);

            return new Structure($config->content);
        }, $refresh);
    }

    /**
     * getConfigItem
     *
     * @param string $type
     * @param string $subtype
     * @param array  $conditions
     * @param bool   $refresh
     *
     * @return  Data
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  1.5.2
     */
    public function getConfigItem($type, $subtype = null, array $conditions = [], $refresh = false)
    {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->once($id, function () use ($conditions) {
            return ConfigMapper::findOne($conditions);
        }, $refresh);
    }
}
