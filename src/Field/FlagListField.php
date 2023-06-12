<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Services\LocaleService;
use Unicorn\Script\UnicornScript;
use Windwalker\DI\Attributes\Service;
use Windwalker\DOM\DOMElement;
use Windwalker\Filesystem\FileObject;
use Windwalker\Filesystem\Filesystem;
use Windwalker\Filesystem\Path;
use Windwalker\Form\Field\ListField;

/**
 * The FlagListField class.
 *
 * @method  $this  optionAttrs(array $value = null)
 * @method  mixed  getOptionAttrs()
 */
class FlagListField extends ListField
{
    #[Service]
    protected LocaleService $localeService;

    #[Service]
    protected UnicornScript $unicornScript;

    /**
     * @inheritDoc
     */
    public function buildFieldElement(DOMElement $input, array $options = []): string|DOMElement
    {
        $this->prepareScript();

        return parent::buildFieldElement($input, $options);
    }

    /**
     * @inheritDoc
     */
    protected function prepareOptions(): array
    {
        $attrs = (array) $this->getOptionAttrs();

        $options = [];

        foreach ($this->getFlagFiles() as $file) {
            $name = Path::stripExtension($file->getBasename());

            $attrs['data-flag-class'] = $this->localeService->getFlagIconClass($name);

            $options[] = static::createOption(
                $name,
                $name,
                $attrs
            );
        }

        return $options;
    }

    /**
     * getFlagFiles
     *
     * @return  iterable<FileObject>
     */
    public function getFlagFiles(): iterable
    {
        return Filesystem::files(LunaPackage::path('assets/flags/4x3'));
    }

    protected function prepareScript(): void
    {
        $selector = '#' . $this->getId();
        $js = <<<JS
u.\$ui.tomSelect('$selector', {
  render: {
    option: function (data, escape) {
      return '<div>'
        + '<span class="' + data.flagClass + ' me-1"></span> '
        + escape(data.text) + '</div>';
    },
    item: function (data, escape) {
      return '<div>'
        + '<span class="' + data.flagClass + ' me-1"></span> <span>'
        + escape(data.text) + '</span></div>';
    },
  }
})
JS;

        $this->unicornScript->importMainThen($js);
    }

    /**
     * @inheritDoc
     */
    protected function getAccessors(): array
    {
        return array_merge(
            parent::getAccessors(),
            [
                'optionAttrs'
            ]
        );
    }
}
