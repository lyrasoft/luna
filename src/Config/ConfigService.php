<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Config;

use Lyrasoft\Luna\Admin\DataMapper\ConfigMapper;
use Lyrasoft\Luna\Admin\Repository\ConfigRepository;
use Windwalker\Core\Cache\RuntimeCacheTrait;
use Windwalker\Data\Data;
use Windwalker\Structure\Structure;

/**
 * The ConfigService class.
 *
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public function getConfig($type, $subtype = null, array $conditions = [], $refresh = false)
    {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->fetch($id, function () use ($conditions) {
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
     * @since  __DEPLOY_VERSION__
     */
    public function getConfigItem($type, $subtype = null, array $conditions = [], $refresh = false)
    {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->fetch($id, function () use ($conditions) {
            return ConfigMapper::findOne($conditions);
        }, $refresh);
    }
}
