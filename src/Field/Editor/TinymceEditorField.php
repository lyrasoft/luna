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
use Windwalker\Core\Language\Translator;
use Windwalker\Ioc;
use Windwalker\Utilities\Arr;

/**
 * The TinymceEditorField class.
 *
 * @method  mixed|$this  contentCss(string | array $value = null)
 * @method  mixed|$this  langFolder(string $value = null)
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
     * @param   array $attrs
     *
     * @return  void
     */
    protected function prepareScript($attrs)
    {
        $luna    = LunaHelper::getPackage();
        $options = (array) $this->get('options', []);

        $defaultOptions = [];

        // Language
        $this->loadLanguage($defaultOptions);

        $defaultOptions['plugins'] = [];

        if ($this->get('toolbar', static::TOOLBAR_FULL) === static::TOOLBAR_FULL) {
            $defaultOptions['plugins'] = [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools',
            ];

            $defaultOptions['toolbar1'] = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' .
                'bullist numlist outdent indent | link image media | table code | fullscreen';

            $defaultOptions['image_advtab'] = true;
        }

        /*
         * @link  https://www.tinymce.com/docs/plugins/paste/
         */
        if ($this->get('image_upload', true)) {
            $url = $luna->getCurrentPackage()->router->route('_luna_img_upload');

            $defaultOptions['paste_data_images']  = true;
            $defaultOptions['remove_script_host'] = false;
            $defaultOptions['relative_urls']      = false;

            // Image uploader
            $defaultOptions['images_upload_url']     = $url;
            $defaultOptions['images_upload_handler'] = <<<JS
\\function (blobInfo, success, failure) {
    var editorElement = jQuery('#{$this->getId()}');

    editorElement.trigger('image-upload-start');
    
    var xhr, formData;

    xhr = new XMLHttpRequest;
    xhr.withCredentials = false;
    xhr.open('POST', '{$url}');

    xhr.onload = function() {
      var json;
      editorElement.trigger('image-upload-complete');

      if (xhr.status !== 200) {
        failure('HTTP Error: ' + decodeURIComponent(xhr.statusText));
        editorElement.trigger('image-upload-error');
        return;
      }

      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.data.url !== 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        console.error('Invalid JSON: ' + xhr.responseText);
        editorElement.trigger('image-upload-error');
        return;
      }

      success(json.data.url);
      
      editorElement.trigger('image-upload-success');
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
            $defaultOptions['plugins'][] = 'lunadragdrop';
        }

        $options = Arr::mergeRecursive($defaultOptions, $options);

        // Set global settings
        $contentCss = (array) Arr::get($options, 'content_css', $this->get('content_css'));

        array_unshift($contentCss, Asset::root() . '/' . $luna->name . '/css/tinymce/content.css');

        $options['content_css'] = implode(',', $contentCss);

        EditorScript::tinymce('#' . $attrs['id'], $options);
    }

    /**
     * loadLanguage
     *
     * @param array $defaultOptions
     *
     * @return  void
     */
    protected function loadLanguage(array &$defaultOptions)
    {
        $lang = Translator::getLocale() ?: Translator::getDefaultLocale();
        $lang = str_replace('-', '_', $lang);

        $langFolder = $this->get('lang_folder');

        if ($langFolder) {
            $config = Ioc::getConfig();

            $assetFolder = $config->get('asset.folder', 'asset');
            $langPath    = WINDWALKER_PUBLIC . '/' . $assetFolder . '/' . $langFolder . '/' . $lang . '.js';
            $langUrl     = Ioc::getUriData()->path . '/' . $assetFolder . '/' . $langFolder . '/' . $lang . '.js';

            if (is_file($langPath)) {
                $defaultOptions['language']     = $lang;
                $defaultOptions['language_url'] = $langUrl;
            }
        }

        if (is_file(LUNA_SOURCE . '/Resources/asset/js/tinymce/langs/' . $lang . '.js')) {
            $defaultOptions['language'] = $lang;
        }
    }

    /**
     * getAccessors
     *
     * @return  array
     *
     * @since   1.2.6
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'contentCss' => 'content_css',
            'langFolder' => 'lang_folder',
        ]);
    }
}
