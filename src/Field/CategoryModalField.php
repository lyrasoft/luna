<?php

/**
 * Part of datavideo project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use App\Entity\Menu;
use Lyrasoft\Luna\Entity\Category;
use Psr\Http\Message\UriInterface;
use Unicorn\Field\ModalField;
use Windwalker\Uri\Uri;

/**
 * The UserModalField class.
 */
class CategoryModalField extends ModalField
{
    protected string $categoryType = '';

    protected function configure(): void
    {
        $this->route('category_list');
        $this->table(Category::class);
    }

    protected function getItemTitle(): ?string
    {
        return $this->getItem()['title'] ?? '';
    }

    protected function getDefaultUrl(): UriInterface|string|null
    {
        $url = parent::getDefaultUrl();

        if ($url instanceof Uri) {
            $url = $url->withVar('type', $this->getCategoryType());
        }

        return $url;
    }

    /**
     * @return string
     */
    public function getCategoryType(): string
    {
        return $this->categoryType;
    }

    /**
     * @param  string  $type
     *
     * @return  static  Return self to support chaining.
     */
    public function categoryType(string $type): static
    {
        $this->categoryType = $type;

        return $this;
    }
}
