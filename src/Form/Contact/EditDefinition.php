<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Form\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;

/**
 * The EditDefinition class.
 *
 * @since  __DEPLOY_VERSION__
 */
class EditDefinition extends AbstractFieldDefinition
{
	/**
	 * Define the form fields.
	 *
	 * @param Form $form The Windwalker form object.
	 *
	 * @return  void
	 * @throws \InvalidArgumentException
	 */
	protected function doDefine(Form $form)
	{
		$langPrefix = LunaHelper::getLangPrefix();

		$this->fieldset('basic', function (Form $form) use ($langPrefix)
		{
			// Title
			$this->text('subject')
				->label(Translator::translate($langPrefix . 'contact.field.subject'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.subject'))
				->addFilter('trim')
				->addClass('input-lg')
				->required(true);

			// Email
			$this->email('email')
				->label(Translator::translate($langPrefix . 'contact.field.email'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.email'))
				->addFilter('trim')
				->addValidator(Rule\EmailValidator::class)
				->addClass('validate-email')
				->required(true);

			// Name
			$this->text('name')
				->label(Translator::translate($langPrefix . 'contact.field.name'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.name'))
				->addFilter('trim')
				->required(true);

			// URL
			$this->text('url')
				->label(Translator::translate($langPrefix . 'contact.field.url'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.url'))
				->addValidator(Rule\UrlValidator::class)
				->set('class', 'validate-url');

			// Phone
			$this->text('phone')
				->label(Translator::translate($langPrefix . 'contact.field.phone'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.phone'))
				->addFilter('trim');

			// Content
			$this->textarea('content')
				->label(Translator::translate($langPrefix . 'contact.field.content'))
				->placeholder(Translator::translate($langPrefix . 'contact.field.placeholder.content'))
				->rows(10);
		});

		$this->group('details', function (Form $form) use ($langPrefix)
		{
			$this->text('address');
		});
	}
}
