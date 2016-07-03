<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Languages;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The GridDefinition class.
 *
 * @since  {DEPLOY_VERSION}
 */
class GridDefinition extends AbstractFieldDefinition
{
	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 */
	protected function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		/*
		 * Search Control
		 * -------------------------------------------------
		 * Add search fields as options, by default, model will search all columns.
		 * If you hop that user can choose a field to search, change "display" to true.
		 */
		$this->group('search', function (Form $form) use ($langPrefix)
		{
			// Search Field
			$this->list('field')
				->label(Translator::translate('phoenix.grid.search.field.label'))
				->set('display', false)
				->defaultValue('*')
				->option(Translator::translate('phoenix.core.all'), '*')
				->option(Translator::translate($langPrefix . 'category.field.title'), 'category.title')
				->option(Translator::translate($langPrefix . 'category.field.alias'), 'category.alias');

			// Search Content
			$this->text('content')
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
		$this->group('filter', function(Form $form) use ($langPrefix)
		{
			// State
			$this->list('language.state')
				->label('State')
				// Add empty option to support single deselect button
				->option('', '')
				->option(Translator::translate($langPrefix . 'language.filter.state.select'), '')
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0')
				->set('onchange', 'this.form.submit()');
		});

		/*
		 * This is batch form definition.
		 * -----------------------------------------------
		 * Every field is a table column.
		 * For example, you can add a 'category_id' field to update item category.
		 */
		$this->group('batch', function (Form $form) use ($langPrefix)
		{
			// Language
			$this->list('language')
				->label('Language')
				->set('class', 'col-md-12')
				->option('-- Select Language --', '')
				->option('English', 'en-GB')
				->option('Chinese Traditional', 'zh-TW');

			// Author
			$this->text('created_by')
				->label('Author');
		});
	}
}