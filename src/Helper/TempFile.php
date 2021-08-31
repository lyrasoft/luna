<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Helper;

use Psr\Http\Message\StreamInterface;
use Windwalker\Filesystem\Filesystem;

use Windwalker\Stream\Stream;

use function Windwalker\chronos;
use function Windwalker\uid;

/**
 * The TempHelper class.
 *
 * @since  1.5.20
 */
class TempFile
{
    /**
     * folder
     *
     * @param string|null $root
     *
     * @return  string
     *
     * @throws \Exception
     * @since  1.5.20
     */
    public static function folder(?string $root = null): string
    {
        $folder = sprintf(
            '%s/%s',
            $root ?? WINDWALKER_TEMP,
            (string) chronos()?->format('Y/m/d')
        );

        Filesystem::mkdir($folder);

        return $folder;
    }

    /**
     * fileName
     *
     * @param string|null $name
     * @param string|null $root
     * @param bool        $autoRemove
     *
     * @return  string
     *
     * @throws \Exception
     * @since  1.5.20
     */
    public static function fileName(?string $name = null, ?string $root = null, bool $autoRemove = true): string
    {
        $file = static::folder($root);

        if ($name === null) {
            $name = uid();
        }

        $file .= '/' . $name;

        if ($autoRemove) {
            register_shutdown_function(static function () use ($file) {
                if (file_exists($file) && is_file($file)) {
                    Filesystem::delete($file);
                }
            });
        }

        return $file;
    }

    /**
     * fileResource
     *
     * @param string|null $name
     * @param string|null $root
     * @param bool        $autoRemove
     *
     * @return  false|resource
     *
     * @throws \Exception
     * @since  1.5.20
     */
    public static function fileResource(?string $name = null, ?string $root = null, bool $autoRemove = true): mixed
    {
        $file = static::fileName($name, $root, $autoRemove);

        return fopen($file, 'wb+');
    }

    /**
     * fileStream
     *
     * @param string|null $name
     * @param string|null $root
     * @param bool        $autoRemove
     *
     * @return  StreamInterface
     *
     * @throws \Exception
     * @since  1.5.20
     */
    public static function fileStream(
        ?string $name = null,
        ?string $root = null,
        bool $autoRemove = true
    ): StreamInterface {
        return new Stream(static::fileName($name, $root, $autoRemove), Stream::MODE_READ_WRITE_RESET);
    }
}
