<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Form\Categories;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Ioc;
use Windwalker\Warder\Admin\Field\User\UserModalField;

/**
 * The CategoriesFilterDefinition class.
 *
 * @since  1.0
 */
class BatchDefinition implements FieldDefinitionInterface
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

		/*
		 * This is batch form definition.
		 * -----------------------------------------------
		 * Every field is a table column.
		 * For example, you can add a 'category_id' field to update item category.
		 */
		$form->wrap(null, 'batch', function (Form $form) use ($langPrefix)
		{
			$type = Ioc::getInput()->get('type');

			// Parent
			$form->add('parent_id', new CategoryListField)
				->label(Translator::translate($langPrefix . 'category.field.parent'))
				->set('class', 'col-md-12')
				->addOption(new Option(Translator::translate($langPrefix . 'category.batch.parent.select'), ''));

			if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
			{
				// Language
				$form->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'category.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.select'), ''))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'));
			}

			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				// Author
				$form->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'category.batch.author.select'));
			}
		});
	}
}
