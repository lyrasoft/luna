<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Asset\Asset;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Form\Field\AbstractField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Field\UrlField;
use Windwalker\Form\Form;
use Windwalker\Html\Helper\HtmlHelper;
use Windwalker\Ioc;
use Windwalker\String\Str;
use Windwalker\Utilities\Arr;

/**
 * The MultiImageField class.
 *
 * @method  mixed|$this  placeholder(string $value = null)
 * @method  mixed|$this  onchange(string $value = null)
 * @method  mixed|$this  url(string $value = null)
 * @method  mixed|$this  resize(bool $value = null)
 * @method  mixed|$this  crop(bool $value = null)
 * @method  mixed|$this  width(int $value = null)
 * @method  mixed|$this  height(int $value = null)
 * @method  mixed|$this  quality(int $value = null)
 * @method  mixed|$this  maxFiles(int $value = null)
 * @method  mixed|$this  imageForm(bool|callable|AbstractFieldDefinition $value = null)
 * @method  mixed|$this  editForm(bool|callable|AbstractFieldDefinition $value = null)
 * @method  mixed|$this  thumbSize(int $value = null)
 * @method  mixed|$this  accept(string $value = null)
 * @method  mixed|$this  canReUpload(bool $value = null)
 * @method  mixed|$this  maxConcurrent(int $value = null)
 *
 * @since  1.5.2
 */
class MultiUploaderField extends AbstractField
{
    /**
     * prepareRenderInput
     *
     * @param array $attrs
     *
     * @return  void
     */
    public function prepare(&$attrs)
    {
        $attrs['type'] = $this->type ?: 'hidden';
        $attrs['name'] = $this->getFieldName();
        $attrs['id'] = $this->getAttribute('id', $this->getId());
        $attrs['placeholder'] = $this->getAttribute('placeholder') ?: __('luna.form.field.multi.uploader.placeholder');
        $attrs['class'] = $this->getAttribute('class');
        $attrs['readonly'] = $this->getAttribute('readonly');
        $attrs['disabled'] = $this->getAttribute('disabled');
        $attrs['onchange'] = $this->getAttribute('onchange');
        $attrs['value'] = $this->getValue();

        $attrs['required'] = $this->required;
    }

