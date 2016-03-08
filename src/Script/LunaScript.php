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
			$asset->addStyle($luna->name . '/css/summernote/summernote.min.css');
			$asset->addStyle($luna->name . '/css/summernote/summernote-bs3.min.css');

			$asset->internalStyle(".note-editor {border: 1px solid #ccc;}");
		}

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$defaultOptions = array();

			$url = LunaHelper::getPackage()->getCurrentPackage()->router->html('luna_img_upload');

			$options = $asset::getJSObject(ArrayHelper::merge($defaultOptions, $options));

			$js = <<<JS
jQuery(document).ready(function($) {
	$('$selector').summernote($options);

	function sendFile(file, editor) {
		data = new FormData();
		data.append("file", file);
		$.ajax({
			data: data,
			type: "POST",
			url: "$url",
			cache: false,
			contentType: false,
			processData: false,
			success: function(json) {
				json = jQuery.parseJSON(json);
				if (json.state)
				{
					editor.summernote("insertImage", json.url);
				}
				else
				{
					alert('Image upload fail!!!');
				}
			}
		});
	}
});
JS;

			$asset->internalScript($js);
		}
	}
}
