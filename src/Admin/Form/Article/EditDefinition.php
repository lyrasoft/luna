<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Article;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Asset\Asset;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The ArticleEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
	use PhoenixFieldTrait;
	use UnidevFieldTrait;
	use LunaFieldTrait;

	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 * @throws \InvalidArgumentException
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Title
		$this->text('title')
			->label(Translator::translate($langPrefix . 'article.field.title'))
			->placeholder(Translator::translate($langPrefix . 'article.field.title'))
			->addFilter('trim')
			->required(true);

		// Alias
		$this->text('alias')
			->label(Translator::translate($langPrefix . 'article.field.alias'))
			->placeholder(Translator::translate($langPrefix . 'article.field.alias'));

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{
			// ID
			$this->hidden('id');

			if (LunaHelper::tableExists('categories'))
			{
				// Category
				$this->categoryList('category_id')
					->categoryType('article')
					->class('hasChosen')
					->label(Translator::translate($langPrefix . 'category.title'));
			}

			if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps'))
			{
				// Tags
				$this->tagList('tags')
					->label(Translator::translate($langPrefix . 'tag.title'))
					->multiple(true);
			}

			// Images
			$this->singleImageDrag('image')
				->label(Translator::translate($langPrefix . 'article.field.images'))
				->width(400)
				->height(300);
		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			// Text
			$this->tinymceEditor('text')
				->label(Translator::translate($langPrefix . 'article.field.introtext'))
				->editorOptions([
					'height' => 450
				])
				->includes('readmore')
				->rows(10);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->switch('state')
				->label(Translator::translate($langPrefix . 'article.field.published'))
				->class('')
				->circle(true)
				->color('success')
				->defaultValue(1);

			if (Locale::isEnabled())
			{
				// Language
				$this->languageList('language')
					->label(Translator::translate($langPrefix . 'article.field.language'))
					->option(Translator::translate($langPrefix . 'field.language.all'), '*');
			}

			// Created
			$this->calendar('created')
				->label(Translator::translate($langPrefix . 'article.field.created'))
				->addFilter(UtcFilter::class);

			// Modified
			$this->calendar('modified')
				->label(Translator::translate($langPrefix . 'article.field.modified'))
				->disabled();

			if (WarderHelper::tableExists('users'))
			{
				// Author
				$this->userModal('created_by')
					->label(Translator::translate($langPrefix . 'article.field.author'));

				// Modified User
				$this->userModal('modified_by')
					->label(Translator::translate($langPrefix . 'article.field.modifiedby'))
					->readonly();
			}
		});
	}
}
