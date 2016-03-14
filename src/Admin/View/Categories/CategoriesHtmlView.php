<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Categories;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;

/**
 * The CategoriesHtmlView class.
 * 
 * @since  1.0
 */
class CategoriesHtmlView extends GridView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'categories';

	/**
	 * The fields mapper.
	 *
	 * @var  array
	 */
	protected $fields = array(
		'pk'          => 'id',
		'title'       => 'title',
		'alias'       => 'alias',
		'state'       => 'state',
		'ordering'    => 'ordering',
		'author'      => 'created_by',
		'author_name' => 'user_name',
		'created'     => 'created',
		'language'    => 'language',
		'lang_title'  => 'lang_title'
	);

	/**
	 * The grid config.
	 *
	 * @var  array
	 */
	protected $gridConfig = array(
		'order_column' => 'category.lft'
	);

	/**
	 * Property langPrefix.
	 *
	 * @var  string
	 */
	protected $langPrefix = 'luna.';

	/**
	 * prepareData
	 *
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		$grid = $this->getGridHelper();

		$data->ordering = array();

		if ($data->state->get('list.saveorder'))
		{
			foreach ($data->items as $i => $item)
			{
				$data->ordering[$item->parent_id][] = $item->id;
			}
		}

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
		PhoenixScript::chosen();
		PhoenixScript::multiSelect('#admin-form table', array('duration' => 100));
		BootstrapScript::checkbox(BootstrapScript::GLYPHICONS);
		BootstrapScript::tooltip();

		\Phoenix\Script\JQueryScript::highlight('.hasHighlight', $this->data->state['input.search.content']);
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
		$type = $this->data->state->get('category.type');
		$this->langPrefix = LunaHelper::getPackage()->get('admin.language.prefix', 'luna.') . $type . '.';

		return parent::setTitle($title);
	}
}
