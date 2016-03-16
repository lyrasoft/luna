<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Category;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Category\CategoryModalField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Field\Image\SingleImageDragField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix;
use Windwalker\Core\Ioc;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;
use Windwalker\Form\Field;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Validator\Rule;

/**
 * The CategoryEditDefinition class.
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

		// Title
		$form->add('title', new Field\TextField)
			->label(Translator::translate($langPrefix . 'category.field.title'))
			->set('placeholder', Translator::translate($langPrefix . 'category.field.title'))
			->setFilter('trim')
			->required(true);

		// Alias
		$form->add('alias', new Field\TextField)
			->label(Translator::translate($langPrefix . 'category.field.alias'))
			->set('placeholder', Translator::translate($langPrefix . 'category.field.alias'));

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			$type = Ioc::getInput()->get('type');

			// ID
			$form->add('id', new Field\HiddenField);

			// Parent
			$form->add('parent_id', new CategoryListField)
				->label(Translator::translate($langPrefix . 'category.field.parent'))
				->addOption(new Option(Translator::translate($langPrefix . 'category.root'), 1))
				->set('type', $type);

			// Images
			$form->add('image', new SingleImageDragField)
				->label(Translator::translate($langPrefix . 'category.field.images'))
				->set('export_zoom', 2)
				->set('width', 400)
				->set('height', 300);

			$form->add('type', new Field\HiddenField)
				->label(Translator::translate($langPrefix . 'category.field.type'));
		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Description
			$form->add('description', new SummernoteEditorField)
				->label(Translator::translate($langPrefix . 'category.field.description'))
				->set('options', array(
					'height' => 350,
					'iconPrefix' => 'luna-icon luna-icon-',
				))
//				->set('includes', 'readmore')
				->set('rows', 10);
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'category.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			if (\Lyrasoft\Luna\Language\Locale::isEnabled())
			{
				// Language
				$form->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'category.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'));
			}

			// Created
			$form->add('created', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'category.field.created'));

			// Modified
			$form->add('modified', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'category.field.modified'));

			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				// Author
				$form->add('created_by', new Field\TextField)
					->label(Translator::translate($langPrefix . 'category.field.author'));

				// Modified User
				$form->add('modified_by', new Field\TextField)
					->label(Translator::translate($langPrefix . 'category.field.modifiedby'));
			}
		});
	}
}
