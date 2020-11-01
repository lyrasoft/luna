<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\PhoenixScript;
use Windwalker\Core\Asset\AbstractScript;
use Windwalker\Core\Language\Translator;
use Windwalker\Utilities\Arr;

/**
 * The Select2Script class.
 *
 * @since  1.0
 */
class Select2Script extends AbstractScript
{
    /**
     * select2
     *
     * @return  void
     *
     * @deprecated
     */
    public static function core()
    {
        PhoenixScript::select2();
    }

    /**
     * select2
     *
     * @param string $selector
     * @param array  $options
     *
     * @return  void
     */
    public static function select2($selector, $options = [])
    {
        static::core();

        if (!static::inited(__METHOD__, get_defined_vars())) {
            $chosenSelector = Arr::get($options, 'chosen_selector', '.has-select2');

            $js = <<<JS
jQuery(document).ready(function($) {
	var element = $('$selector');

	if (element.is('$chosenSelector')) {
		element.chosen('destroy');
	}
});
JS;

            static::internalJS($js);
            PhoenixScript::select2($selector, $options);
        }
    }

    /**
     * ajaxChosen
     *
     * @param string $selector
     * @param string $url
     * @param array  $options
     *
     * @return  void
     */
    public static function ajaxSelect2($selector, $url, $options = [])
    {
        static::core();

        if (!static::inited(__METHOD__, get_defined_vars())) {
            $process = <<<JS
\\function (data, params) {
	return {
		results: data.data
	}
}
JS;

            $defaultOptions = [
                'ajax' => [
                    'url' => $url,
                    'delay' => 250,
                    'type' => 'GET',
                    'dataType' => 'json',
                    'processResults' => $process,
                ],
                'minimumInputLength' => 1,
                'tags' => true,
                'tokenSeparators' => [','],
                'language' => Translator::getLocale(),
            ];

            $chosenSelector = Arr::get($options, 'chosen_selector', '.has-select2');

            $js = <<<JS
jQuery(document).ready(function($) {
	var element = $('$selector');

	if (element.is('$chosenSelector')) {
		element.chosen('destroy');
	}
});
JS;

            static::internalJS($js);
            PhoenixScript::select2($selector, static::mergeOptions($defaultOptions, $options));
        }
    }

    /**
     * ajaxChosen
     *
     * @param string $selector
     * @param array  $options
     * @param bool   $ajax
     *
     * @return  void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function tag($selector, $options = [], bool $ajax = true)
    {
        if (!static::inited(__METHOD__, get_defined_vars())) {
            $asset = static::getAsset();

            $package = LunaHelper::getPackage()->getCurrentPackage();

            if ($ajax) {
                static::ajaxSelect2($selector, $package->router->route('_luna_ajax_tags'), $options);

                $js = <<<JS
jQuery(document).ready(function($) {
	$('$selector').on('select2:selecting', function(event) {
        var data = event.params.args.data;

        if (data.id == data.text) {
            data.id = 'new#' + data.id;
        }
    });
});
JS;

                $asset->internalScript($js);
            } else {
                $defaultOptions = [
                    'tags' => true,
                    'tokenSeparators' => [','],
                    'createTag' => "\\function (tag) {
                        return {
                          id: 'new#' + tag.term,
                          text: tag.term,
                          // add indicator:
                          isNew : true
                        };
                    }",
                    'language' => Translator::getLocale(),
                ];

                PhoenixScript::select2($selector, static::mergeOptions($defaultOptions, $options));
            }
        }
    }
}
