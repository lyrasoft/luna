<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer\Style;

/**
 * The StyleContainer class.
 *
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public function __toString()
    {
        return $this->render();
    }
}
