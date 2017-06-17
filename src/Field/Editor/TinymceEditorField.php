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
use Windwalker\Core\Asset\Asset;

/**
 * The SummernoteEditorField class.
 *
 * @since  1.0
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
		$luna = LunaHelper::getPackage();
		$options = (array) $this->get('options', []);

		$options['plugins']     = [];
		$options['content_css'] = Asset::root() . '/' . $luna->name . '/css/tinymce/content.css';

		if ($this->get('toolbar', static::TOOLBAR_FULL) === static::TOOLBAR_FULL)
		{
			$options['plugins'] = [
				'advlist autolink lists link image charmap print preview hr anchor pagebreak',
				'searchreplace wordcount visualblocks visualchars code fullscreen',
				'insertdatetime media nonbreaking save table contextmenu directionality',
				'emoticons template paste textcolor colorpicker textpattern imagetools'
			];

			$options['toolbar1'] = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' .
				'bullist numlist outdent indent | link image media | table code | fullscreen';

			$options['image_advtab'] = true;
		}

		/*
		 * @link  https://www.tinymce.com/docs/plugins/paste/
		 */
		if ($this->get('image_upload', true))
		{
			$url = $luna->getCurrentPackage()->router->route('_luna_img_upload');

			$options['paste_data_images'] = true;

			// Image uploader
			$options['images_upload_handler'] = <<<JS
\\function (blobInfo, success, failure) {
    var xhr, formData;

    xhr = new XMLHttpRequest;
    xhr.withCredentials = false;
    xhr.open('POST', '{$url}');

    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.data.url != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        console.log('Invalid JSON: ' + xhr.responseText, 'error');
        return;
      }

      success(json.data.url);
    };

    formData = new FormData;
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
}
JS;

			// Drag Drop Styles
			Asset::internalScript(<<<JS
jQuery(document).ready(function($) {
    tinymce.PluginManager.add('lunadragdrop', function(editor) {
		// Reset the drop area border
		tinyMCE.DOM.bind(document, 'dragleave', function(e) {
			e.stopPropagation();
			e.preventDefault();
			tinyMCE.activeEditor.contentAreaContainer.style.borderWidth='';

			return false;
		});

		if (typeof FormData != 'undefined') {

			// Fix for Chrome
			editor.on('dragenter', function(e) {
				e.stopPropagation();
				return false;
			});


			// Notify user when file is over the drop area
			editor.on('dragover', function(e) {
				e.preventDefault();
				tinyMCE.activeEditor.contentAreaContainer.style.borderStyle = 'dashed';
				tinyMCE.activeEditor.contentAreaContainer.style.borderWidth = '5px';

				return false;
			});

			editor.on('drop', function(e) {
				editor.contentAreaContainer.style.borderWidth = '';
				editor.contentAreaContainer.style.borderWidth = '';
			});
		}
	});
});
JS
);
			$options['plugins'][] = 'lunadragdrop';
		}

		EditorScript::tinymce('#' . $attrs['id'], $options);
	}
}
