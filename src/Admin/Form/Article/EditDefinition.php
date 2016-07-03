<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Article;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Tag\TagListField;
use Lyrasoft\Luna\Field\Editor\TinymceEditorField;
use Lyrasoft\Luna\Field\Image\SingleImageDragField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Lyrasoft\Warder\Helper\WarderHelper;

/**
 * The ArticleEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
	use PhoenixFieldTrait;
	
	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Title
		$this->add('title', new Field\TextField)
			->label(Translator::translate($langPrefix . 'article.field.title'))
			->set('placeholder', Translator::translate($langPrefix . 'article.field.title'))
			->setFilter('trim')
			->required(true);

		// Alias
		$this->add('alias', new Field\TextField)
			->label(Translator::translate($langPrefix . 'article.field.alias'))
			->set('placeholder', Translator::translate($langPrefix . 'article.field.alias'));

		// Basic fieldset
		$this->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$this->add('id', new Field\HiddenField);

			if (LunaHelper::tableExists('categories'))
			{
				// Category
				$this->add('category_id', new CategoryListField)
					->label(Translator::translate($langPrefix . 'category.title'));
			}

			if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps'))
			{
				// Tags
				$this->add('tags', new TagListField)
					->label(Translator::translate($langPrefix . 'tag.title'))
					->set('multiple', true);
			}

			// Images
			$this->add('image', new SingleImageDragField)
				->label(Translator::translate($langPrefix . 'article.field.images'))
				->set('width', 400)
				->set('height', 300);
		});

		// Text Fieldset
		$this->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Introtext
			$this->add('text', new TinymceEditorField)
				->label(Translator::translate($langPrefix . 'article.field.introtext'))
				->set('options', array(
					'height' => 450
				))
				->set('includes', 'readmore')
				->set('rows', 10);
		});

		// Created fieldset
		$this->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$this->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'article.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			if (Locale::isEnabled())
			{
				// Language
				$this->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'article.field.language'))
					->option(Translator::translate($langPrefix . 'field.language.all'), '*');
			}

			// Created
			$this->calendar('created')
				->label(Translator::translate($langPrefix . 'article.field.created'));

			// Modified
			$this->calendar('modified')
				->label(Translator::translate($langPrefix . 'article.field.modified'))
				->disabled();

			if (WarderHelper::tableExists('users'))
			{
				// Author
				$this->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'article.field.author'));

				// Modified User
				$this->add('modified_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'article.field.modifiedby'))
					->readonly();
			}
		});
	}
}
