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
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;
use Windwalker\Form\Field;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Html\Option;
use Windwalker\Ioc;
use Windwalker\Validator\Rule;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;

/**
 * The CommentEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
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

		// Basic fieldset
		$this->wrap('basic', null, function(Form $form) use ($langPrefix)
		{
			// ID
			$this->add('id', new Field\HiddenField);

			// Title
//			$this->add('title', new Field\TextField)
//				->label(Translator::translate($langPrefix . 'comment.field.title'))
//				->setFilter('trim')
//				->required(true);

			// Type
			$this->add('type', new Field\HiddenField)
				->label(Translator::translate($langPrefix . 'comment.field.type'));

			// Target ID
			$this->add('target_id', new Field\TextField)
				->label(Translator::translate($langPrefix . 'comment.field.target.id'));
		});

		// Text Fieldset
		$this->wrap('text', null, function(Form $form) use ($langPrefix)
		{
			if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
			{
				$this->add('user_id', new UserModalField)
					->label(Translator::translate($langPrefix . 'comment.field.author'));
			}

			// Content
			$this->add('content', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'comment.field.introtext'))
				->set('rows', 10);

			if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
			{
				$this->add('reply_user_id', new UserModalField)
					->label(Translator::translate($langPrefix . 'comment.field.replyer'));
			}

			// Reply
			$this->add('reply', new Field\TextareaField)
				->label(Translator::translate($langPrefix . 'comment.field.fulltext'))
				->set('rows', 10);
		});

		// Created fieldset
		$this->wrap('created', null, function(Form $form) use ($langPrefix)
		{
			// State
			$this->add('state', new Field\RadioField)
				->label(Translator::translate($langPrefix . 'comment.field.state'))
				->set('class', 'btn-group')
				->set('default', 1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');
		});
	}
}
