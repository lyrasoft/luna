<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Error;

use Phoenix\View\ItemView;
use Windwalker\Core\Language\Translator;

/**
 * The ErrorHtmlView class.
 * 
 * @since  1.0
 */
class ErrorHtmlView extends ItemView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'error';

	/**
	 * prepareData
	 *
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		$data->code = $data->exception->getCode();
		$data->msg  = $data->exception->getMessage();

		$data->code = $data->code == 404 ? $data->code : 500;

		if ($data->code == 404)
		{
			$data->msg = Translator::translate($this->langPrefix . 'error.not.found');
		}
		else
		{
			$data->msg = Translator::translate($this->langPrefix . 'error.internal');
		}
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
}
