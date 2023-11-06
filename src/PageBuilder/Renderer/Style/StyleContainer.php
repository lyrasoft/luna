<?php

namespace Lyrasoft\Luna\PageBuilder\Renderer\Style;

/**
 * The StyleContainer class.
 *
 * @since  1.5.2
 */
class StyleContainer
{
    /**
     * Property prefix.
     *
     * @var string
     */
    protected string $prefix = '';

    /**
     * Property selectors.
     *
     * @var  StyleRules[]
     */
    protected array $selectors = [];

    /**
     * StyleContainer constructor.
     *
     * @param  string  $prefix
     */
    public function __construct(string $prefix = '')
    {
        $this->prefix = $prefix;
    }

    /**
     * self
     *
     * @param  string  $suffix
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    public function self(string $suffix = ''): StyleRules
    {
        return $this->doSelect($this->prefix . $suffix);
    }

    /**
     * select
     *
     * @param  string         $selector
     * @param  callable|null  $callback
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    public function select(string $selector, callable $callback = null): StyleRules
    {
        $k = trim($this->prefix . ' ' . $selector);

        return $this->doSelect($k, $callback);
    }

    /**
     * select
     *
     * @param  string         $selector
     * @param  callable|null  $callback
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    public function selectAppend(string $selector, callable $callback = null): StyleRules
    {
        $k = trim($this->prefix . $selector);

        return $this->doSelect($k, $callback);
    }

    /**
     * doSelect
     *
     * @param  string         $selector
     * @param  callable|null  $callback
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    protected function doSelect(string $selector, callable $callback = null): StyleRules
    {
        if (!isset($this->selectors[$selector])) {
            $this->selectors[$selector] = new StyleRules();
        }

        $rules = $this->selectors[$selector];

        if (is_callable($callback)) {
            $callback($rules);
        }

        return $rules;
    }

    /**
     * wrap
     *
     * @param  string         $selector
     * @param  callable|null  $callback
     *
     * @return  StyleContainer
     *
     * @since  1.5.2
     */
    public function wrap(string $selector, callable $callback = null): StyleContainer
    {
        if (!isset($this->selectors[$selector])) {
            $this->selectors[$selector] = new StyleRules();
        }

        $rules = $this->selectors[$selector];
        $style = new static($this->prefix);

        if (is_callable($callback)) {
            $callback($style);
        }

        $rules->addStyles($style);

        return $style;
    }

    /**
     * rwd
     *
     * @param  callable  $callback
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function rwd(callable $callback): void
    {
        // LG
        $callback($this, 'lg');

        $style = $this->wrap('@media (max-width: 991px) and (min-width: 768px)');

        $callback($style, 'md');

        $style = $this->wrap('@media (max-width: 767px)');

        $callback($style, 'xs');
    }

    /**
     * render
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(): string
    {
        $styles = [];

        uksort(
            $this->selectors,
            fn($a, $b) => str_starts_with($a, '@media') ? 1 : -1
        );

        foreach ($this->selectors as $selector => $rules) {
            $styles[] = $rules->render($selector);
        }

        $lf = WINDWALKER_DEBUG ? "\n\n" : ' ';

        return implode($lf, $styles);
    }

    /**
     * __toString
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function __toString()
    {
        return $this->render();
    }
}
