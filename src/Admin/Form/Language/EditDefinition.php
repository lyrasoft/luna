<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Language;

use Lyrasoft\Luna\Admin\Field\Language\FlagListField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The LanguageEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
	use PhoenixFieldTrait;

	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 * @throws \InvalidArgumentException
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Title
		$this->text('title')
			->label(Translator::translate($langPrefix . 'language.field.title'))
			->placeholder(Translator::translate($langPrefix . 'language.field.title'))
			->addFilter('trim')
			->required(true);

		// Alias
		$this->text('alias')
			->label(Translator::translate($langPrefix . 'language.field.alias'))
			->placeholder(Translator::translate($langPrefix . 'language.field.alias'));

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{
			// ID
			$this->hidden('id');

			// Title Native
			$this->text('title_native')
				->label(Translator::translate($langPrefix . 'language.field.titlenative'))
				->addFilter('trim')
				->required(true);

			// Code
			$this->text('code')
				->label(Translator::translate($langPrefix . 'language.field.code'))
				->addFilter('trim')
				->required(true);

			// Image
			$this->add('image', new FlagListField)
				->label(Translator::translate($langPrefix . 'language.field.images'));
		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			// Introtext
			$this->textarea('description')
				->label(Translator::translate($langPrefix . 'language.field.description'))
				->rows( 10);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			$this->switch('state')
				->label(Translator::translate($langPrefix . 'language.field.published'))
				->class('')
				->circle(true)
				->color('success')
				->defaultValue(1);

			// Metakey
			$this->textarea('metakey')
				->label(Translator::translate($langPrefix . 'language.field.metakey'))
				->rows( 5);

			// Meta Description
			$this->textarea('metadesc')
				->label(Translator::translate($langPrefix . 'language.field.metadesc'))
				->rows( 5);
		});
	}
}
