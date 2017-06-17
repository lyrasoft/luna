<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Comment;

use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

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
	 * @throws \InvalidArgumentException
	 */
	public function doDefine(Form $form)
	{
		$langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

		// Basic fieldset
		$this->fieldset('basic', function(Form $form) use ($langPrefix)
		{
			// ID
			$this->hidden('id');

			// Type
			$this->hidden('type')
				->label(Translator::translate($langPrefix . 'comment.field.type'));

			// Target ID
			$this->text('target_id')
				->label(Translator::translate($langPrefix . 'comment.field.target.id'));
		});

		// Text Fieldset
		$this->fieldset('text', function(Form $form) use ($langPrefix)
		{
			if (WarderHelper::tableExists('users'))
			{
				$this->userModal('user_id')
					->label(Translator::translate($langPrefix . 'comment.field.author'));
			}

			// Content
			$this->textarea('content')
				->label(Translator::translate($langPrefix . 'comment.field.introtext'))
				->rows( 10);

			if (WarderHelper::tableExists('users'))
			{
				$this->userModal('reply_user_id')
					->label(Translator::translate($langPrefix . 'comment.field.replyer'));
			}

			// Reply
			$this->textarea('reply')
				->label(Translator::translate($langPrefix . 'comment.field.fulltext'))
				->rows( 10);
		});

		// Created fieldset
		$this->fieldset('created', function(Form $form) use ($langPrefix)
		{
			// State
			$this->radio('state')
				->label(Translator::translate($langPrefix . 'comment.field.state'))
				->class('btn-group')
				->defaultValue(1)
				->option(Translator::translate('phoenix.grid.state.published'), '1')
				->option(Translator::translate('phoenix.grid.state.unpublished'), '0');
		});
	}
}
