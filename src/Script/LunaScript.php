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
	public static function lunaIcon()
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();
			$asset->addStyle($luna->name . '/css/luna-icon.min.css');
		}
	}

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
			
			console.log(content, content.match(/<hr\s+id=("|')luna-readmore("|')\s*\/*>/i));

			if (content.match(/<hr\s+id=("|')luna-readmore("|')\s*\/*>/i)) {
				alert('There is already a Read more ... link that has been inserted. Only one link is permitted.');
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
			static::lunaIcon();

			$luna = LunaHelper::getPackage();
			$asset->addScript($luna->name . '/js/summernote/summernote.min.js');
			$asset->addScript($luna->name . '/js/summernote/summernote-luna.min.js');

			$asset->addStyle($luna->name . '/css/summernote/summernote.min.css');
			$asset->addStyle($luna->name . '/css/summernote/summernote-bs3.min.css');

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
}
