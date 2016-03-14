<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Language;

use Lyrasoft\Luna\Language\LanguageHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Windwalker\Filesystem\File;
use Windwalker\Filesystem\Folder;
use Windwalker\Form\Field\ListField;
use Windwalker\Html\Option;

/**
 * The FlagListField class.
 *
 * @since  {DEPLOY_VERSION}
 */
class FlagListField extends ListField
{
	/**
	 * buildInput
	 *
	 * @param array $attrs
	 *
	 * @return  mixed|void
	 */
	public function buildInput($attrs)
	{
		$this->prepareScript();

		return parent::buildInput($attrs);
	}

	/**
	 * prepareOptions
	 *
	 * @return  Option[]
	 */
	protected function prepareOptions()
	{
		$options = array();

		$attribs = (array) $this->getAttribute('option_attribs');

		$files = Folder::files(LUNA_ROOT . '/src/Resources/media/flags/4x3');

		foreach ($files as $file)
		{
			$name = File::getFilename(File::stripExtension($file));

			$attribs['data-flag-class'] = LanguageHelper::getFlagIconClass($name);
			
			$options[] = new Option($name, $name, $attribs);
		}

		return $options;
	}

	/**
	 * prepareScript
	 *
	 * @return  void
	 */
	protected function prepareScript()
	{
		$tmpl = <<<JS
\\function (state) {
	if (!state.id) {
		return state.text;
	}

	var \$state = $(
		'<span>' +
		 '<span class="' + $(state.element).attr('data-flag-class') + '"></span> ' +
		 '<span class="' + $(state.element).attr('data-flag-class') + ' flag-icon-squared"></span> ' +
		 state.text +
		 '</span>'
	);

	return \$state;
}
JS;


		Select2Script::select2('#' . $this->getId(), array('templateResult' => $tmpl, 'templateSelection' => $tmpl));
	}
}
