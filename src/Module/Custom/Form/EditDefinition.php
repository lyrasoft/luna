<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Custom\Form;

use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The EditDefinition class.
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
//		$form->wrap('basic', null, function (Form $form)
//		{
//			$form->text('test')
//				->label('Test');
//		});
	}
}
