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
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Form\Field\AbstractField;
use Windwalker\Html\Helper\HtmlHelper;
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
 * @method  mixed|$this  imageMeta(bool $value = null)
 *
 * @since  __DEPLOY_VERSION__
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
        $this->prepareScript($attrs);

        $id  = $this->getId();

        $defaultLayout = 'luna.form.field.multi-uploader';

        return WidgetHelper::render($this->get('layout', $defaultLayout), [
            'id' => $id,
            'input' => '',
            'attrs' => $attrs,
            'field' => $this,
            'items' => []
        ], WidgetHelper::EDGE);
    }

    /**
     * prepareScript
     *
     * @param array $attrs
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function prepareScript(array $attrs)
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

        if (is_string($this->getValue())) {
            $values = array_filter(explode(',', $this->getValue()), 'strlen');
        }

        foreach ($values as &$value) {
            if (is_object($value)) {
                $value = Arr::toArray($value);
            }

            if (!is_array($value)) {
                $value = [
                    'title' => '',
                    'alt' => '',
                    'description' => '',
                    'url' => $value,
                    'thumb_url' => ''
                ];
            }
        }

        $data = [
            'images' => $values,
            'uploadUrl' => $url,
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
            'imageMeta' => 'image_meta',
        ]);
    }
}
