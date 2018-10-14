<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Article;

use Lyrasoft\Luna\Admin\Repository\ArticleRepository;
use Lyrasoft\Luna\Admin\Repository\TagRepository;
use Lyrasoft\Luna\Admin\View\Article\ArticleHtmlView;
use Lyrasoft\Luna\Image\ArticleImageHelper;
use Lyrasoft\Unidev\Field\SingleImageDragField;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;
use Windwalker\Filter\InputFilter;

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
    protected $name = 'article';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'article';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'articles';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * Property model.
     *
     * @var  ArticleRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  ArticleHtmlView
     */
    protected $view;

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();
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

        $data->text = $this->input->get($this->formControl . '.text', null, InputFilter::RAW);
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
        // Image
        if (false !== SingleImageDragField::uploadFromController(
            $this,
            'image',
            $data,
            ArticleImageHelper::getPath($data->id)
        )) {
            $this->repository->save($data);
        }

        // Tag
        /** @var TagRepository $model */
        $model = $this->getModel('Tag');
        $model->saveTagMaps('article', $data->id, $data->tags);
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
