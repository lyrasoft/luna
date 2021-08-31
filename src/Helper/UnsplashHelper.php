<?php

/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Helper;

use Windwalker\Filesystem\Filesystem;
use Windwalker\Http\HttpClient;

/**
 * The UnsplashHelper class.
 *
 * @since  1.0
 */
class UnsplashHelper
{
    /**
     * Property images.
     *
     * @var  array
     */
    protected static array $images = [];

    /**
     * Property ids.
     *
     * @var  array|null
     */
    protected static array|null $ids = null;

    /**
     * getImageUrl
     *
     * @param  int       $width
     * @param  int       $height
     * @param  int|null  $id
     *
     * @return  string
     */
    public static function getImageUrl(int $width = 800, int $height = 600, ?int $id = null): string
    {
        static::init();

        if (!isset(static::$ids[$id])) {
            $id = static::$ids[array_rand(static::$ids)];
        }

        return 'https://picsum.photos/' . $width . '/' . $height . '?image=' . $id;
    }

    /**
     * getImages
     *
     * @param  int        $count   Images number.
     * @param  int|array  $width   Can be int or array as random [start, end].
     * @param  int|array  $height  Can be int or array as random [start, end].
     * @param  int|null   $id      Image id or let fetch random id.
     *
     * @return  array
     *
     * @throws \Exception
     * @since  1.4
     */
    public static function getImages(
        int $count,
        int|array $width = 800,
        int|array $height = 600,
        ?int $id = null
    ): array {
        $images = [];

        foreach (range(1, $count) as $i) {
            $images[] = static::getImageUrl(
                is_array($width) ? random_int(...$width) : $width,
                is_array($height) ? random_int(...$height) : $height,
                $id
            );
        }

        return $images;
    }

    /**
     * getImages
     *
     * @param  int       $count
     * @param  int       $width
     * @param  int       $height
     * @param  int|null  $id
     *
     * @return  string
     *
     * @throws \JsonException
     * @throws \Exception
     * @since  1.4
     */
    public static function getImagesJson(int $count, int $width = 800, int $height = 600, ?int $id = null): string
    {
        return json_encode(static::getImages($count, $width, $height, $id), JSON_THROW_ON_ERROR);
    }

    /**
     * init
     *
     * @return  array
     */
    protected static function init(): array
    {
        if (static::$ids === null) {
            $file = static::getTempPath();

            if (!is_file($file)) {
                static::dump();
            }

            $content = file_get_contents($file);

            static::$ids = explode(',', $content);
        }

        return static::$ids;
    }

    /**
     * getTempPath
     *
     * @return  string
     */
    protected static function getTempPath(): string
    {
        return WINDWALKER_TEMP . '/unidev/images/picsum-list.data';
    }

    /**
     * getList
     *
     * @return  array
     */
    public static function getList(): array
    {
        if (!static::$images) {
            $http = new HttpClient();
            $response = $http->get('https://picsum.photos/list');

            $images = json_decode($response->getBody()->__toString(), true);

            foreach ($images as $image) {
                static::$images[$image['id']] = $image;
            }
        }

        return static::$images;
    }

    /**
     * dump
     *
     * @return  void
     */
    public static function dump(): void
    {
        $list = static::getList();

        $ids = array_column($list, 'id');

        $content = implode(',', $ids);

        Filesystem::write(static::getTempPath(), $content);
    }
}
