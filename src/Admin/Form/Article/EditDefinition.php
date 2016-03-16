<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Article;

use Lyrasoft\Luna\Admin\Field\Article\ArticleListField;
use Lyrasoft\Luna\Admin\Field\Article\ArticleModalField;
use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Tag\TagListField;
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Field\Image\SingleImageDragField;
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
use Windwalker\Warder\Helper\WarderHelper;

/**
 * The ArticleEditDefinition class.
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
			->label(Translator::translate($langPrefix . 'article.field.title'))
			->set('placeholder', Translator::translate($langPrefix . 'article.field.title'))
			->setFilter('trim')
			->required(true);

		// Alias
		$form->add('alias', new Field\TextField)
			->label(Translator::translate($langPrefix . 'article.field.alias'))
			->set('placeholder', Translator::translate($langPrefix . 'article.field.alias'));

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$form->add('id', new Field\HiddenField);

			// Category
			$form->add('category_id', new CategoryListField)
				->label(Translator::translate($langPrefix . 'category.title'));

			// Tags
			$form->add('tags', new TagListField)
				->label(Translator::translate($langPrefix . 'tag.title'))
				->set('multiple', true);

			// Images
			$form->add('image', new SingleImageDragField)
				->label(Translator::translate($langPrefix . 'article.field.images'))
				->set('width', 400)
				->set('height', 300);
		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Introtext
			$form->add('text', new SummernoteEditorField)
				->label(Translator::translate($langPrefix . 'article.field.introtext'))
				->set('options', array(
					'height' => 450
				))
				->set('includes', 'readmore')
				->set('rows', 10);
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'article.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			if (\Lyrasoft\Luna\Language\Locale::isEnabled())
			{
				// Language
				$form->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'article.field.language'))
					->addOption(new Option(Translator::translate($langPrefix . 'field.language.all'), '*'));
			}

			// Created
			$form->add('created', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'article.field.created'));

			// Modified
			$form->add('modified', new Phoenix\Field\CalendarField)
				->label(Translator::translate($langPrefix . 'article.field.modified'))
				->disabled();

			if (WarderHelper::tableExists('users'))
			{
				// Author
				$form->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'article.field.author'));

				// Modified User
				$form->add('modified_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'article.field.modifiedby'))
					->readonly();
			}
		});
	}
}
