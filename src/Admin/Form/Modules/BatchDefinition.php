<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Form\Modules;

use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Warder\Admin\Field\User\UserModalField;

/**
 * The ModulesFilterDefinition class.
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
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		/*
		 * This is batch form definition.
		 * -----------------------------------------------
		 * Every field is a table column.
		 * For example, you can add a 'category_id' field to update item category.
		 */
		$form->wrap(null, 'batch', function (Form $form) use ($langPrefix)
		{
			if (\Lyrasoft\Luna\Language\Locale::isEnabled())
			{
				// Language
				$form->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'module.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.select'), ''))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'));
			}

			// Position
			$form->add('position', new PositionListField)
				->label(Translator::translate($langPrefix . 'module.field.position'))
				->addOption(new Option(Translator::translate($langPrefix . 'module.field.position.select')))
				->set('allow_add', true);

			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				// Author
				$form->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'module.field.author'));
			}
		});
	}
}
