<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\PhoenixScript;
use Windwalker\Core\Asset\AbstractScript;
use Windwalker\Core\Ioc;
use Windwalker\Utilities\ArrayHelper;

/**
 * The EditorScript class.
 *
 * @since  1.0
 */
class EditorScript extends AbstractScript
{
    /**
     * editor
     *
     * @return  void
     */
    public static function editor()
    {
        $asset = static::getAsset();

        if (!static::inited(__METHOD__)) {
            $luna = LunaHelper::getPackage();

            if ($luna->isAdmin()) {
                $langPrefix = $luna->get('admin.language.prefix');
            } else {
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
     * tinymce
     *
     * @param string $selector
     * @param array  $options
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function tinymce($selector, $options = [])
    {
        $asset = static::getAsset();

        $config = Ioc::getConfig();
        $locale = $config->get('language.locale') ?: $config->get('language.default', 'en-GB');

        $luna = LunaHelper::getPackage();

        if (!static::inited(__METHOD__)) {
            static::editor();

            $asset->addScript($luna->name . '/js/tinymce/tinymce.min.js');
            $asset->addScript($luna->name . '/js/tinymce/tinymce-luna.min.js');

            $css = <<<CSS
div.mce-fullscreen {
	z-index: 1500;
}
CSS;

            $asset->internalStyle($css);
        }

        if (!static::inited(__METHOD__, func_get_args())) {
            $defaultOptions = [
                'branding' => false,
            ];

            $options['image_upload_url'] = LunaHelper::getPackage()
                ->getCurrentPackage()->router->route('_luna_img_upload');

            $options['selector'] = $selector;

            $optionsJson = static::getJSObject($defaultOptions, $options);

            $js = <<<JS
jQuery(document).ready(function($) {
	TinymceLunaEditor.getInstance('$selector', $optionsJson);
});
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
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function summernote($selector, $options = [])
    {
        $asset = static::getAsset();

        $config = Ioc::getConfig();
        $locale = $config->get('language.locale') ?: $config->get('language.default', 'en-GB');

        if (!static::inited(__METHOD__)) {
            static::editor();

            $luna = LunaHelper::getPackage();
            $asset->addScript($luna->name . '/js/summernote/summernote.min.js');
            $asset->addScript($luna->name . '/js/summernote/summernote-luna.min.js');

            $asset->addStyle($luna->name . '/css/summernote/summernote.min.css');

            $asset->addScript($luna->name . '/js/summernote/lang/summernote-' . $locale . '.min.js');

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

        if (!static::inited(__METHOD__, func_get_args())) {
            $defaultOptions = [
                'lang' => $locale,
            ];

            $options['image_upload_url'] = LunaHelper::getPackage()
                ->getCurrentPackage()->router->route('_luna_img_upload');

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
