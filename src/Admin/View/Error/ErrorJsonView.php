<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Error;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Core\View\StructureView;
use Windwalker\Structure\Structure;

/**
 * The ErrorHtmlView class.
 * 
 * @since  1.0
 */
class ErrorJsonView extends StructureView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'error';

	/**
	 * Property renderer.
	 *
	 * @var  string
	 */
	protected $renderer = RendererHelper::EDGE;

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
	 * @param Structure $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		parent::prepareData($data);

		$data['code'] = $data['code'] == 404 ? $data-['code'] : 500;

		if ($data['code'] == 404)
		{
			$data['message'] = Translator::translate($this->langPrefix . 'error.not.found');
		}
		else
		{
			$data['message'] = Translator::translate($this->langPrefix . 'error.internal');
		}

		unset($data['exception']);
	}
}
