<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Form\Articles;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;

/**
 * The ArticlesFilterDefinition class.
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
		$langPrefix = LunaHelper::getLangPrefix();

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
				->addOption(new Option(Translator::translate($langPrefix . 'article.field.title'), 'article.title'))
				->addOption(new Option(Translator::translate($langPrefix . 'article.field.alias'), 'article.alias'))
				->addOption(new Option(Translator::translate($langPrefix . 'category.title'), 'category.title'));

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
		 * You can override filter actions in ArticlesModel::configureFilters()
		 */
		$form->wrap(null, 'filter', function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('article.state', new ListField)
				->label('State')
				// Add empty option to support single deselect button
				->addOption(new Option('', ''))
				->addOption(new Option(Translator::translate($langPrefix . 'article.filter.state.select'), ''))
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'))
				->set('onchange', 'this.form.submit()');

			$form->add('article.category_id', new CategoryListField)
				->label(Translator::translate($langPrefix . 'field.category'))
				->addOption(new Option('', ''))
				->addOption(new Option(Translator::translate($langPrefix . 'filter.category.select'), ''))
				->set('onchange', 'this.form.submit()');

			if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
			{
				// Language
				$form->add('article.language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'article.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.select'), ''))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'))
					->set('onchange', 'this.form.submit()');
			}
		});
	}
}
