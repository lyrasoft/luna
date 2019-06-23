<?php
/**
 * Part of phoenix project.
 *
 * @copyright    Copyright (C) 2019 LYRASOFT. All rights reserved.
 * @license        GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record\Columns;

use Lyrasoft\Luna\Menu\View\AbstractMenuView;

/**
 * The MenuDataInterface class.
 *
 * Run
 * ```
 * php windwalker phoenix record sync luna menu
 * ```
 * to update fields.
 *
 * @property    int  id
 * @property    int  parent_id
 * @property    int  lft
 * @property    int  rgt
 * @property    int  level
 * @property    string  path
 * @property    string  type
 * @property    string  view
 * @property    string  title
 * @property    string  alias
 * @property    string  url
 * @property    string  route
 * @property    string  variables
 * @property    string  image
 * @property    int  state
 * @property    string  created
 * @property    int  created_by
 * @property    string  modified
 * @property    int  modified_by
 * @property    string  language
 * @property    string  params
 *
 * @property    AbstractMenuView  viewInstance
 */
interface MenuDataInterface
{

}
