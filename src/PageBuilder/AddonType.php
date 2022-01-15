<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\PageBuilder;

use Windwalker\Utilities\Contract\LanguageInterface;

/**
 * The AddonType class.
 */
class AddonType
{
    /**
     * @var class-string<AbstractAddon>|AbstractAddon
     */
    public string $className = '';

    /**
     * @param  AbstractAddon|string  $className
     */
    public function __construct(string $className)
    {
        $this->className = $className;
    }

    public function getType(): string
    {
        return $this->className::getType();
    }

    public function getIcon(): string
    {
        return $this->className::getIcon();
    }

    public function getName(LanguageInterface $lang): string
    {
        return $this->className::getName($lang);
    }

    public function getDescription(LanguageInterface $lang): string
    {
        return $this->className::getDescription($lang);
    }

    public function getVueComponentName(): string
    {
        return $this->className::getVueComponentName();
    }

    /**
     * getClassName
     *
     * @return  string|AbstractAddon
     */
    public function getClassName(): string
    {
        return $this->className;
    }

    /**
     * @inheritDoc
     */
    public function toArray(LanguageInterface $lang): array
    {
        return [
            'type' => $this->getType(),
            'icon' => $this->getIcon(),
            'name' => $this->getName($lang),
            'description' => $this->getDescription($lang),
            'componentName' => $this->getVueComponentName(),
            'className' => $this->getClassName(),
        ];
    }

    public function toJson(LanguageInterface $lang): string
    {
        return json_encode($this->toArray($lang));
    }
}
