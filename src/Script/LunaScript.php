<?php
/**
 * Part of virtualset project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\AbstractScriptManager;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Windwalker\Utilities\ArrayHelper;

/**
 * The EditorScript class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LunaScript extends AbstractScriptManager
{
	/**
	 * editor
	 *
	 * @return  void
	 */
	public static function editor()
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();

			if ($luna->isAdmin())
			{
				$langPrefix = $luna->get('admin.language.prefix');
			}
			else
			{
				$langPrefix = $luna->get('frontend.language.prefix');
			}

			PhoenixScript::translate($langPrefix . 'editor.button.readmore.message.exists');

			$js = <<<JS
var Luna;
(function(Luna) {
	Luna.Editor = {
		editors: {},

		// Core methods
		$: function(selector) {
			if (!this.editors[selector]) {
				console.log('Editor element: ' + selector + ' not found.');
			}

		    return this.editors[selector];
		},
		getEditor: function(selector) {
		    return this.$(selector);
		},
		insert: function(selector, text) {
		    return Luna.Editor.getEditor(selector).insert(text);
		},
		getValue: function(selector) {
		    return Luna.Editor.getEditor(selector).getValue();
		},
		setValue: function(selector, text) {
		    return Luna.Editor.getEditor(selector).setValue(text);
		},

		// MISC methods
		addReadmore: function(selector) {

			var content = this.getValue(selector);

			if (content.match(/<hr\s+id=("|')luna-readmore("|')\s*\/*>/i)) {
				// There is already a Read more ... link that has been inserted. Only one link is permitted.
				alert(Phoenix.Translator.translate('{$langPrefix}editor.button.readmore.message.exists'));
				return false;
			}

		    return this.getEditor(selector).insert('<hr id="luna-readmore" />');
		}
	};
})(Luna || (Luna = {}));
JS;

			$asset->internalScript($js);
		}
	}

	/**
	 * summernote
	 *
	 * @param string $selector
	 * @param array  $options
	 *
	 * @return  void
	 */
	public static function summernote($selector, $options = [])
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();
			$asset->addScript($luna->name . '/js/summernote/summernote.min.js');
			$asset->addScript($luna->name . '/js/summernote/summernote-luna.min.js');

			$asset->addStyle($luna->name . '/css/summernote/summernote.min.css');

			$css = <<<CSS
.note-editor {
	border: 1px solid #ccc;
}

.note-editor hr#luna-readmore {
	background: #eee;
    content: "READMORE";
    height: 20px;
    display: block;
    text-align: center;
}

.note-editor hr#luna-readmore::before {
	content: "READMORE";
	color: #999;
}
CSS;

			$asset->internalStyle($css);
		}

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$defaultOptions = array();

			$options['image_upload_url'] = LunaHelper::getPackage()->getCurrentPackage()->router->html('_luna_img_upload');

			$options = $asset::getJSObject(ArrayHelper::merge($defaultOptions, $options));

			$js = <<<JS
jQuery(document).ready(function($) {
	SummernoteLunaEditor.getInstance('$selector', $options);
});
JS;

			$asset->internalScript($js);
		}
	}

	/**
	 * singleDrapUpload
	 *
	 * @param   string  $selector
	 *
	 * @return  void
	 */
	public static function singleImageDragUpload($selector, $options = array())
	{
		$asset = static::getAsset();

		JQueryScript::core();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();
			$asset->addScript($luna->name . '/js/jquery.cropit.min.js');

			$js = <<<JS
var SingleImageUpload = {
	checkFile: function (file)
	{
		var types = [
			'image/jpeg',
			'image/png'
		];

		if (types.indexOf(file.type, types) < 0)
		{
			alert('Not a image', 'Please select jpg or png file', 'error');

			return false;
		}

		return true;
	},
	saveImage: function(selector)
	{
		var fileData = $(selector + '-data');
		var filePreview = $(selector + '-preview');
		var modal = $(selector + '-modal');

		var image = $(selector + '-cropper').cropit('export', {
			type: 'image/jpeg',
			quality: .9,
			originalSize: false
		});

		fileData.val(image);
		filePreview.attr('src', image);
		filePreview.css('display', 'block');

		modal.modal('hide');
	}
};

JS;
			$asset->internalScript($js);

			$asset->internalStyle(<<<CSS
.filedrag {
	font-weight: bold;
	text-align: center;
	padding: 45px 0;
	color: #ccc;
	border: 2px dashed #ccc;
	border-radius: 7px;
	cursor: default;
}

.filedrag.hover
{
	color: #333;
	border-color: #333;
	background-color: #f9f9f9;
}

.cropit-image-background {
	opacity: .2;
}

/*
 * If the slider or anything else is covered by the background image,
 * use relative or absolute position on it
 */
input.cropit-image-zoom-input {
	position: relative;
}

/* Limit the background image by adding overflow: hidden */
#image-cropper {
	overflow: hidden;
}
CSS
			);
		}

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$exportZoom = ArrayHelper::getValue($options, 'export_zoom', 1);
			$width = ArrayHelper::getValue($options, 'width', 300);
			$height = ArrayHelper::getValue($options, 'height', 300);

			$asset->internalScript(<<<JS
function checkFile(file)
{
	var types = [
		'image/jpeg',
		'image/png',
		'image/gif'
	];

	if (types.indexOf(file.type, types) < 0)
	{
		swal('Not a image','Please select other file', 'error');

		return false;
	}

	return true;
}

jQuery(document).ready(function($)
{
    var fileData = $("$selector-data");
    var filedrag = $("$selector-area");
    var fileSelector = $("$selector-selector");
    var filePreview = $("$selector-preview");
    var loader = $("$selector-loader");

	filedrag.on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
        $(this).addClass('hover');
	});

	filedrag.on('dragleave', function(e) {
		e.stopPropagation();
		e.preventDefault();
        $(this).removeClass('hover');
	});

	$('$selector-cropper').cropit({
		// imageState: {src: event.target.result},
		imageBackground: true,
		exportZoom: $exportZoom,
		onImageError: function(error) {
			alert(error.message + ' Please upload a $width x $height image.');
			loader.hide();
		},
		onImageLoaded: function() {
			$('$selector-modal').modal('show');
			loader.hide();
		},
		onImageLoading: function() {
			loader.show();
		}
	});

	// file drop
	filedrag.on("drop", function(e) {
		e.stopPropagation();
		e.preventDefault();

		$(this).removeClass('hover');

	    var files = e.originalEvent.target.files || e.originalEvent.dataTransfer.files;

		if (!SingleImageUpload.checkFile(files[0]))
		{
			return;
		}

	    reader = new FileReader;

        reader.onload = function (event)
        {
			$('$selector-cropper').cropit('imageSrc', event.target.result);
        };

        reader.readAsDataURL(files[0]);
	});
});
JS
			);
		}
	}
}
