<?php

namespace Lyrasoft\Luna\Faker\zh_CN;

use Exception;
use Faker\Provider\Base;
use InvalidArgumentException;

use function count;

/**
 * The Lorem class.
 *
 * @since  1.5.1
 */
class Lorem extends Base
{
    /**
     * Word list from Three Character Classic.
     *
     * Language: Traditional Chinese
     *
     * @see http://www.minlun.org.tw/3pt/3pt-2-4/0.htm
     *
     * @var  array
     */
    protected static $wordList = [
        '人之初',
        '性本善',
        '性相近',
        '习相远',
        '苟不教',
        '性乃迁',
        '教之道',
        '贵以专',
        '昔孟母',
        '择邻处',
        '子不学',
        '断机杼',
        '窦燕山',
        '有义方',
        '教五子',
        '名俱扬',
        '养不教',
        '父之过',
        '教不严',
        '师之惰',
        '子不学',
        '非所宜',
        '幼不学',
        '老何为',
        '玉不琢',
        '不成器',
        '人不学',
        '不知义',
        '为人子',
        '方少时',
        '亲师友',
        '习礼仪',
        '香九龄',
        '能温席',
        '孝于亲',
        '所当执',
        '融四岁',
        '能让梨',
        '弟于长',
        '宜先知',
        '首孝悌',
        '次见闻',
        '知某数',
        '识某文',
        '一而十',
        '十而百',
        '百而千',
        '千而万',
        '三才者',
        '天地人',
        '三光者',
        '日月星',
        '三纲者',
        '君臣义',
        '父子亲',
        '夫妇顺',
        '曰春夏',
        '曰秋冬',
        '此四时',
        '运不穷',
        '曰南北',
        '曰西东',
        '此四方',
        '应乎中',
        '曰水火',
        '木金土',
        '此五行',
        '本乎数',
        '曰仁义',
        '礼智信',
        '此五常',
        '不容紊',
        '稻梁菽',
        '麦黍稷',
        '此六谷',
        '人所食',
        '马牛羊',
        '鸡犬豕',
        '此六畜',
        '人所饲',
        '曰喜怒',
        '曰哀惧',
        '爱恶欲',
        '七情具',
        '匏土革',
        '木石金',
        '与丝竹',
        '乃八音',
        '高曾祖',
        '父而身',
        '身而子',
        '子而孙',
        '自子孙',
        '至玄曾',
        '乃九族',
        '人之伦',
        '父子恩',
        '夫妇从',
        '兄则友',
        '弟则恭',
        '长幼序',
        '友与朋',
        '君则敬',
        '臣则忠',
        '此十义',
        '人所同',
        '凡训蒙',
        '须讲究',
        '详训诂',
        '明句读',
        '为学者',
        '必有初',
        '小学终',
        '至四书',
        '论语者',
        '二十篇',
        '群弟子',
        '记善言',
        '孟子者',
        '七篇止',
        '讲道德',
        '说仁义',
        '作中庸',
        '子思笔',
        '中不偏',
        '庸不易',
        '作大学',
        '乃曾子',
        '自修齐',
        '至平治',
        '孝经通',
        '四书熟',
        '如六经',
        '始可读',
        '诗书易',
        '礼春秋',
        '号六经',
        '当讲求',
        '有连山',
        '有归藏',
        '有周易',
        '三易详',
        '有典谟',
        '有训诰',
        '有誓命',
        '书之奥',
        '我周公',
        '作周礼',
        '着六官',
        '存治体',
        '大小戴',
        '注礼记',
        '述圣言',
        '礼乐备',
        '曰国风',
        '曰雅颂',
        '号四诗',
        '当讽咏',
        '诗既亡',
        '春秋作',
        '寓褒贬',
        '别善恶',
        '三传者',
        '有公羊',
        '有左氏',
        '有谷梁',
        '经既明',
        '方读子',
        '撮其要',
        '记其事',
        '五子者',
        '有荀扬',
        '文中子',
        '及老庄',
        '经子通',
        '读诸史',
        '考世系',
        '知终始',
        '自羲农',
        '至黄帝',
        '号三皇',
        '居上世',
        '唐有虞',
        '号二帝',
        '相揖逊',
        '称盛世',
        '夏有禹',
        '商有汤',
        '周文武',
        '称三王',
        '夏传子',
        '家天下',
        '四百载',
        '迁夏社',
        '汤伐夏',
        '国号商',
        '六百载',
        '至纣亡',
        '周武王',
        '始诛纣',
        '八百载',
        '最长久',
        '周辙东',
        '王纲坠',
        '逞干戈',
        '尚游说',
        '始春秋',
        '终战国',
        '五霸强',
        '七雄出',
        '嬴秦氏',
        '始兼并',
        '传二世',
        '楚汉争',
        '高祖兴',
        '汉业建',
        '至孝平',
        '王莽篡',
        '光武兴',
        '为东汉',
        '四百年',
        '终于献',
        '魏蜀吴',
        '争汉鼎',
        '号三国',
        '迄两晋',
        '宋齐继',
        '梁陈承',
        '为南朝',
        '都金陵',
        '北元魏',
        '分东西',
        '宇文周',
        '与高齐',
        '迨至隋',
        '一土宇',
        '不再传',
        '失统绪',
        '唐高祖',
        '起义师',
        '除隋乱',
        '创国基',
        '二十传',
        '三百载',
        '梁灭之',
        '国乃改',
        '梁唐晋',
        '及汉周',
        '称五代',
        '皆有由',
        '炎宋兴',
        '受周禅',
        '十八传',
        '南北混',
        '辽与金',
        '皆称帝',
        '元灭金',
        '绝宋世',
        '舆图广',
        '超前代',
        '九十年',
        '国祚废',
        '太祖兴',
        '国大明',
        '号洪武',
        '都金陵',
        '迨成祖',
        '迁燕京',
        '十六世',
        '至崇祯',
        '阉祸后',
        '寇内讧',
        '闯逆变',
        '神器终',
        '廿二史',
        '全在兹',
        '载治乱',
        '知兴衰',
        '读史者',
        '考实录',
        '通古今',
        '若亲目',
        '口而诵',
        '心而惟',
        '朝于斯',
        '夕于斯',
        '昔仲尼',
        '师项橐',
        '古圣贤',
        '尚勤学',
        '赵中令',
        '读鲁论',
        '彼既仕',
        '学且勤',
        '披蒲编',
        '削竹简',
        '彼无书',
        '且知勉',
        '头悬梁',
        '锥刺骨',
        '彼不教',
        '自勤苦',
        '如囊萤',
        '如映雪',
        '家虽贫',
        '学不辍',
        '如负薪',
        '如挂角',
        '身虽劳',
        '犹苦卓',
        '苏老泉',
        '二十七',
        '始发愤',
        '读书籍',
        '彼既老',
        '犹悔迟',
        '尔小生',
        '宜早思',
        '若梁灏',
        '八十二',
        '对大廷',
        '魁多士',
        '彼既成',
        '众称异',
        '尔小生',
        '宜立志',
        '莹八岁',
        '能咏诗',
        '泌七岁',
        '能赋碁',
        '彼颖悟',
        '人称奇',
        '尔幼学',
        '当效之',
        '蔡文姬',
        '能辨琴',
        '谢道韫',
        '能咏吟',
        '彼女子',
        '且聪敏',
        '尔男子',
        '当自警',
        '唐刘晏',
        '方七岁',
        '举神童',
        '作正字',
        '彼虽幼',
        '身己仕',
        '尔幼学',
        '勉而致',
        '有为者',
        '亦若是',
        '犬守夜',
        '鸡司晨',
        '苟不学',
        '曷为人',
        '蚕吐丝',
        '蜂酿蜜',
        '人不学',
        '不如物',
        '幼而学',
        '壮而行',
        '上致君',
        '下泽民',
        '扬名声',
        '显父母',
        '光于前',
        '裕于后',
        '人遗子',
        '金满籯',
        '我教子',
        '惟一经',
        '勤有功',
        '戏无益',
        '戒之哉',
        '宜勉力'
    ];

