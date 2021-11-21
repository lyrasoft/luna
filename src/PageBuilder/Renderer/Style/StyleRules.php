<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer\Style;

/**
 * The StyleRules class.
 *
 * @since  1.5.2
 */
class StyleRules
{
    /**
     * Property rules.
     *
     * @var array|StyleContainer[]
     */
    protected array $rules = [];

    /**
     * addRule
     *
     * @param string $name
     * @param string $value
     * @param string $unit
     *
     * @return  static
     *
     * @since  1.5.2
     */
    public function add(string $name, string $value, string $unit = ''): static
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
     * @since  1.5.2
     */
    public function addStyles(StyleContainer $style): static
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
     * @since  1.5.2
     */
    public function render(string $selector = ''): string
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
