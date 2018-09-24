<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Style\StyleRules;

/**
 * The StyleHelper class.
 *
 * @since  __DEPLOY_VERSION__
 */
class StyleHelper
{
    /**
     * addOffsets
     *
     * @param StyleRules $rules
     * @param string     $rule
     * @param string     $value
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function addOffsets(StyleRules $rules, $rule, $value)
    {
        list($top, $right, $bottom, $left) = array_pad(explode(',', $value), 4, '');

        $rules->add($rule . '-top', $top);
        $rules->add($rule . '-right', $right);
        $rules->add($rule . '-bottom', $bottom);
        $rules->add($rule . '-left', $left);
    }
}
