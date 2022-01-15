<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 LYRASOFT.
 * @license    MIT
 */

namespace Lyrasoft\Luna\Faker;

use Exception;
use Faker\Provider\Base as BaseProvider;
use JsonException;
use Lyrasoft\Luna\Helper\PravatarHelper;
use Lyrasoft\Luna\Helper\UnsplashHelper;

/**
 * The UnsplashFakerProvider class.
 */
class LunaFakerProvider extends BaseProvider
{
    /**
     * unsplash
     *
     * @param  int       $width
     * @param  int       $height
     * @param  int|null  $id
     *
     * @return  string
     *
     * @since  1.5.6
     */
    public function unsplashImage(int $width = 800, int $height = 600, ?int $id = null): string
    {
        return UnsplashHelper::getImageUrl($width, $height, $id);
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
     * @since  1.5.6
     */
    public function unsplashImages(int $count, int|array $width = 800, int|array $height = 600, ?int $id = null): array
    {
        return UnsplashHelper::getImages($count, $width, $height, $id);
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
     * @since  1.5.6
     */
    public function unsplashImagesJson(int $count, int $width = 800, int $height = 600, ?int $id = null): string
    {
        return json_encode($this->unsplashImages($count, $width, $height, $id), JSON_THROW_ON_ERROR);
    }

    /**
     * avatar
     *
     * @param  int          $size
     * @param  string|null  $u
     *
     * @return  string
     *
     * @throws Exception
     *
     * @since  1.5.6
     */
    public function avatar(int $size = 300, ?string $u = null): string
    {
        return PravatarHelper::unique($size, $u);
    }
}