    /**
     * buildInput
     *
     * @param array $attrs
     *
     * @return  string
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function buildInput($attrs)
    {
        $form = $this->getImageMetaForm();

        $this->prepareScript($attrs, $form);

        $id  = $this->getId();

        $defaultLayout = 'luna.form.field.multi-uploader';

        return WidgetHelper::render($this->get('layout', $defaultLayout), [
            'id' => $id,
            'input' => '',
            'attrs' => $attrs,
            'field' => $this,
            'items' => [],
            'imageMetaForm' => $form,
            'editForm' => $form,
        ], WidgetHelper::EDGE);
    }

    /**
     * prepareScript
     *
     * @param array $attrs
     * @param Form  $form
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareScript(array $attrs, Form $form)
    {
        static $inited = false;

        if (!$inited) {
            LunaScript::vueDragUploader();
            Asset::addJS(PackageHelper::getAlias(LunaPackage::class) . '/js/field/multi-uploader-field.min.js');
        }

        $url = $this->url() ?: LunaHelper::getPackage()
            ->getCurrentPackage()
            ->router
            ->route('_luna_img_upload', [
                'resize' => (int) $this->resize(),
                'crop' => (int) $this->crop(),
                'size' => implode('x', array_filter([$this->width(), $this->height()])) ?: '1200x1200',
                'quality' => (int) $this->quality()
            ]);

        $values = $this->getValue() ?: [];
        $current = [
            'url' => '',
            'thumb_url' => ''
        ];

        if (is_string($values)) {
            if (Str::startsWith($values, '[') || Str::startsWith($values, '{')) {
                $values = json_decode($values);
            } else {
                $values = array_filter(explode(',', $this->getValue()), 'strlen');
            }
        }

        foreach ($values as &$value) {
            if (is_object($value)) {
                $value = Arr::toArray($value);
            }

            if (!is_array($value)) {
                $value = [
                    'url' => $value,
                    'thumb_url' => ''
                ];
            }

            // Prepare default value placeholder
            foreach ($form->getFields() as $field) {
                if (!isset($value[$field->getName()])) {
                    $value[$field->getName()] = $field->get('multiple') ? [] : '';
                }
            }
        }

        // Prepare default value placeholder
        foreach ($form->getFields() as $field) {
            $current[$field->getName()] = $field->get('multiple') ? [] : '';
        }

        $data = [
            'value' => $values,
            'uploadUrl' => $url,
            'maxFiles' => $this->maxFiles(),
            'current' => $current,
            'currentIndex' => null,
            'thumbSize' => $this->thumbSize(),
            'disabled' => (bool) $this->get('disabled'),
            'readonly' => (bool) $this->get('readonly'),
            'loading' => false,
            'canReUpload' => $this->canReUpload(),
            'maxConcurrent' => $this->maxConcurrent(),
        ];

        $options = HtmlHelper::getJSObject($data);

        $js = <<<JS
$(function () {
  var opt = {
    data: function () {
        return $options;
    }
  };
  new MultiUploader(opt).\$mount('#{$attrs['id']}-wrap');
});
JS;

        Asset::internalJS($js);
    }

    /**
     * getImageMetaForm
     *
     * @return  Form
     *
     * @since  1.5.5
     */
    protected function getImageMetaForm()
    {
        $editForm = $this->editForm() ?: $this->imageForm();

        $form = new Form($this->getId() . '-meta');

        if ($editForm === true || is_array($editForm)) {
            if ($editForm === true) {
                $editForm = [
                    'title' => true,
                    'alt' => true,
                    'link' => true,
                    'description' => true,
                ];
            }

            $editForm = function (Form $form) use ($editForm) {
                if (!empty($editForm['title'])) {
                    $form->add('title', TextField::class)
                        ->label(__('luna.form.field.multi.uploader.meta.title'))
                        ->class('form-control');
                }

                if (!empty($editForm['alt'])) {
                    $form->add('alt', TextField::class)
                        ->label(__('luna.form.field.multi.uploader.meta.alt'))
                        ->class('form-control');
                }

                if (!empty($editForm['link'])) {
                    $form->add('link', UrlField::class)
                        ->label(__('luna.form.field.multi.uploader.meta.link'))
                        ->class('form-control');
                }

                if (!empty($editForm['description'])) {
                    $form->add('description', TextareaField::class)
                        ->label(__('luna.form.field.multi.uploader.meta.description'))
                        ->class('form-control')
                        ->rows(5);
                }
            };
        } elseif (is_string($editForm) && is_subclass_of($editForm, AbstractFieldDefinition::class)) {
            $editForm = Ioc::make($editForm, ['form' => $form]);
        } elseif (!$editForm) {
            return $form;
        }

        if (is_callable($editForm)) {
            $editForm($form);
        } elseif ($editForm instanceof AbstractFieldDefinition) {
            $form->defineFormFields($editForm);
        } else {
            throw new \InvalidArgumentException('Wrong image meta format.');
        }

        foreach ($form->getFields() as $field) {
            $field->setValue(null);
            $field->attr('v-model', 'current.' . $field->getName());
            $field->disabled((bool) $this->get('disabled'));
            $field->readonly((bool) $this->get('readonly'));
        }

        return $form;
    }

    /**
     * getAccessors
     *
     * @return  array
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'placeholder',
            'onchange',
            'url',
            'resize',
            'crop',
            'height',
            'width',
            'quality',
            'maxFiles' => 'max_files',
            'imageForm' => 'image_form',
            'editForm' => 'edit_form',
            'thumbSize' => 'thumb_size',
            'accept',
            'canReUpload',
            'maxConcurrent',
        ]);
    }
}
