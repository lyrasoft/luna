<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field\Editor;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\EditorScript;
use Lyrasoft\Luna\Script\LunaScript;
use Phoenix\Uri\Uri;

/**
 * The SummernoteEditorField class.
 *
 * @since  {DEPLOY_VERSION}
 */
class TinymceEditorField extends AbstractEditorField
{
	const TOOLBAR_SIMPLE = 'simple';
	const TOOLBAR_FULL = 'full';

	/**
	 * Property editorName.
	 *
	 * @var  string
	 */
	protected $editorName = null;

	/**
	 * prepareScipt
	 *
	 * @link  http://summernote.org/deep-dive/
	 *
	 * @param   array  $attrs
	 *
	 * @return  void
	 */
	protected function prepareScript($attrs)
	{
		$options = (array) $this->get('options', array());

		if ($this->get('toolbar', static::TOOLBAR_FULL) == static::TOOLBAR_FULL)
		{
			$options['plugins'] = array(
				'advlist autolink lists link image charmap print preview hr anchor pagebreak',
				'searchreplace wordcount visualblocks visualchars code fullscreen',
				'insertdatetime media nonbreaking save table contextmenu directionality',
				'emoticons template paste textcolor colorpicker textpattern imagetools'
			);

			$uri = new Uri(Uri::host());

			$options['image_advtab'] = true;
//			$options['imagetools_cors_hosts'] = array(
//				$uri->getHost(), 'i.imgur.com'
//			);

			$options['imagetools_toolbar'] = "rotateleft rotateright | flipv fliph | editimage imageoptions";
			$options['imagetools_proxy'] = LunaHelper::getPackage()->getCurrentPackage()->router->html('_luna_tinymce_proxy');

//			$options['toolbar'] = array(
//				array('size', array('fontsize')),
//				array('color', array('color')),
//				array('style', array('bold', 'italic', 'underline', 'strikethrough', 'clear')),
//				array('layout', array('ul', 'ol', 'paragraph')),
//				array('insert', array('link')),
//				array('misc', array('fullscreen', 'undo', 'redo', 'help'))
//			);
		}

//		if ($this->get('image_upload', true))
//		{
//			if (!isset($options['callbacks']['onImageUpload']))
//			{
//				$options['callbacks']['onImageUpload'] = <<<JS
//\\function(files) {
//	SummernoteLunaEditor.getInstance('#{$this->getId()}').sendFile(files[0]);
//}
//JS;
//			}
//		}

		EditorScript::tinymce('#' . $attrs['id'], $options);
	}
}