    /**
     * @return string
     * @example '乾為天'
     */
    public static function word(): string
    {
        return static::randomElement(static::$wordList);
    }

    /**
     * Generate an array of random words
     *
     * @param  integer  $nb      how many words to return
     * @param  bool     $asText  if true the sentences are returned as one string
     *
     * @return array|string
     * @example array('乾為天', '澤天夬', '火天大有')
     *
     */
    public static function words($nb = 3, $asText = false)
    {
        $words = [];

        for ($i = 0; $i < $nb; $i++) {
            $words [] = static::word();
        }

        return $asText ? implode('', $words) : $words;
    }

    /**
     * Generate a random sentence
     *
     * @param  integer  $nbWords          around how many words the sentence should contain
     * @param  boolean  $variableNbWords  set to false if you want exactly $nbWords returned,
     *                                    otherwise $nbWords may vary by +/-40% with a minimum of 1
     *
     * @return string
     * @throws Exception
     * @example '天行健，自強不息，飛龍在天，大人造也，亢龍有悔，盈不可久也。'
     *
     */
    public static function sentence($nbWords = 6, $variableNbWords = true): string
    {
        if ($nbWords <= 0) {
            return '';
        }

        if ($variableNbWords) {
            $nbWords = self::randomizeNbElements($nbWords);
        }

        $words = static::words($nbWords);

        return implode('，', $words);
    }

