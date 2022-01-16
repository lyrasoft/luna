<?php

namespace Lyrasoft\Luna\Faker\ja_JP;

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
     * Word list from Japanese Lorem.
     *
     * Language: Japanese
     *
     * @see https://github.com/samogot/lorem-ipsum-japanese/tree/master/lib
     *
     * @var  array
     */
    protected static $wordList = [
        'ルビ',
        'ンツア',
        'ウェブア',
        'ふべからず',
        'セシビリテ,',
        'どら',
        'トモデル',
        'プロファイル',
        'とセマンティック',
        'めよう,',
        '内准剛',
        'んア',
        'を始めよう',
        'プロトコル',
        'プロファイル',
        '展久',
        'プロセスド',
        '情報セット',
        'トとして使',
        'ップに,',
        'クほ',
        'にによる',
        'ウェブコ',
        'クセシビリティ',
        'ツアク,',
        'ンツアクセシ',
        'ビスとレイティ',
        'クセシビリティ',
        'での',
        'にする',
        'どら',
        'セシビリ',
        'マイクロソフト',
        'のため,',
        'め「こを',
        'ウェブコ',
        'ウェブコンテン',
        '健二仕',
        'エム',
        'めよう',
        'での',
        'にによる',
        'ビリティ',
        'イドライン,',
        'セシビ',
        'のな',
        'イドライン',
        'アキテクチャ,',
        'のため',
        'プロトコル',
        'クリック」',
        'どら',
        'アクセシビ',
        'マイクロソフト',
        'クセシビリティ',
        'シトを',
        'どら,',
        'セシビ',
        'ティのい',
        'セシビリ',
        'サイトをアクセシブ',
        'での',
        '',
        'エム',
        'にによる',
        'キュメント',
        '拡張可',
        'ンツアクセシ',
        'ベルの仕と信',
        'を始めてみよう',
        'セシビ',
        '展久,',
        '併団イ',
        'ルのアク',
        'プロトコル',
        'オサリングツ',
        'ネッ',
        'ィに',
        'への切りえ',
        'のイベント',
        'クセシビリティ',
        '併団イ,',
        'のイベント',
        'コンテンツアクセ',
        'サイト作成のヒント',
        'クセス',
        'ィに,',
        'エム',
        'ップに',
        'アキテクチャ',
        'ルにするために',
        'ウェ',
        '丸山亮仕',
        'を始めてみよう',
        'ツアク,',
        'シン可な',
        'ブコンテ',
        'ユザエ',
        'よる,',
        'アク',
        'セシビリティ',
        'レイテリング',
        'ンタネット協会',
        'にする',
        'トとして使',
        'レイティングサ',
        'を始めてみよう',
        'イビ',
        'ップに,',
        'コンテン',
        'プロセスド',
        'への切りえ',
        'どら',
        'わった,',
        'をマ',
        'ブコンテ',
        'リア式会',
        'インタラクション',
        'ンツア',
        '',
        'イビ',
        'ウェブコ',
        'シビリティ',
        'シトを,',
        'んア',
        '併団イ',
        'ウェブコ',
        'プロセスド',
        'とセマンティック',
        'ラベラ',
        'への切りえ',
        'ジェントのアクセシ',
        'ィに,',
        'クセス',
        'での',
        'ビリティ',
        'コンテン,',
        '展久',
        '拡張可',
        'コンテン',
        'ガイドライン',
        'ク付け',
        'のな',
        'クアップ',
        'オブジェク',
        'ルにするために',
        'にによる',
        'ウェブコ',
        'ビリティにる',
        '拡張可',
        '展久,',
        'クほ',
        'およびそのマ',
        'リティガイドライン',
        'わった',
        'クセス',
        'にによる',
        'イドライン',
        'レイティングサ',
        'ンテ,',
        'クセス',
        'どら',
        'ンツアクセシ',
        'ボキャブラリ',
        'ングシステム,',
        'リア式会',
        'クリック」',
        '健二仕',
        'ルビ',
        '拡張可',
        'での',
        'およびそのマ',
        'マイクロソフト,',
        'エム',
        'ク付け',
        'ビリティ',
        'トモデル',
        'テキストマ,',
        '内准剛',
        'んア',
        'め「こを',
        '丸山亮仕',
        '',
        '併団イ',
        '寛会',
        'を始めよう',
        'ボキャブラリ',
        'サイト作成のヒント,',
        'ロジ',
        'スタイル',
        'テキストマ',
        'テストスイト',
        'トワク,',
        'ンテ',
        'マルチメ',
        'アクセシビ',
        'セシビ',
        'ウェ',
        'クセス',
        'アクセシビ',
        'ビスとレイティ,',
        'マルチメ',
        'をリンクテキス',
        'ジェントのアクセシ',
        'ルビ',
        'ユザエ,',
        'ユザエ',
        'パス',
        'プリファ',
        'ルのアク',
        'を始めよう',
        'プロセスド',
        '情報セット',
        'ルにするために',
        '功久',
        'ディア,',
        'の徴',
        'め「こを',
        'ふべからず',
        'まきかずひこ',
        'のため,',
        'んア',
        'プロセスド',
        'プロトコル',
        'インフォテ',
        'わった',
        'め「こを',
        'ブコンテ',
        'コンテン',
        'どら',
        'ンツア,',
        'エム',
        '拡張可',
        'クアップ',
        'コンテン',
        'でウェブにと,',
        'ウェ',
        'ツアク',
        'ウェブコ',
        'テキストマ',
        'のイベント',
        'をマ',
        'シトを',
        'キュメント',
        'オサリングツル,',
        'およびそのマ',
        'を始めてみよう',
        'サイト作成のヒント',
        'どら',
        'ラベラ,',
        'その他',
        'クほ',
        'シン可な',
        'およびそのマ',
        'クセシビリティ',
        'ビリティ',
        'セシビリ',
        'への切りえ',
        'ロジ',
        'のため,',
        'ルビ',
        'クセス',
        'プリファ',
        'イドライン',
        'オブジェク',
    ];

    /**
     * @return string
     * @example 'オブジェク'
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
     * @example array('のため', 'クセシビリティ', 'およびそのマ')
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
