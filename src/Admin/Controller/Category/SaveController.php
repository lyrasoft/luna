<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Category;

use Lyrasoft\Luna\Admin\Repository\CategoryRepository;
use Lyrasoft\Luna\Admin\View\Category\CategoryHtmlView;
use Lyrasoft\Luna\Image\CategoryImageHelper;
use Lyrasoft\Unidev\Field\SingleImageDragField;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;

/**
 * The SaveController class.
 *
 * @since  1.0
 */
class SaveController extends AbstractSaveController
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'category';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'category';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'categories';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * Property model.
     *
     * @var  CategoryRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  CategoryHtmlView
     */
    protected $view;

    /**
     * Property redirectQueryFields.
     *
     * @var  array
     */
    protected $redirectQueryFields = [
        'type',
    ];

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();

        $type = $this->input->get('type');

        $this->repository['category.type'] = $type;
    }

    /**
     * preSave
     *
     * @param DataInterface $data
     *
     * @return void
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);

        unset($data->image);
    }

    /**
     * postSave
     *
     * @param DataInterface $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function postSave(DataInterface $data)
    {
        // Save base64 from single upload field
        if ($this->data['image'] ?? null) {
            // V2
            $data->image = SingleImageDragField::uploadBase64(
                $this->data['image'],
                CategoryImageHelper::getPath($data->id),
                null,
                true
            );

            $this->repository->save($data);
            // V1
        } elseif (false !== SingleImageDragField::uploadFromController(
            $this,
            'image',
            $data,
            CategoryImageHelper::getPath($data->id)
        )) {
            $this->repository->save($data);
        }
    }

    /**
     * postExecute
     *
     * @param mixed $result
     *
     * @return  mixed
     */
    protected function postExecute($result = null)
    {
        return parent::postExecute($result);
    }
}
