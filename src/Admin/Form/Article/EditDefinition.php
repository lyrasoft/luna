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
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Field\Image\SingleImageDragField;
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
		// Basic fieldset
		$form->wrap('basic', null, function(Form $form)
		{
			// ID
			$form->add('id', new Field\HiddenField);

			// Title
			$form->add('title', new Field\TextField)
				->label(Translator::translate('admin.article.field.title'))
				->setFilter('trim')
				->required(true);

			// Alias
			$form->add('alias', new Field\TextField)
				->label(Translator::translate('admin.article.field.alias'));

			// Category
			$form->add('category_id', new CategoryListField)
				->label(Translator::translate('luna.category.title'));

			// Images
			$form->add('image', new SingleImageDragField)
				->label(Translator::translate('admin.article.field.images'))
				->set('width', 400)
				->set('height', 300);
		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form)
		{
			// Introtext
			$form->add('text', new SummernoteEditorField)
				->label(Translator::translate('admin.article.field.introtext'))
				->set('options', array(
					'height' => 450
				))
				->set('includes', 'readmore')
				->set('rows', 10);
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate('admin.article.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));

			// Version
			$form->add('version', new Field\TextField)
				->label(Translator::translate('admin.article.field.version'));

			// Created
			$form->add('created', new Phoenix\Field\CalendarField)
				->label(Translator::translate('admin.article.field.created'));

			// Modified
			$form->add('modified', new Phoenix\Field\CalendarField)
				->label(Translator::translate('admin.article.field.modified'))
				->disabled();

			// Author
			$form->add('created_by', new UserModalField)
				->label(Translator::translate('admin.article.field.author'));

			// Modified User
			$form->add('modified_by', new UserModalField)
				->label(Translator::translate('admin.article.field.modifiedby'))
				->readonly();
		});
	}
}
