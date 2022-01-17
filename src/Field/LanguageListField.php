<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Field\SqlListField;
use Unicorn\Script\UnicornScript;
use Windwalker\DI\Attributes\Service;
use Windwalker\DOM\DOMElement;
use Windwalker\Query\Query;

/**
 * The LanguageListField class.
 */
class LanguageListField extends SqlListField
{
    use LocaleAwareTrait;

    #[Service]
    protected UnicornScript $unicornScript;

    protected ?string $table = Language::class;

    protected ?string $valueField = 'code';

    /**
     * @inheritDoc
     */
    public function buildFieldElement(DOMElement $input, array $options = []): string|DOMElement
    {
        $this->prepareScript();

        return parent::buildFieldElement($input, $options);
    }

    protected function prepareQuery(Query $query): void
    {
        parent::prepareQuery($query);

        $query->select('language.id', 'language.title', 'language.image');
        $query->where('language.state', 1);
        $query->order('language.ordering', 'ASC');
    }

    public function createItemOption(object $item): DOMElement
    {
        $option = parent::createItemOption($item);

        $option->setAttribute('data-flag-class', $this->localeService->getFlagIconClass($item->image));

        return $option;
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
     * getAccessors
     *
     * @return    array
     */
    protected function getAccessors(): array
    {
        return array_merge(
            parent::getAccessors(),
            []
        );
    }
}
