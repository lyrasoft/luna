<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Services\AssociationService;
use Unicorn\Field\DatabaseAwareTrait;
use Unicorn\Field\LayoutFieldTrait;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DOM\DOMElement;
use Windwalker\Form\Field\AbstractField;
use Windwalker\ORM\Metadata\EntityMetadata;
use Windwalker\Query\Query;
use Windwalker\Utilities\Cache\InstanceCacheTrait;
use Windwalker\Utilities\StrNormalize;
use Windwalker\Utilities\TypeCast;

use function Windwalker\collect;

/**
 * The LocaleSwitchField class.
 */
class LocaleSwitchField extends AbstractField
{
    use LayoutFieldTrait;
    use InstanceCacheTrait;
    use DatabaseAwareTrait;

    protected string $languageField = 'language';

    protected mixed $currentId = null;

    protected string $titleField = 'title';

    protected ?string $assocType = null;

    protected ?string $routeName = null;

    protected bool $allowCreateEmpty = false;

    protected bool $canChangeSelfLang = true;

    protected bool $showAllOption = true;

    #[Inject]
    protected AssociationService $associationService;

    public function prepareInput(DOMElement $input): DOMElement
    {
        $input['style'] = 'display: none;';
        $input['data-role'] = 'value';

        $input['value'] = $this->getValue();

        return $input;
    }

    public function buildFieldElement(DOMElement $input, array $options = []): string|DOMElement
    {
        $field = $this;

        return $this->renderLayout(
            $this->getLayout(),
            compact(
                'input',
                'field',
                'options'
            )
        );
    }

    public function getDefaultLayout(): string
    {
        return '@theme::field.locale-switch';
    }

    public function loadItems(): Collection
    {
        return $this->once(
            'items',
            fn() => $this->getValue() ? collect(TypeCast::toArray($this->getItems())) : collect()
        );
    }

    public function getItemByLandCode(string $code): ?Collection
    {
        $items = $this->loadItems();

        return $items->findFirst(fn (Collection $item) => $item[$this->getLanguageField()] === $code);
    }

    /**
     * @return string
     */
    public function getTitleField(): string
    {
        return $this->titleField;
    }

    /**
     * @param  string  $titleField
     *
     * @return  static  Return self to support chaining.
     */
    public function titleField(string $titleField): static
    {
        $this->titleField = $titleField;

        return $this;
    }

    /**
     * @return bool
     */
    public function isCanChangeSelfLang(): bool
    {
        return $this->canChangeSelfLang;
    }

    /**
     * @param  bool  $canChangeSelfLang
     *
     * @return  static  Return self to support chaining.
     */
    public function canChangeSelfLang(bool $canChangeSelfLang): static
    {
        $this->canChangeSelfLang = $canChangeSelfLang;

        return $this;
    }

    protected function prepareQuery(Query $query): void
    {
        $assocs = $this->associationService->getRelativeItemsByTargetId(
            $this->getAssocType(),
            (string) $this->getCurrentId()
        );

        $ids = [$this->getCurrentId()];

        foreach ($assocs as $assoc) {
            $ids[] = $assoc->getTargetId();
        }

        $query->where($this->getIdName(), 'in', $ids ?: [0]);
    }

    /**
     * @return string
     */
    public function getLanguageField(): string
    {
        return $this->languageField;
    }

    /**
     * @param  string  $languageField
     *
     * @return  static  Return self to support chaining.
     */
    public function languageField(string $languageField): static
    {
        $this->languageField = $languageField;

        return $this;
    }

    public function getIdName(): string
    {
        $metadata = $this->getDb()->orm()->getEntityMetadata($this->getTable());

        $key = $metadata->getMainKey();

        if (!$key) {
            throw new \LogicException('Table: ' . $this->getTable() . ' must has a main key.');
        }

        return $key;
    }

    /**
     * @return string
     */
    public function getRouteName(): string
    {
        $routeName = $this->routeName;

        if (!$routeName) {
            $routeName = $this->getSnakeTableName();

            $routeName .= '_edit';
        }

        return $routeName;
    }

    /**
     * @param  string|null  $routeName
     *
     * @return  static  Return self to support chaining.
     */
    public function routeName(?string $routeName): static
    {
        $this->routeName = $routeName;

        return $this;
    }

    /**
     * @return string
     */
    public function getAssocType(): string
    {
        return $this->assocType ?? $this->getSnakeTableName();
    }

    /**
     * @param  string|null  $assocType
     *
     * @return  static  Return self to support chaining.
     */
    public function assocType(?string $assocType): static
    {
        $this->assocType = $assocType;

        return $this;
    }

    /**
     * @return  string
     */
    public function getSnakeTableName(): string
    {
        return $this->once(
            'snake.table',
            function () {
                $table = Collection::explode("\\", $this->getTable())
                    ->last();

                return StrNormalize::toSnakeCase($table);
            }
        );
    }

    /**
     * @return mixed
     */
    public function getCurrentId(): mixed
    {
        return $this->currentId;
    }

    /**
     * @param  mixed  $id
     *
     * @return  static  Return self to support chaining.
     */
    public function currentId(mixed $id): static
    {
        $this->currentId = $id;

        return $this;
    }

    public function table(?string $table): static
    {
        if (!EntityMetadata::isEntity($table)) {
            throw new \LogicException('Table: ' . $table . ' must be an entity');
        }

        $this->table = $table;

        return $this;
    }

    /**
     * @return bool
     */
    public function isAllowCreateEmpty(): bool
    {
        return $this->allowCreateEmpty;
    }

    /**
     * @param  bool  $allowCreateEmpty
     *
     * @return  static  Return self to support chaining.
     */
    public function allowCreateEmpty(bool $allowCreateEmpty): static
    {
        $this->allowCreateEmpty = $allowCreateEmpty;

        return $this;
    }

    /**
     * @return bool
     */
    public function isShowAllOption()
    {
        return $this->showAllOption;
    }

    /**
     * @param  bool  $showAllOption
     *
     * @return  static  Return self to support chaining.
     */
    public function showAllOption(bool $showAllOption)
    {
        $this->showAllOption = $showAllOption;

        return $this;
    }
}
