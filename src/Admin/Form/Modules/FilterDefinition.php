<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Form\Modules;

use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Module\ModuleTypeListField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;

/**
 * The ModulesFilterDefinition class.
 *
 * @since  1.0
 */
class FilterDefinition implements FieldDefinitionInterface
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
		 * Search Control
		 * -------------------------------------------------
		 * Add search fields as options, by default, model will search all columns.
		 * If you hop that user can choose a field to search, change "display" to true.
		 */
		$form->wrap(null, 'search', function (Form $form) use ($langPrefix)
		{
			// Search Field
			$form->add('field', new ListField)
				->label(Translator::translate('phoenix.grid.search.field.label'))
				->set('display', false)
				->defaultValue('*')
				->addOption(new Option(Translator::translate('phoenix.core.all'), '*'))
				->addOption(new Option(Translator::translate($langPrefix . 'module.field.title'), 'module.title'));

			// Search Content
			$form->add('content', new TextField)
				->label(Translator::translate('phoenix.grid.search.label'))
				->set('placeholder', Translator::translate('phoenix.grid.search.label'));
		});

		/*
		 * Filter Control
		 * -------------------------------------------------
		 * Add filter fields to this section.
		 * Remember to add onchange event => this.form.submit(); or Phoenix.post();
		 *
		 * You can override filter actions in ModulesModel::configureFilters()
		 */
		$form->wrap(null, 'filter', function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('module.state', new ListField)
				->label('State')
				// Add empty option to support single deselect button
				->addOption(new Option('', ''))
				->addOption(new Option(Translator::translate($langPrefix . 'module.filter.state.select'), ''))
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'))
				->set('onchange', 'this.form.submit()');

			// Position
			$form->add('module.position', new PositionListField)
				->label(Translator::translate($langPrefix . 'module.field.position'))
				->addOption(new Option(Translator::translate($langPrefix . 'module.field.position.select'), ''))
				->set('onchange', 'this.form.submit()');

			// Position
			$form->add('module.type', new ModuleTypeListField)
				->label(Translator::translate($langPrefix . 'module.field.type'))
				->addOption(new Option(Translator::translate($langPrefix . 'module.field.type.select'), ''))
				->set('onchange', 'this.form.submit()');

			if (\Lyrasoft\Luna\Language\LanguageHelper::canSelectLanguage())
			{
				// Language
				$form->add('article.language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'module.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.select'), ''))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'))
					->set('onchange', 'this.form.submit()');
			}
		});
	}
}