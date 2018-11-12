<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer\Style;

/**
 * The StyleRules class.
 *
 * @since  __DEPLOY_VERSION__
 */
class StyleRules
{
    /**
     * Property rules.
     *
     * @var array|StyleContainer[]
     */
    protected $rules = [];

    /**
     * addRule
     *
     * @param string $name
     * @param string $value
     * @param string $unit
     *
     * @return  static
     *
     * @since  __DEPLOY_VERSION__
     */
    public function add($name, $value, $unit = '')
    {
        if ((string) $value !== '') {
            $this->rules[$name] = $value . $unit;
        }

        return $this;
    }

    /**
     * addStyles
     *
     * @param StyleContainer $style
     *
     * @return  $this
     *
     * @since  __DEPLOY_VERSION__
     */
    public function addStyles(StyleContainer $style)
    {
        $this->rules[] = $style;

        return $this;
    }

    /**
     * render
     *
     * @param string $selector
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function render($selector = '')
    {
        $css = [];

        foreach ($this->rules as $name => $value) {
            if ($value instanceof StyleContainer) {
                $css[] = $value->render();
                continue;
            }

            if ((string) $value === '') {
                continue;
            }

            $css[] = $name . ': ' . $value . ';';
        }

        $lf = WINDWALKER_DEBUG ? "\n" : ' ';

        $body = implode($lf, $css);

        if (trim($body) === '') {
            return '';
        }

        return "$selector {{$lf}{$body}{$lf}}";
    }
}
