<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field\Editor;

use Lyrasoft\Luna\Script\EditorScript;

/**
 * The SummernoteEditorField class.
 *
 * @since  1.0
 */
class SummernoteEditorField extends AbstractEditorField
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
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareScript($attrs)
    {
        $options = (array) $this->get('options', []);

        if ($this->get('toolbar') === static::TOOLBAR_SIMPLE) {
            $options['toolbar'] = [
                ['size', ['fontsize']],
                ['color', ['color']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['layout', ['ul', 'ol', 'paragraph']],
                ['insert', ['link']],
                ['misc', ['fullscreen', 'undo', 'redo', 'help']],
            ];
        }

        if ($this->get('image_upload', true)) {
            if (!isset($options['callbacks']['onImageUpload'])) {
                $options['callbacks']['onImageUpload'] = <<<JS
\\function(files) {
	SummernoteLunaEditor.getInstance('#{$this->getId()}').sendFile(files[0]);
}
JS;
            }
        }

        EditorScript::summernote('#' . $attrs['id'], $options);
    }
}
