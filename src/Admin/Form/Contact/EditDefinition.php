<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Contact;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;

/**
 * The ContactEditDefinition class.
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
	 *
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
			$this->text('subject')
				->label(Translator::translate($langPrefix . '.contact.field.subject'))
				->addFilter('trim')
				->required(true);

			// Email
			$this->email('email')
				->label(Translator::translate($langPrefix . '.contact.field.email'))
				->addFilter('trim')
				->addValidator(Rule\EmailValidator::class)
				->addClass('validate-email')
				->required(true);

			// Name
			$this->text('name')
				->label(Translator::translate($langPrefix . '.contact.field.name'))
				->addFilter('trim')
				->required(true);

			// URL
			$this->text('url')
				->label(Translator::translate($langPrefix . '.contact.field.url'))
				->addValidator(Rule\UrlValidator::class)
				->set('class', 'validate-url');

			// Phone
			$this->text('phone')
				->label(Translator::translate($langPrefix . '.contact.field.phone'))
				->addFilter('trim');
		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			// Content
			$this->textarea('content')
				->label(Translator::translate($langPrefix . '.contact.field.content'))
				->rows(10);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->list('state')
				->label(Translator::translate($langPrefix . '.contact.field.state'))
				->addClass('hasChosen')
				->defaultValue(1)
				->option(Translator::translate($langPrefix . 'contact.state.cancel'), '-1')
				->option(Translator::translate($langPrefix . 'contact.state.pending'), '0')
				->option(Translator::translate($langPrefix . 'contact.state.handling'), '1')
				->option(Translator::translate($langPrefix . 'contact.state.done'), '2');

			// Created
			$this->calendar('created')
				->label(Translator::translate($langPrefix . '.contact.field.created'));

			// Modified
			$this->calendar('modified')
				->label(Translator::translate($langPrefix . '.contact.field.modified'))
				->disabled();

			// Author
			$this->userModal('created_by')
				->label(Translator::translate($langPrefix . '.contact.field.author'));

			// Modified User
			$this->userModal('modified_by')
				->label(Translator::translate($langPrefix . '.contact.field.modifiedby'))
				->disabled();
		});
	}
}
