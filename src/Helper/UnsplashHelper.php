<?php

/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Helper;

use Exception;
use JsonException;
use Psr\Http\Message\ResponseInterface;
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
     * Property ids.
     *
     * @var  array|null
     */
    protected static array|null $ids = null;

    protected static ?\Closure $imageListHandler = null;

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
     * @throws Exception
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
     * @throws JsonException
     * @throws Exception
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
                try {
                    static::dumpFromApi();
                } catch (\RuntimeException $e) {
                    $file = __DIR__ . '/../../resources/data/picsum-list.data';
                }
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
        return WINDWALKER_TEMP . '/luna/images/picsum-list.data';
    }

    /**
     * getList
     *
     * @return  array
     */
    public static function getIdListFromApi(): array
    {
        $ids = [];

        $http = new HttpClient();

        /** @var ResponseInterface $response */
        $response = static::getImageListHandler()($http, 'https://picsum.photos/list');

        if ($response->getStatusCode() !== 200) {
            throw new \RuntimeException(
                $response->getReasonPhrase(),
                $response->getStatusCode()
            );
        }

        $images = json_decode($response->getBody()->__toString(), true);

        foreach ($images as $image) {
            $ids[] = $image['id'];
        }

        return $ids;
    }

    /**
     * dump
     *
     * @return  void
     */
    public static function dumpFromApi(): void
    {
        $ids = static::getIdListFromApi();

        $content = implode(',', $ids);

        Filesystem::write(static::getTempPath(), $content);
    }

    /**
     * @return \Closure|null
     */
    public static function getImageListHandler(): ?\Closure
    {
        return static::$imageListHandler ?? static function (HttpClient $client, string $url) {
            return $client->get(
                $url,
                [
                    'headers' => [
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' .
                            '(KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
                    ]
                ]
            );
        };
    }

    /**
     * @param  \Closure|null  $imageListHandler
     *
     * @return  void
     */
    public static function setImageListHandler(?\Closure $imageListHandler): void
    {
        static::$imageListHandler = $imageListHandler;
    }
}
