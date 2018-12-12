<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field\Editor;

use Lyrasoft\Luna\Script\EditorScript;
use Windwalker\Dom\HtmlElement;
use Windwalker\Dom\HtmlElements;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Ioc;

/**
 * The AbstractEditorField class.
 *
 * @method  mixed|$this  excludes(string $value = null)
 * @method  mixed|$this  includes(string $value = null)
 * @method  mixed|$this  editorOptions(array $value = null)
 * @method  mixed|$this  imageUploadScript(bool $value = null)
 * @method  mixed|$this  toolbar(string $value = null)
 *
 * @since  1.0
 */
abstract class AbstractEditorField extends TextareaField
{
    /**
     * Property editorName.
     *
     * @var  string
     */
    protected $editorName = null;

    /**
     * buildInput
     *
     * @param array $attrs
     *
     * @return  mixed
     */
    public function buildInput($attrs)
    {
        $this->prepareGlobalScript($attrs);

        $this->prepareScript($attrs);

        $input   = parent::buildInput($attrs);
        $buttons = new HtmlElements;

        Ioc::getDispatcher()->triggerEvent('onLunaEditorGetButtons', [
            'input' => $input,
            'name' => $this->editorName,
            'field' => $this,
            'buttons' => $buttons,
            'includes' => (array) $this->get('includes'),
            'excludes' => (array) $this->get('excludes'),
        ]);

        if (count($buttons)) {
            $buttons = new HtmlElement('div', $buttons, ['class' => 'editor-buttons ' . $this->getId() . '-buttons mt-3']);
        }

        return $input . $buttons;
    }

    /**
     * prepareScript
     *
     * @param   array $attrs
     *
     * @return  void
     */
    protected function prepareScript($attrs)
    {
    }

    /**
     * prepareGlobalScript
     *
     * @param   array $attrs
     *
     * @return  void
     */
    protected function prepareGlobalScript($attrs)
    {
        EditorScript::editor();
    }

    /**
     * Method to get property EditorName
     *
     * @return  string
     */
    public function getEditorName()
    {
        return $this->editorName;
    }

    /**
     * Method to set property editorName
     *
     * @param   string $editorName
     *
     * @return  static  Return self to support chaining.
     */
    public function setEditorName($editorName)
    {
        $this->editorName = $editorName;

        return $this;
    }

    /**
     * getAccessors
     *
     * @return  array
     *
     * @since   3.1.2
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'includes',
            'excludes',
            'toolbar',
            'editorOptions' => 'options',
            'imageUploadScript' => 'image_upload',
        ]);
    }
}
