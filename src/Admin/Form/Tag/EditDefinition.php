<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Tag;

use Lyrasoft\Luna\Admin\Field\Tag\TagListField;
use Lyrasoft\Luna\Admin\Field\Tag\TagModalField;
use Lyrasoft\Luna\Helper\LunaHelper;
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
 * The TagEditDefinition class.
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
		$langPrefix = LunaHelper::getLangPrefix();

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$form->add('id', new Field\HiddenField);

			// Title
			$form->add('title', new Field\TextField)
				->label(Translator::translate($langPrefix . 'tag.field.title'))
				->setFilter('trim')
				->required(true);

			// Alias
			$form->add('alias', new Field\TextField)
				->label(Translator::translate($langPrefix . 'tag.field.alias'));
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'tag.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			// Created
			$form->add('created', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'tag.field.created'));

			// Modified
			$form->add('modified', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'tag.field.modified'))
				->disabled();

			// Author
			$form->add('created_by', new UserModalField)
				->label(Translator::translate($langPrefix . 'tag.field.author'));

			// Modified User
			$form->add('modified_by', new UserModalField)
				->label(Translator::translate($langPrefix . 'tag.field.modifiedby'))
				->disabled();
		});
	}
}
