<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Articles;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Core\Cache\RuntimeCacheTrait;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Collection;
use function Windwalker\arr;

/**
 * The ArticlesHtmlView class.
 *
 * @since  1.0
 */
class ArticlesHtmlView extends GridView
{
    use RuntimeCacheTrait;

    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'articles';

    /**
     * Property renderer.
     *
     * @var  string
     */
    protected $renderer = RendererHelper::EDGE;

    /**
     * The fields mapper.
     *
     * @var  array
     */
    protected $fields = [
        'pk' => 'id',
        'title' => 'title',
        'alias' => 'alias',
        'state' => 'state',
        'ordering' => 'ordering',
        'author' => 'created_by',
        'author_name' => 'user_name',
        'created' => 'created',
        'language' => 'language',
        'lang_title' => 'lang_title',
    ];

    /**
     * The grid config.
     *
     * @var  array
     */
    protected $gridConfig = [
        'order_column' => 'category.id, article.ordering',
    ];

    /**
     * init
     *
     * @return  void
     */
    protected function init()
    {
        $this->langPrefix = LunaHelper::getLangPrefix();
    }

    /**
     * prepareData
     *
     * @param \Windwalker\Data\Data $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $this->prepareScripts();
    }

    /**
     * prepareDocument
     *
     * @return  void
     */
    protected function prepareScripts()
    {
        PhoenixScript::core();
        PhoenixScript::grid();
        PhoenixScript::select2('.has-select2');
        PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
        BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
        BootstrapScript::tooltip();
        PhoenixScript::disableWhenSubmit();

        JQueryScript::highlight('.hasHighlight', $this->data->state['input.search.content']);
    }

    /**
     * setTitle
     *
     * @param string $title
     *
     * @return  static
     */
    public function setTitle($title = null)
    {
        return parent::setTitle($title);
    }

    /**
     * getCategoryPath
     *
     * @param int $categoryId
     * @param int $limit
     *
     * @return  Collection
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getCategoryPath(int $categoryId, int $limit = 3): Collection
    {
        return $this->once('category:' . $categoryId, function () use ($categoryId, $limit) {
            $catRecord = new CategoryRecord();
            $categories = arr($catRecord->getAncestors($categoryId, true));

            // Remove root
            $categories->shift();

            return $categories->splice(-$limit);
        });
    }
}
