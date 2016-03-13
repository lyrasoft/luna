<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\AbstractScriptManager;
use Windwalker\Utilities\ArrayHelper;

/**
 * The Select2Script class.
 *
 * @since  {DEPLOY_VERSION}
 */
class Select2Script extends AbstractScriptManager
{
	/**
	 * select2
	 *
	 * @return  void
	 */
	public static function core()
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__))
		{
			$luna = LunaHelper::getPackage();

			$asset->addScript($luna->name . '/js/select2/select2.min.js');
			$asset->addStyle($luna->name . '/css/select2/select2.min.css');

			$asset->internalStyle(<<<CSS
.select2-container .select2-selection--single {
	height: 34px;
}
.select2-container--default .select2-selection--single .select2-selection__rendered {
	line-height: 34px;
}
.select2-container--default .select2-selection--single .select2-selection__arrow {
	height: 34px;
}
.modal .select2-container {
	min-width: 100%;
}
CSS
);
		}
	}

	/**
	 * select2
	 *
	 * @param string $selector
	 * @param array  $options
	 *
	 * @return  void
	 */
	public static function select2($selector, $options = array())
	{
		$asset = static::getAsset();

		static::core();

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$defaultOptions = array();

			$options = $asset::getJSObject(ArrayHelper::merge($defaultOptions, $options));

			$js = <<<JS
jQuery(document).ready(function($) {
	var element = $('$selector');

	if (element.chosen) {
		element.chosen('destroy');
	}

    element.select2($options);
});
JS;

			$asset->internalScript($js);
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
	public static function ajaxSelect2($selector, $url, $options = array())
	{
		$asset = static::getAsset();

		static::core();

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$process = <<<JS
\\function (data, params) {
	return {
		results: data.data
	}
}
JS;

			$defaultOptions = array(
				'ajax' => array(
					'url'      => $url,
					'delay'    => 250,
					'type'     => 'GET',
					'dataType' => 'json',
					'processResults' => $process,
				),
				'minimumInputLength' => 1,
				'tags' => true,
				'tokenSeparators' => array(',')
			);

			$options = $asset::getJSObject(ArrayHelper::merge($defaultOptions, $options));

			$js = <<<JS
jQuery(document).ready(function($) {
	var element = $('$selector');

	if (element.chosen) {
		element.chosen('destroy');
	}

    element.select2($options);
});
JS;

			$asset->internalScript($js);
		}
	}

	/**
	 * ajaxChosen
	 *
	 * @param string $selector
	 * @param array  $options
	 *
	 * @return  void
	 */
	public static function tag($selector, $options = array())
	{
		$asset = static::getAsset();

		if (!static::inited(__METHOD__, func_get_args()))
		{
			$package = LunaHelper::getPackage()->getCurrentPackage();

			static::ajaxSelect2($selector, $package->router->html('_luna_ajax_tags'), $options);

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
		}
	}
}