    /**
     * Generate an array of sentences
     *
     * @param  integer  $nb      how many sentences to return
     * @param  bool     $asText  if true the sentences are returned as one string
     *
     * @return array|string
     * @throws Exception
     * @example array('天行健，自強不息。', '亢龍有悔，盈不可久也。')
     *
     */
    public static function sentences($nb = 3, $asText = false)
    {
        $sentences = [];

        for ($i = 0; $i < $nb; $i++) {
            $sentences [] = static::sentence();
        }

        return $asText ? implode('。', $sentences) . '。' : $sentences;
    }

    /**
     * Generate a single paragraph
     *
     * @param  integer  $nbSentences          around how many sentences the paragraph should contain
     * @param  boolean  $variableNbSentences  set to false if you want exactly $nbSentences returned,
     *                                        otherwise $nbSentences may vary by +/-40% with a minimum of 1
     *
     * @return string
     * @throws Exception
     * @example '天行健，自強不息，飛龍在天，大人造也，亢龍有悔，盈不可久也。天地變化，草木蕃，天地閉，賢人隱。'
     *
     */
    public static function paragraph($nbSentences = 3, $variableNbSentences = true): string
    {
        if ($nbSentences <= 0) {
            return '';
        }

        if ($variableNbSentences) {
            $nbSentences = self::randomizeNbElements($nbSentences);
        }

        return implode('', static::sentences($nbSentences));
    }

    /**
     * Generate an array of paragraphs
     *
     * @param  integer  $nb      how many paragraphs to return
     * @param  bool     $asText  if true the paragraphs are returned as one string, separated by two newlines
     *
     * @return array|string
     * @throws Exception
     * @example array($paragraph1, $paragraph2, $paragraph3)
     *
     */
    public static function paragraphs($nb = 3, $asText = false)
    {
        $paragraphs = [];

        for ($i = 0; $i < $nb; $i++) {
            $paragraphs [] = static::paragraph();
        }

        return $asText ? implode("\n\n", $paragraphs) : $paragraphs;
    }

    /**
     * Generate a text string.
     * Depending on the $maxNbChars, returns a string made of words, sentences, or paragraphs.
     *
     * @param  integer  $maxNbChars  Maximum number of characters the text should contain (minimum 1)
     *
     * @return string
     * @example 'Sapiente sunt omnis. Ut pariatur ad autem ducimus et. Voluptas rem voluptas sint modi dolorem amet.'
     *
     */
    public static function text($maxNbChars = 200): string
    {
        if ($maxNbChars < 1) {
            throw new InvalidArgumentException('text() can only generate text of at least 5 characters');
        }

        if ($maxNbChars <= 5) {
            $type = 'characters';
        } elseif ($maxNbChars > 5 && $maxNbChars <= 15) {
            $type = 'word';
        } elseif ($maxNbChars > 15 && $maxNbChars <= 100) {
            $type = 'sentence';
        } else {
            $type = 'paragraph';
        }

        $text = [];

        if ($type === 'characters') {
            if ($maxNbChars <= 2) {
                do {
                    $word = static::word();
                } while (mb_strlen($word) < $maxNbChars);

                $characters = preg_split('/(?<!^)(?!$)/u', $word);

                $characters = static::randomElements($characters, $maxNbChars);

                return implode('', $characters);
            }

            do {
                $word = static::word();
            } while (mb_strlen($word) !== $maxNbChars);

            return $word;
        }

        while (empty($text)) {
            $size = 0;

            // until $maxNbChars is reached
            while ($size < $maxNbChars) {
                $word = ($size ? ' ' : '') . static::$type();
                $text[] = $word;

                $size += mb_strlen($word);
            }

            array_pop($text);
        }

        if ($type === 'word') {
            // end sentence with full stop
            $text[count($text) - 1] .= '。';
        }

        return implode('', $text);
    }

    /**
     * randomizeNbElements
     *
     * @param  int  $nbElements
     *
     * @return  int
     *
     * @throws Exception
     * @since  1.5.1
     */
    protected static function randomizeNbElements($nbElements): int
    {
        return (int) ($nbElements * random_int(80, 120) / 100) + 1;
    }

    /**
     * setWordList
     *
     * @param  string|array  $wordList
     *
     * @return  void
     *
     * @since  1.5.6
     */
    public static function setWordList($wordList): void
    {
        if (is_string($wordList)) {
            $wordList = explode("\n", $wordList);
        }

        $wordList = array_filter(array_map('trim', $wordList), 'strlen');

        static::$wordList = $wordList;
    }
}
