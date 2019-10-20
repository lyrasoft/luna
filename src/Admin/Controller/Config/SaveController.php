<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Config;

use Lyrasoft\Luna\Admin\Repository\ConfigRepository;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;

/**
 * The SaveController class.
 *
 * @since  1.0
 */
class SaveController extends AbstractSaveController
{
    /**
     * Keep this property so save & close can find routing.
     *
     * @var  string
     */
    protected $listName = 'Configs';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * The default Repository.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  ConfigRepository
     */
    protected $repository = 'Config';

    /**
     * Property redirectQueryFields.
     *
     * @var  array
     */
    protected $redirectQueryFields = [
        'type', 'subtype'
    ];

    /**
     * Class init.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * A hook before main process executing.
     *
     * @return  void
     * @throws \ReflectionException
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();

        $type = (string) $this->input->get('type');
        $subtype = $this->input->get('subtype');

        if ($type === '') {
            throw new \RuntimeException('Variable `type` missing.');
        }

        $repository = $this->getRepository();

        $repository['config.type'] = $type;
        $repository['config.subtype'] = $subtype;
    }

    /**
     * Check user has access to modify this resource or not.
     *
     * Throw exception with 4xx code or return false to block unauthorised access.
     *
     * @param   array|DataInterface $data
     *
     * @return  boolean
     *
     * @throws \RuntimeException
     * @throws \Windwalker\Core\Security\Exception\UnauthorizedException (401 / 403)
     */
    public function checkAccess($data)
    {
        return parent::checkAccess($data);
    }

    /**
     * A hook before save.
     *
     * @param DataInterface $data Data to save.
     *
     * @return void
     * @throws \Exception
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);
    }

    /**
     * doSave
     *
     * @param DataInterface $data
     *
     * @return void
     *
     * @throws \Exception
     */
    protected function doSave(DataInterface $data)
    {
        $data = $this->prepareStore($data);

        $this->validate($data);

        $data = $this->handleData($data);

        $this->getRepository()->save($data);
    }

    /**
     * handleData
     *
     * @param Data $data
     *
     * @return  Data
     *
     * @throws \Exception
     *
     * @since  1.5.2
     */
    protected function handleData(Data $data)
    {
        $repository = $this->getRepository();

        return new Data([
            'type' => $repository['config.type'],
            'subtype' => $repository['config.subtype'],
            'content' => json_encode($data)
        ]);
    }

    /**
     * A hook after save.
     *
     * @param DataInterface $data Data saved.
     *
     * @return  void
     */
    protected function postSave(DataInterface $data)
    {
        parent::postSave($data);
    }

    /**
     * A hook after main process executing.
     *
     * @param mixed $result The result content to return, can be any value or boolean.
     *
     * @return  mixed
     */
    protected function postExecute($result = null)
    {
        return parent::postExecute($result);
    }
}
