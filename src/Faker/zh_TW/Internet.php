<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Faker\zh_TW;

use THL\Pinyin;

/**
 * The Internet class.
 */
class Internet extends \Faker\Provider\Internet
{
    protected static function transliterate($string)
    {
        if (class_exists(Pinyin::class)) {
            return Pinyin::pinyin($string);
        }

        return parent::transliterate($string);
    }

    /**
     * @inheritDoc
     */
    public function userName()
    {
        return str_replace(' ', '', parent::userName());
    }
}
