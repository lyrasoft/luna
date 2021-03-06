<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Page;

use Lyrasoft\Luna\Admin\Repository\PageRepository;
use Lyrasoft\Unidev\Field\SingleImageDragField;
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
    protected $listName = 'Pages';

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
     * @var  PageRepository
     */
    protected $repository = 'Page';

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
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();

        if ($this->input->get('new')) {
            $data = $this->repository->save(new Data());
            $this->redirect(
                $this->router->to('page')->id($data->id)->var('new', 1)
            );

            return;
        }
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
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);
        
        unset($data->meta['og_image']);
    }

    /**
     * A hook after save.
     *
     * @param DataInterface $data Data saved.
     *
     * @return  void
     * @throws \Exception
     */
    protected function postSave(DataInterface $data)
    {
        parent::postSave($data);
        
        $meta = json_decode($data->meta, true);

        $meta['og_image'] = SingleImageDragField::uploadBase64(
            $this->data['meta']['og_image'],
            'page/' . md5('Luna:Page:' . $data->id) . '.jpg',
            null,
            true
        );

        $data->meta = $meta;

        $this->repository->save($data);
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

    /**
     * getSuccessRedirect
     *
     * @param DataInterface|Entity $data
     *
     * @return  string
     *
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function getSuccessRedirect(DataInterface $data = null)
    {
        $css = $this->input->get('css_edit');

        $r = parent::getSuccessRedirect($data);

        if ($css) {
            $r .= '#css';
        }

        return $r;
    }
}
