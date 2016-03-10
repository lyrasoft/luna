<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Form\Field\TextareaField;

/**
 * The SummernoteEditorField class.
 *
 * @since  {DEPLOY_VERSION}
 */
class SummernoteEditorField extends TextareaField
{
	const TOOLBAR_SIMPLE = 'simple';
	const TOOLBAR_FULL = 'full';

	/**
	 * buildInput
	 *
	 * @param array $attrs
	 *
	 * @return  mixed
	 */
	public function buildInput($attrs)
	{
		$this->prepareScipt($attrs);

		return parent::buildInput($attrs);
	}

	/**
	 * prepareScipt
	 *
	 * @link  http://summernote.org/deep-dive/
	 *
	 * @param   array  $attrs
	 *
	 * @return  void
	 */
	protected function prepareScipt($attrs)
	{
		$options = (array) $this->get('options', array());

		if ($this->get('toolbar') == static::TOOLBAR_SIMPLE)
		{
			$options['toolbar'] = array(
				array('size', array('fontsize')),
				array('color', array('color')),
				array('style', array('bold', 'italic', 'underline', 'strikethrough', 'clear')),
				array('layout', array('ul', 'ol', 'paragraph')),
				array('insert', array('link')),
				array('misc', array('fullscreen', 'undo', 'redo', 'help'))
			);
		}

		if ($this->get('image_upload', true))
		{
			$options['onImageUpload'] = <<<JS
\\function(files) {
	SummernoteLunaEditor.getInstance('#{$this->getId()}').sendFile(files[0]);
}
JS;
		}

		LunaScript::summernote('#' . $attrs['id'], $options);
	}
}
