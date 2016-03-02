<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Field;

use Lyrasoft\Merlin\Script\MerlinScript;
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
	 * @param   array  $attrs
	 *
	 * @see  http://summernote.org/deep-dive/
	 *
	 * @return  void
	 */
	protected function prepareScipt($attrs)
	{
		$options = (array) $this->get('options', []);

		if ($this->get('toolbar') == static::TOOLBAR_SIMPLE)
		{
			$options['toolbar'] = [
				['size', ['fontsize']],
				['color', ['color']],
				['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
				['layout', ['ul', 'ol', 'paragraph']],
				['insert', ['link']],
				['misc', ['fullscreen', 'undo', 'redo', 'help']]
			];
		}

		$options['onImageUpload'] = <<<JS
\\function(files) {
	sendFile(files[0], $(this));
}
JS;

		MerlinScript::summernote('#' . $attrs['id'], $options);
	}
}
