<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Module;

use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Module\ModuleListField;
use Lyrasoft\Luna\Admin\Field\Module\ModuleModalField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Phoenix;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;
use Windwalker\Form\Field;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Validator\Rule;
use Windwalker\Warder\Admin\Field\User\UserModalField;

/**
 * The ModuleEditDefinition class.
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
			->label(Translator::translate($langPrefix . 'module.field.title'))
			->setFilter('trim')
			->set('labelClass', 'hide')
			->required(true);

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{

		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Content
			$form->add('content', new SummernoteEditorField)
				->label(Translator::translate($langPrefix . 'module.field.content'))
				->set('rows', 10)
				->set('options', array(
					'height' => 400
				));
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'module.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			// Position
			$form->add('position', new PositionListField)
				->label(Translator::translate($langPrefix . 'module.field.position'))
				->addOption(new Option(Translator::translate($langPrefix . 'field.position.select'), ''))
				->set('allow_add', true);

			// Type
			$form->add('type', new Field\TextField)
				->label(Translator::translate($langPrefix . 'module.field.type'))
				->readonly()
				->required();

			if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
			{
				// Language
				$form->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'module.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'));
			}

			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				// Created
				$form->add('created', new Phoenix\Field\CalendarField)
					->label(Translator::translate($langPrefix . 'module.field.created'));

				// Author
				$form->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'module.field.author'));
			}

			// Note
			$form->add('note', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'module.field.note'))
				->set('rows', 5);

			// ID
			$form->add('id', new Field\HiddenField);
		});
	}
}
