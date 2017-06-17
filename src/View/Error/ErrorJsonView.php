<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Error;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\View\ItemView;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\RendererHelper;

/**
 * The ErrorHtmlView class.
 * 
 * @since  1.0
 */
class ErrorJsonView extends ItemView
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
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		parent::prepareData($data);

		$data['message'] = $data['exception']->getMessage();
		$data['code'] = ($data['code'] >= 400 && $data['code'] < 500) ? $data['code'] : 500;

		if ($data['code'] === 404)
		{
			$data['message'] = Translator::translate($this->langPrefix . 'error.not.found');
		}
		elseif ($data['code'] < 400 || $data['code'] >= 500)
		{
			$data['message'] = Translator::translate($this->langPrefix . 'error.internal');
		}

		unset($data['exception']);
	}
}
