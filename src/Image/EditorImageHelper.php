<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Image;

use Lyrasoft\Unidev\Storage\AbstractStorageHelper;

/**
 * The ImageStorageHelper class.
 *
 * @since  1.0
 */
class EditorImageHelper extends AbstractStorageHelper
{
    /**
     * Get remote uri path.
     *
     * @param   mixed  $identify The identify of this file or item.
     * @param   string $ext      Image ext.
     *
     * @return  string  Identify path.
     */
    public static function getPath($identify, $ext = 'jpg')
    {
        return static::getBaseFolder() . $identify . '.' . static::getRealExtension($ext);
    }

    /**
     * Get base folder name.
     *
     * @return  string
     */
    public static function getBaseFolder()
    {
        return 'images/upload/' . gmdate('Y/m/d') . '/';
    }
}
