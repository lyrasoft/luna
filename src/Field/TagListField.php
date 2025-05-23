<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Tag;
use Unicorn\Field\SqlListField;
use Windwalker\DOM\HTMLElement;
use Windwalker\Query\Query;

/**
 * The CategoryListField class.
 */
class TagListField extends SqlListField
{
    protected ?string $table = Tag::class;

    /**
     * @inheritDoc
     */
    public function buildFieldElement(HTMLElement $input, array $options = []): string|HTMLElement
    {
        return parent::buildFieldElement($input, $options);
    }

    protected function prepareQuery(Query $query): void
    {
        parent::prepareQuery($query);

        $query->select('tag.id', 'tag.title');
        $query->order('tag.title', 'ASC');
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
