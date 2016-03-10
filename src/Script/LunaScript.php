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
use Windwalker\Utilities\ArrayHelper;

/**
 * The EditorScript class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LunaScript extends AbstractScriptManager
{
	/**
	 * fontAwesome
	 *
	 * @return  void
	 */
	public static function fontAwesome()
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();
			$asset->addStyle($luna->name . '/css/font-awesome.min.css');
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
			static::fontAwesome();

			$luna = LunaHelper::getPackage();
			$asset->addScript($luna->name . '/js/summernote/summernote.min.js');
			$asset->addScript($luna->name . '/js/summernote/summernote-luna.min.js');

			$asset->addStyle($luna->name . '/css/summernote/summernote.min.css');
			$asset->addStyle($luna->name . '/css/summernote/summernote-bs3.min.css');

			$asset->internalStyle(".note-editor {border: 1px solid #ccc;}");

			$js = <<<JS
;(function($) {
    var SummernoteLunaEditor = function(editor, options) {
		this.editor = $(editor);
		this.options = options;
	};

	SummernoteLunaEditor.instances = {};

	SummernoteLunaEditor.getInstance = function(selector, options) {
		if (!this.instances[selector]) {
			// Start Summernote
			var editor = $(selector).summernote(options);

			this.instances[selector] = new SummernoteLunaEditor(editor, options);
		}

		return this.instances[selector];
	}

	SummernoteLunaEditor.prototype = {
		sendFile: function(file) {
			data = new FormData();
			data.append("file", file);
			var self = this;

			$.ajax({
				data: data,
				type: "POST",
				url: this.options.image_upload_url,
				cache: false,
				contentType: false,
				processData: false,
				success: function(response) {
					if (response.success)
					{
						self.editor.summernote("insertImage", response.data.url);
					}
					else
					{
						alert('Image upload fail!!!');
					}
				}
			});
		}
	}

	window.SummernoteLunaEditor = SummernoteLunaEditor;
})(jQuery);
JS;

			$asset->internalScript($js);
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
}
