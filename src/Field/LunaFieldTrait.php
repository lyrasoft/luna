<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Field\Editor\TinymceEditorField;

/**
 * The LunaFieldTrait class.
 *
 * @method  SummernoteEditorField summernoteEditor($name = null, $label = null)
 * @method  TinymceEditorField    tinymceEditor($name = null, $label = null)
 *
 * @since  {DEPLOY_VERSION}
 */
trait LunaFieldTrait
{
	/**
	 * bootPhoenixFieldTrait
	 *
	 * @return  void
	 */
	public function bootLunaFieldTrait()
	{
		$this->addNamespace('Lyrasoft\Luna\Field\Editor');
	}
}
