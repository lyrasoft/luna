<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

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
    protected $prefix = '';

    /**
     * Property selectors.
     *
     * @var  StyleRules[]
     */
    protected $selectors = [];

    /**
     * StyleContainer constructor.
     *
     * @param string $prefix
     */
    public function __construct($prefix = '')
    {
        $this->prefix = $prefix;
    }

    /**
     * self
     *
     * @param string $suffix
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    public function self($suffix = '')
    {
        return $this->doSelect($this->prefix . $suffix);
    }

    /**
     * select
     *
     * @param string        $selector
     * @param callable|null $callback
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    public function select($selector, callable $callback = null)
    {
        $k = trim($this->prefix . ' ' . $selector);

        return $this->doSelect($k, $callback);
    }

    /**
     * doSelect
     *
     * @param string        $selector
     * @param callable|null $callback
     *
     * @return  StyleRules
     *
     * @since  1.5.2
     */
    protected function doSelect($selector, callable $callback = null)
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
     * @param string        $selector
     * @param callable|null $callback
     *
     * @return  StyleContainer
     *
     * @since  1.5.2
     */
    public function wrap($selector, callable $callback = null)
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
     * @param callable $callback
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function rwd(callable $callback)
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
    public function render()
    {
        $styles = [];

        uksort($this->selectors, function ($a, $b) {
            return strpos($a, '@media') === 0 ? 1 : -1;
        });

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
