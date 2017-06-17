<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Category;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Ioc;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The CategoryEditDefinition class.
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
			->label(Translator::translate($langPrefix . 'category.field.title'))
			->placeholder(Translator::translate($langPrefix . 'category.field.title'))
			->addFilter('trim')
			->required(true);

		// Alias
		$this->text('alias')
			->label(Translator::translate($langPrefix . 'category.field.alias'))
			->placeholder(Translator::translate($langPrefix . 'category.field.alias'));

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{
			$type = Ioc::getInput()->get('type');

			// ID
			$this->hidden('id');

			// Parent
			$this->add('parent_id', new CategoryListField)
				->label(Translator::translate($langPrefix . 'category.field.parent'))
				->option(Translator::translate($langPrefix . 'category.root'), 1)
				->set('type', $type);

			// Images
			$this->singleImageDrag('image')
				->label(Translator::translate($langPrefix . 'category.field.images'))
				->exportZoom(2)
				->width(400)
				->height(300);

			$this->hidden('type')
				->label(Translator::translate($langPrefix . 'category.field.type'));
		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			// Description
			$this->summernoteEditor('description')
				->label(Translator::translate($langPrefix . 'category.field.description'))
				->editorOptions([
					'height' => 350,
					'iconPrefix' => 'luna-icon luna-icon-',
				])
				->rows( 10);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->radio('state')
				->label(Translator::translate($langPrefix . 'category.field.state'))
				->class('btn-group')
				->defaultValue(1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			if (Locale::isEnabled())
			{
				// Language
				$this->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'category.field.language'))
					->option(Translator::translate($langPrefix . 'field.language.all'), '*');
			}

			// Created
			$this->calendar('created')
				->label(Translator::translate($langPrefix . 'category.field.created'));

			// Modified
			$this->calendar('modified')
				->label(Translator::translate($langPrefix . 'category.field.modified'));

			if (WarderHelper::tableExists('users'))
			{
				// Author
				$this->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'category.field.author'));

				// Modified User
				$this->add('modified_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'category.field.modifiedby'))
					->disabled();
			}
		});
	}
}
