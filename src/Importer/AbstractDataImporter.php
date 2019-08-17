<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Importer;

use Windwalker\Core\Database\DatabaseAdapter;
use Windwalker\Core\Seeder\FakerService;
use Windwalker\Data\Data;
use Windwalker\Event\DispatcherAwareInterface;
use Windwalker\Event\DispatcherAwareTrait;
use Windwalker\Event\DispatcherInterface;
use Windwalker\Filesystem\File;
use Windwalker\Structure\Structure;
use function Windwalker\tap;

/**
 * The DataImporter class.
 *
 * @since  __DEPLOY_VERSION__
 */
abstract class AbstractDataImporter implements DispatcherInterface, DispatcherAwareInterface
{
    use DispatcherAwareTrait;

    /**
     * Property db.
     *
     * @var  DatabaseAdapter
     */
    protected $db;

    /**
     * Property fakerService.
     *
     * @var  FakerService
     */
    protected $fakerService;

    /**
     * MenuImporter constructor.
     *
     * @param DatabaseAdapter $db
     * @param FakerService    $fakerService
     */
    public function __construct(DatabaseAdapter $db, FakerService $fakerService)
    {
        $this->db           = $db;
        $this->fakerService = $fakerService;
    }

    /**
     * import
     *
     * @param iterable      $items
     * @param array         $defaultData
     * @param callable|null $dataHandler
     *
     * @return  static
     *
     * @since  __DEPLOY_VERSION__
     */
    public function import(iterable $items, array $defaultData = [], ?callable $dataHandler = null)
    {
        foreach ($items as $key => $item) {
            $this->importItem($key, $item, $defaultData, $dataHandler);
        }

        return $this;
    }

    /**
     * importItem
     *
     * @param string        $key
     * @param mixed         $item
     * @param array         $defaultData
     *
     * @param callable|null $dataHandler
     *
     * @return  Data
     *
     * @since  __DEPLOY_VERSION__
     */
    public function importItem(string $key, $item, array $defaultData = [], ?callable $dataHandler = null): Data
    {
        $data = new Data();

        $data->bind($defaultData)
            ->bind($item);

        if ($dataHandler) {
            $dataHandler($data, $key);
        }

        return tap($this->store($data), function ($data) use ($defaultData) {
            $this->triggerEvent('onItemImported', compact('data', 'defaultData'));
        });
    }

    /**
     * importFile
     *
     * @param string        $file
     * @param array         $defaultData
     * @param callable|null $dataHandler
     *
     * @return  static
     *
     * @since  __DEPLOY_VERSION__
     */
    public function importFile(string $file, array $defaultData = [], ?callable $dataHandler = null)
    {
        return $this->import((new Structure($file, File::getExtension($file)))->toArray(), $defaultData, $dataHandler);
    }

    /**
     * store
     *
     * @param Data          $data
     *
     * @return  Data
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract public function store(Data $data): Data;
}
