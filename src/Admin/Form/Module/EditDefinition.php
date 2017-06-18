<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Module;

use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The ModuleEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
	use PhoenixFieldTrait;
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
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		// Title
		$this->text('title')
			->label(Translator::translate($langPrefix . 'module.field.title'))
			->addFilter('trim')
			->labelClass('hide')
			->required(true);

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{

		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			// Content
			$this->summernoteEditor('content')
				->label(Translator::translate($langPrefix . 'module.field.content'))
				->rows( 10)
				->editorOptions([
					'height' => 400
				]);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->radio('state')
				->label(Translator::translate($langPrefix . 'module.field.state'))
				->class('btn-group')
				->defaultValue(1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			// Position
			$this->add('position', new PositionListField)
				->label(Translator::translate($langPrefix . 'module.field.position'))
				->option(Translator::translate($langPrefix . 'field.position.select'), '')
				->set('allow_add', true);

			// Type
			$this->text('type')
				->label(Translator::translate($langPrefix . 'module.field.type'))
				->readonly()
				->required();

			if (Locale::isEnabled())
			{
				// Language
				$this->languageList('language')
					->label(Translator::translate($langPrefix . 'module.field.language'))
					->option(Translator::translate($langPrefix . 'field.language.all'), '*');
			}

			if (WarderHelper::tableExists('users'))
			{
				// Created
				$this->calendar('created')
					->label(Translator::translate($langPrefix . 'module.field.created'));

				// Author
				$this->userModal('created_by')
					->label(Translator::translate($langPrefix . 'module.field.author'));
			}

			// Note
			$this->textarea('note')
				->label(Translator::translate($langPrefix . 'module.field.note'))
				->rows( 5);

			// ID
			$this->hidden('id');
		});
	}
}
