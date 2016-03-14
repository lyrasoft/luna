<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Comment;

use Lyrasoft\Luna\Admin\Field\Comment\CommentListField;
use Lyrasoft\Luna\Admin\Field\Comment\CommentModalField;
use Phoenix;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;
use Windwalker\Form\Field;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Ioc;
use Windwalker\Validator\Rule;
use Windwalker\Warder\Admin\Field\User\UserModalField;

/**
 * The CommentEditDefinition class.
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
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		// Basic fieldset
		$form->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$form->add('id', new Field\HiddenField);

			// Title
//			$form->add('title', new Field\TextField)
//				->label(Translator::translate($langPrefix . 'comment.field.title'))
//				->setFilter('trim')
//				->required(true);

			// Type
			$form->add('type', new Field\HiddenField)
				->label(Translator::translate($langPrefix . 'comment.field.type'));

			// Target ID
			$form->add('target_id', new Field\TextField)
				->label(Translator::translate($langPrefix . 'comment.field.target.id'));
		});

		// Text Fieldset
		$form->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				$form->add('user_id', new UserModalField)
					->label(Translator::translate($langPrefix . 'comment.field.author'));
			}

			// Content
			$form->add('content', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'comment.field.introtext'))
				->set('rows', 10);

			if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
			{
				$form->add('reply_user_id', new UserModalField)
					->label(Translator::translate($langPrefix . 'comment.field.replyer'));
			}

			// Reply
			$form->add('reply', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'comment.field.fulltext'))
				->set('rows', 10);
		});

		// Created fieldset
		$form->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$form->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'comment.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->addOption(new Option(Translator::translate('phoenix.grid.state.published'), '1'))
				->addOption(new Option(Translator::translate('phoenix.grid.state.unpublished'), '0'));
		});
	}
}
