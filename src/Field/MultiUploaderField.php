<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Asset\Asset;
use Windwalker\Core\Form\AbstractFieldDefinition;
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
        $attrs['placeholder'] = $this->getAttribute('placeholder') ?: __('luna.form.field.multi.image.placeholder');
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
            'imageMetaForm' => $form
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
                    $value[$field->getName()] = '';
                }
            }
        }

        $data = [
            'images' => $values,
            'uploadUrl' => (string) $url,
            'maxFiles' => $this->maxFiles(),
            'current' => new \stdClass(),
            'currentIndex' => null
        ];

        $options = HtmlHelper::getJSObject($data);

        $js = <<<JS
$(function () {
  var vm = new Vue({
    name: 'multi-uploader',
    el: '#{$attrs['id']}-wrap',
    data: $options,
    mounted: function () {
      this.\$options.metaModal = $('#{$attrs['id']}-meta-modal');
    },
    updated: function () {

    },
    methods: {
      openImage(item) {
        if (this.\$options.openImageHandler) {
          this.\$options.openImageHandler(item);
        } else {
          window.open(item.url);
        }
      },
      
      itemClick: function (item, i, event) {
        this.current = item;
        this.currentIndex = i;
        
        this.\$options.metaModal.modal('show');
      },

      metaSave() {
        this.current = {};
        this.currentIndex = null;

        this.\$options.metaModal.modal('hide');
      }
    },
    watch: {
      images: function () {
      }
    }
  });

  $('#{$attrs['id']}-wrap').data('multi-uploader', vm);
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
        $imageForm = $this->imageForm();

        $form = new Form($this->getId() . '-meta');

        if ($imageForm === true || is_array($imageForm)) {
            if ($imageForm === true) {
                $imageForm = [
                    'title' => true,
                    'alt' => true,
                    'link' => true,
                    'description' => true,
                ];
            }

            $imageForm = function (Form $form) use ($imageForm) {
                if (!empty($imageForm['title'])) {
                    $form->add('title', TextField::class)
                        ->label(__('luna.form.field.multi.image.meta.title'))
                        ->class('form-control');
                }

                if (!empty($imageForm['alt'])) {
                    $form->add('alt', TextField::class)
                        ->label(__('luna.form.field.multi.image.meta.alt'))
                        ->class('form-control');
                }

                if (!empty($imageForm['link'])) {
                    $form->add('link', UrlField::class)
                        ->label(__('luna.form.field.multi.image.meta.link'))
                        ->class('form-control');
                }

                if (!empty($imageForm['description'])) {
                    $form->add('description', TextareaField::class)
                        ->label(__('luna.form.field.multi.image.meta.description'))
                        ->class('form-control')
                        ->rows(5);
                }
            };
        } elseif (is_string($imageForm) && is_subclass_of($imageForm, AbstractFieldDefinition::class)) {
            $imageForm = Ioc::make($imageForm, ['form' => $form]);
        } else {
            return $form;
        }

        if (is_callable($imageForm)) {
            $imageForm($form);
        } elseif ($imageForm instanceof AbstractFieldDefinition) {
            $form->defineFormFields($imageForm);
        } else {
            throw new \InvalidArgumentException('Wrong image meta format.');
        }

        foreach ($form->getFields() as $field) {
            $field->setValue(null);
            $field->attr('v-model', 'current.' . $field->getName());
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
        ]);
    }
}
