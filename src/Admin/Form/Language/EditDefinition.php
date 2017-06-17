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
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field;
use Windwalker\Form\Form;

/**
 * The LanguageEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Title
		$this->add('title', new Field\TextField)
			->label(Translator::translate($langPrefix . 'language.field.title'))
			->set('placeholder', Translator::translate($langPrefix . 'language.field.title'))
			->setFilter('trim')
			->required(true);

		// Alias
		$this->add('alias', new Field\TextField)
			->label(Translator::translate($langPrefix . 'language.field.alias'))
			->set('placeholder', Translator::translate($langPrefix . 'language.field.alias'));

		// Basic fieldset
		$this->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$this->add('id', new Field\HiddenField);

			// Title Native
			$this->add('title_native', new Field\TextField)
				->label(Translator::translate($langPrefix . 'language.field.titlenative'))
				->setFilter('trim')
				->required(true);

			// Code
			$this->add('code', new Field\TextField)
				->label(Translator::translate($langPrefix . 'language.field.code'))
				->setFilter('trim')
				->required(true);

			// Image
			$this->add('image', new FlagListField)
				->label(Translator::translate($langPrefix . 'language.field.images'));
		});

		// Text Fieldset
		$this->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Introtext
			$this->add('description', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.description'))
				->set('rows', 10);
		});

		// Created fieldset
		$this->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$this->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'language.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			// Metakey
			$this->add('metakey', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.metakey'))
				->set('rows', 5);

			// Meta Description
			$this->add('metadesc', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'language.field.metadesc'))
				->set('rows', 5);
		});
	}
}
