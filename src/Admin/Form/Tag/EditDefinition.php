<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Tag;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field;
use Windwalker\Form\Form;

/**
 * The TagEditDefinition class.
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
	 * @throws \InvalidArgumentException
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{
			// ID
			$this->hidden('id');

			// Title
			/** @noinspection PhpDeprecationInspection */
			$this->text('title')
				->label(Translator::translate($langPrefix . 'tag.field.title'))
				->addFilter('trim')
				->required(true);

			// Alias
			$this->text('alias')
				->label(Translator::translate($langPrefix . 'tag.field.alias'));
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->radio('state')
				->label(Translator::translate($langPrefix . 'tag.field.state'))
				->class('btn-group')
				->defaultValue(1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			// Created
			$this->calendar('created')
				->label(Translator::translate($langPrefix . 'tag.field.created'));

			// Modified
			$this->calendar('modified')
				->label(Translator::translate($langPrefix . 'tag.field.modified'))
				->disabled();

			if (WarderHelper::tableExists('users'))
			{
				// Author
				$this->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'tag.field.author'));

				// Modified User
				$this->add('modified_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'tag.field.modifiedby'))
					->disabled();
			}
		});
	}
}
