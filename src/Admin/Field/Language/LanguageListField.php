<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Language;

use Lyrasoft\Luna\Admin\Table\Table;
use Lyrasoft\Luna\Language\LanguageHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Phoenix\Field\ItemListField;
use Windwalker\Html\Option;

/**
 * The LanguageField class.
 *
 * @since  1.0
 */
class LanguageListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::LANGUAGES;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = null;

	/**
	 * Property valueField.
	 *
	 * @var  string
	 */
	protected $valueField = 'code';

	/**
	 * prepareAttributes
	 *
	 * @return  array
	 */
	public function prepareAttributes()
	{
		$this->def('published', true);

		$this->prepareScript();

		return parent::prepareAttributes();
	}

	/**
	 * prepareOptions
	 *
	 * @return  Option[]
	 */
	protected function prepareOptions()
	{
		$valueField = $this->get('value_field', $this->valueField);
		$textField  = $this->get('text_field', $this->textField);
		$attribs    = $this->get('option_attribs', array());

		$items = $this->getItems();

		$options = array();

		foreach ($items as $item)
		{
			$value = isset($item->$valueField) ? $item->$valueField : null;
			$text  = isset($item->$textField)  ? $item->$textField : null;

			$level = !empty($item->level) ? $item->level - 1 : 0;

			if ($level < 0)
			{
				$level = 0;
			}

			$attribs['data-flag-class'] = LanguageHelper::getFlagIconClass($item->image);

			$options[] = new Option(str_repeat('- ', $level) . $text, $value, $attribs);
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
		'<span><span class="' + $(state.element).attr('data-flag-class') + '"></span> ' + state.text + '</span>'
	);

	return \$state;
}
JS;


		Select2Script::select2('#' . $this->getId(), array('templateResult' => $tmpl, 'templateSelection' => $tmpl));
	}
}