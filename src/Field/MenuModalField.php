<?php

/**
 * Part of datavideo project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Menu;
use Psr\Http\Message\UriInterface;
use Unicorn\Field\ModalField;
use Windwalker\Uri\Uri;

/**
 * The UserModalField class.
 */
class MenuModalField extends ModalField
{
    protected string $menuType = '';

    protected function configure(): void
    {
        $this->route('menu_list');
        $this->table(Menu::class);
    }

    protected function getItemTitle(): ?string
    {
        return $this->getItem()['title'] ?? '';
    }

    protected function getDefaultUrl(): UriInterface|string|null
    {
        $url = parent::getDefaultUrl();

        if ($url instanceof Uri) {
            $url = $url->withVar('type', $this->getMenuType());
        }

        return $url;
    }

    /**
     * @return string
     */
    public function getMenuType(): string
    {
        return $this->menuType;
    }

    /**
     * @param  string  $menuType
     *
     * @return  static  Return self to support chaining.
     */
    public function menuType(string $menuType): static
    {
        $this->menuType = $menuType;

        return $this;
    }
}
