<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\View\View;
use Windwalker\Form\FieldDefinitionInterface;

/**
 * The AbstractWidget class.
 *
 * @method string getId()
 * @method string getTitle()
 * @method string getContent()
 * @method string getPosition()
 * @method array  getParams()
 * @method BasicState getState()
 * @method string getLanguage()
 */
abstract class AbstractWidget implements FieldDefinitionInterface
{
    protected Widget $data;

    protected static string $type = '';

    abstract public static function getTypeIcon(): string;

    abstract public static function getTypeTitle(LangService $lang): string;

    abstract public static function getTypeDescription(LangService $lang): string;

    /**
     * @return string
     */
    public static function getType(): string
    {
        return self::$type;
    }

    /**
     * @param  string  $type
     *
     * @return  void
     */
    public static function setType(string $type): void
    {
        static::$type = $type;
    }

    abstract public function getLayout(): string;

    public function render(View $view, array $data = []): string
    {
        $view->setLayoutMap($this->getLayout());

        return (string) $view->render($data)?->getBody();
    }

    /**
     * @return Widget
     */
    public function getData(): Widget
    {
        return $this->data;
    }

    /**
     * @param  Widget  $data
     *
     * @return  static  Return self to support chaining.
     */
    public function setData(Widget $data): static
    {
        $this->data = $data;

        return $this;
    }

    public function getParam(): array
    {
        return $this->getData()->getParams();
    }

    public function __call(string $name, array $args): mixed
    {
        return $this->getData()->$name(...$args);
    }
}
