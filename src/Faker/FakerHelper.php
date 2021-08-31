<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Faker;

use Faker\Factory;
use Faker\Generator;

/**
 * The FakerHelper class.
 *
 * @since  1.5.1
 */
class FakerHelper
{
    /**
     * Property fakers.
     *
     * @var  Generator[]
     */
    protected static array $fakers = [];

    /**
     * getFaker
     *
     * @param string $locale
     *
     * @return  Generator
     *
     * @deprecated  Use FakerService instead.
     */
    public static function getFaker(string $locale = Factory::DEFAULT_LOCALE): Generator
    {
        $locale = str_replace('-', '_', $locale);

        if (!isset(static::$fakers[$locale])) {
            $faker = Factory::create($locale);

            static::$fakers[$locale] = $faker;
        }

        return static::$fakers[$locale];
    }

    /**
     * register
     *
     * @param string $locale
     *
     * @return  void
     *
     * @since  1.5.1
     *
     * @deprecated  Use registerChineseLorem().
     */
    public static function registerIChing(string $locale = 'zh_TW'): void
    {
        static::registerChineseLorem($locale);
    }

    /**
     * register
     *
     * @param string $locale
     *
     * @return  void
     *
     * @since  1.5.1
     */
    public static function registerChineseLorem(string $locale = 'zh_TW'): void
    {
        class_alias(\Lyrasoft\Luna\Faker\zh_TW\Lorem::class, 'Faker\Provider\\' . $locale . '\Lorem');
    }

    /**
     * getBuddhistSizes
     *
     * @see https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%87%E6%95%B0%E5%AD%97#.E4.BD.9B.E7.B6.93.E6.95.B8.E5.AD.97
     *
     * @return  array
     */
    public static function getBuddhistSizes(): array
    {
        return [
            '倶胝',
            '阿庾多',
            '那由他',
            '頻波羅',
            '矜羯羅',
            '阿伽羅',
            '最勝',
            '摩婆羅',
            '阿婆羅',
            '多婆羅',
            '界分',
            '普摩',
            '禰摩',
            '阿婆鈐',
            '彌伽婆',
            '毘攞伽',
            '毘伽婆',
            '僧羯邏摩',
            '毘薩羅',
            '毘贍婆',
            '毘盛伽',
            '毘素陀',
            '毘婆訶',
            '毘薄底',
            '毘佉擔',
            '稱量',
            '一持',
            '異路',
            '顛倒',
            '三末耶',
            '毘睹羅',
            '奚婆羅',
            '伺察',
            '周廣',
            '高出',
            '最妙',
            '泥羅婆',
            '訶理婆',
            '一動',
            '訶理蒲',
            '訶理三',
            '奚魯伽',
            '達攞歩陀',
            '訶魯那',
            '摩魯陀',
            '懺慕陀',
            '瑿攞陀',
            '摩魯摩',
            '調伏',
            '離憍慢',
            '不動',
            '極量',
            '阿麼怛羅',
            '勃麼怛羅',
            '伽麼怛羅',
            '那麼怛羅',
            '奚麼怛羅',
            '鞞麼怛羅',
            '鉢羅麼怛羅',
            '屍婆麼怛羅',
            '翳羅',
            '薜羅',
            '諦羅',
            '偈羅',
            '窣步羅',
            '泥羅',
            '計羅',
            '細羅',
            '睥羅',
            '謎羅',
            '娑攞荼',
            '謎魯陀',
            '契魯陀',
            '摩睹羅',
            '娑母羅',
            '阿野娑',
            '迦麼羅',
            '摩伽婆',
            '阿怛羅',
            '醯魯耶',
            '薜魯婆',
            '羯羅波',
            '訶婆婆',
            '毘婆羅',
            '那婆羅',
            '摩攞羅',
            '娑婆羅',
            '迷攞普',
            '者麼羅',
            '駄麼羅',
            '鉢攞麼陀',
            '毘迦摩',
            '烏波跋多',
            '演說',
            '無盡',
            '出生',
            '無我',
            '阿畔多',
            '青蓮華',
            '鉢頭摩',
            '僧祇',
            '趣',
            '至',
            '阿僧祇',
            '阿僧祇轉',
            '無量',
            '無量轉',
            '無邊',
            '無邊轉',
            '無等',
            '無等轉',
            '不可數',
            '不可數轉',
            '不可稱',
            '不可稱轉',
            '不可思',
            '不可思轉',
            '不可量',
            '不可量轉',
            '不可說',
            '不可說轉',
            '不可說不可說',
            '不可說不可說轉'
        ];
    }
}
