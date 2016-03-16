<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Language;

use Lyrasoft\Luna\Admin\Field\Language\FlagListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageModalField;
use Phoenix;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;
use Windwalker\Form\Field;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Validator\Rule;

/**
 * The LanguageEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition implements FieldDefinitionInterface
{
	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 */
	public function define(Form $form)
	{
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		// Title
		$form->add('title', new Field\TextField)
			->label(Translator::translate($langPrefix . 'language.field.title'))
			->set('placeholder', Translator::translate($langPrefix . 'language.field.title'))
			->setFilter('trim')
			->required(true);

		// Alias
		$form->add('alias', new Field\TextField)
			->label(Translator::translate($langPrefix . 'language.field.alias'))
			->set('placeholder', Translator::translate($langPrefix . 'language.field.alias'));

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$form->add('id', new Field\HiddenField);

			// Title Native
			$form->add('title_native', new Field\TextField)
				->label(Translator::translate($langPrefix . 'language.field.titlenative'))
				->setFilter('trim')
				->required(true);

			// Code
			$form->add('code', new Field\TextField)
				->label(Translator::translate($langPrefix . 'language.field.code'))
				->setFilter('trim')
				->required(true);

			// Image
			$form->add('image', new FlagListField)
				->label(Translator::translate($langPrefix . 'language.field.images'));
		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Introtext
			$form->add('description', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.description'))
				->set('rows', 10);
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'language.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			// Metakey
			$form->add('metakey', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.metakey'))
				->set('rows', 5);

			// Meta Description
			$form->add('metadesc', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.metadesc'))
				->set('rows', 5);
		});
	}
}
