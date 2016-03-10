<?php
/**
 * Part of virtualset project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field\Image;

use Lyrasoft\Luna\Script\LunaScript;
use Phoenix\Asset\Asset;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Form\Field\TextField;

/**
 * The SingleImageField class.
 *
 * @since  {DEPLOY_VERSION}
 */
class SingleImageDragField extends TextField
{
	/**
	 * prepareRenderInput
	 *
	 * @param array $attrs
	 *
	 * @return  array
	 */
	public function prepare(&$attrs)
	{
		parent::prepare($attrs);

		$attrs['width']  = $this->get('width', 300);
		$attrs['height'] = $this->get('height', 300);
	}

	/**
	 * buildInput
	 *
	 * @param array $attrs
	 *
	 * @return  mixed
	 */
	public function buildInput($attrs)
	{
		$this->prepareScript($attrs);

		return WidgetHelper::render('luna.field.single-drag-image', [
			'attrs' => $attrs
		], WidgetHelper::ENGINE_BLADE);
	}

	/**
	 * prepareScript
	 *
	 * @param   array  $attrs
	 *
	 * @return  void
	 */
	protected function prepareScript($attrs)
	{
		$selector = '#' . $attrs['id'];

		$options['export_zoom'] = $exportZoom = $this->getAttribute('export_zoom', 1);
		$options['width']  = $exportZoom * $this->get('width', 300);
		$options['height'] = $exportZoom * $this->get('height', 300);

		LunaScript::singleImageDragUpload($selector, $options);
	}
}
