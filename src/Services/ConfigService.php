<?php

/**
 * Part of ankecare project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Entity\Config;
use Psr\Cache\InvalidArgumentException;
use Windwalker\Data\Collection;
use Windwalker\Legacy\Data\Data;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

use function Windwalker\collect;

/**
 * The ConfigService class.
 */
class ConfigService
{
    use InstanceCacheTrait;

    /**
     * ConfigService constructor.
     */
    public function __construct(protected ORM $orm)
    {
    }

    /**
     * getConfig
     *
     * @param  string  $type
     * @param  string  $subtype
     * @param  array   $conditions
     * @param  bool    $refresh
     *
     * @return  Collection
     *
     * @throws InvalidArgumentException
     *
     * @since  1.5.2
     */
    public function getConfig(
        string $type,
        ?string $subtype = null,
        array $conditions = [],
        bool $refresh = false
    ): Collection {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->once(
            $id,
            function () use ($refresh, $subtype, $type, $conditions) {
                return collect(
                    $this->getConfigItem($type, $subtype, $conditions, $refresh)?->getContent() ?? []
                );
            },
            $refresh
        );
    }

    /**
     * getConfigItem
     *
     * @param  string  $type
     * @param  string  $subtype
     * @param  array   $conditions
     * @param  bool    $refresh
     *
     * @return  Data
     *
     * @throws InvalidArgumentException
     *
     * @since  1.5.2
     */
    public function getConfigItem(
        string $type,
        ?string $subtype = null,
        array $conditions = [],
        bool $refresh = false
    ): ?Config {
        $conditions['type'] = $type;

        if ($subtype !== null) {
            $conditions['subtype'] = $subtype;
        }

        ksort($conditions);

        $id = 'config:' . json_encode($conditions);

        return $this->once(
            $id,
            function () use ($conditions) {
                return $this->orm->findOne(Config::class, $conditions);
            },
            $refresh
        );
    }
}
