<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Module;

use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Field;
use Windwalker\Form\Form;

/**
 * The ModuleEditDefinition class.
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
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		// Title
		$this->add('title', new Field\TextField)
			->label(Translator::translate($langPrefix . 'module.field.title'))
			->setFilter('trim')
			->set('labelClass', 'hide')
			->required(true);

		// Basic fieldset
		$this->wrap('basic', null, function(Form $form) use ($langPrefix)
		{

		});

		// Text Fieldset
		$this->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			// Content
			$this->add('content', new SummernoteEditorField)
				->label(Translator::translate($langPrefix . 'module.field.content'))
				->set('rows', 10)
				->set('options', [
					'height' => 400
				]
				);
		});

		// Created fieldset
		$this->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$this->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'module.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');

			// Position
			$this->add('position', new PositionListField)
				->label(Translator::translate($langPrefix . 'module.field.position'))
				->option(Translator::translate($langPrefix . 'field.position.select'), '')
				->set('allow_add', true);

			// Type
			$this->add('type', new Field\TextField)
				->label(Translator::translate($langPrefix . 'module.field.type'))
				->readonly()
				->required();

			if (Locale::isEnabled())
			{
				// Language
				$this->add('language', new LanguageListField)
					->label(Translator::translate($langPrefix . 'module.field.language'))
					->option(Translator::translate($langPrefix . 'field.language.all'), '*');
			}

			if (WarderHelper::tableExists('users'))
			{
				// Created
				$this->calendar('created')
					->label(Translator::translate($langPrefix . 'module.field.created'));

				// Author
				$this->add('created_by', new UserModalField)
					->label(Translator::translate($langPrefix . 'module.field.author'));
			}

			// Note
			$this->add('note', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'module.field.note'))
				->set('rows', 5);

			// ID
			$this->add('id', new Field\HiddenField);
		});
	}
}
