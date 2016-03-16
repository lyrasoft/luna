<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Comment;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ModalField;

/**
 * The CommentModalField class.
 *
 * @since  1.0
 */
class CommentModalField extends ModalField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = LunaTable::COMMENTS;

	/**
	 * Property view.
	 *
	 * @var  string
	 */
	protected $view = 'comments';

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
