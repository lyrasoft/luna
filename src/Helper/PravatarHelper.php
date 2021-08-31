<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Helper;

use Windwalker\Uri\Uri;

use function Windwalker\uid;

/**
 * The PravatarHelper class.
 *
 * @since  1.0
 */
class PravatarHelper
{
    /**
     * Property host.
     *
     * @var  string
     */
    protected static $host = 'https://i.pravatar.cc';

    /**
     * url
     *
     * @param  int          $size
     * @param  int|null     $id
     * @param  string|null  $u
     *
     * @return  string
     */
    public static function url(int $size = 300, int $id = null, string $u = null): string
    {
        $uri = new Uri(static::$host);

        $size = $size ?: 300;

        $uri = $uri->withPath('/' . $size);

        if ($id) {
            $uri = $uri->withVar('id', (int) $id);
        }

        if ($u) {
            $uri = $uri->withVar('u', $u);
        }

        return $uri->toString();
    }

    /**
     * unique
     *
     * @param  int          $size
     * @param  string|null  $u
     *
     * @return  string
     * @throws \Exception
     */
    public static function unique(int $size = 300, string $u = null): string
    {
        if ((string) $u === '') {
            $u = uid();
        }

        return static::url($size, null, $u);
    }
}
