<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\Widget\WidgetService;
use Unicorn\Field\SqlListField;
use Unicorn\Script\UnicornScript;
use Windwalker\DI\Attributes\Service;
use Windwalker\DOM\HTMLElement;
use Windwalker\Form\Field\ListField;
use Windwalker\Query\Query;

use function Windwalker\raw;

/**
 * The LanguageListField class.
 *
 * @method $this allowCreate(bool $value)
 * @method bool isAllowCreate()
 */
class WidgetPositionListField extends ListField
{
    use LocaleAwareTrait;

    #[Service]
    protected UnicornScript $unicornScript;

    #[Service]
    protected WidgetService $widgetService;

    /**
     * @inheritDoc
     */
    public function buildFieldElement(HTMLElement $input, array $options = []): string|HTMLElement
    {
        $this->prepareScript();

        return parent::buildFieldElement($input, $options);
    }

    /**
     * @inheritDoc
     */
    protected function prepareOptions(): array
    {
        $positions = $this->widgetService->getAllPositions();
        $options = [];

        foreach ($positions as $position => $name) {
            $text = $position === $name
                ? $position
                : "$position ($name)";

            $options[] = static::createOption($text, $position);
        }

        return $options;
    }

    protected function prepareScript(): void
    {
        $selector = '#' . $this->getId();
        $allowCreate = $this->isAllowCreate() ? 'true' : 'false';
        $js = <<<JS
u.\$ui.tomSelect('$selector', {
  create: $allowCreate
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
            [
                'allowCreate'
            ]
        );
    }
}
