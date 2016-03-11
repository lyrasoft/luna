<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Language;

use Lyrasoft\Luna\Admin\Table\Table;
use Phoenix\Field\ModalField;

/**
 * The LanguageModalField class.
 *
 * @since  1.0
 */
class LanguageModalField extends ModalField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::LANGUAGES;

	/**
	 * Property view.
	 *
	 * @var  string
	 */
	protected $view = 'languages';

	/**
	 * Property package.
	 *
	 * @var  string
	 */
	protected $package = 'admin';

	/**
	 * Property titleField.
	 *
	 * @var  string
	 */
	protected $titleField = 'title';

	/**
	 * Property keyField.
	 *
	 * @var  string
	 */
	protected $keyField = 'id';
}
