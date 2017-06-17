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
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		// Basic fieldset
		$this->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$this->add('id', new Field\HiddenField);

			// Title
			$this->add('title', new Field\TextField)
				->label(Translator::translate($langPrefix . 'tag.field.title'))
				->setFilter('trim')
				->required(true);

			// Alias
			$this->add('alias', new Field\TextField)
				->label(Translator::translate($langPrefix . 'tag.field.alias'));
		});

		// Created fieldset
		$this->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$this->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'tag.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
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
