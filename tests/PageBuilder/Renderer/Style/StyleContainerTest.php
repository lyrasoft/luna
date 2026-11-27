<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer\Style;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleRules;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class StyleContainerTest extends TestCase
{
    #[Test]
    public function selectJoinsPrefixWithSpace(): void
    {
        $style = new StyleContainer('.page');

        $style->select('.title')->add('color', 'red');

        $css = $style->render();

        self::assertStringContainsString('.page .title', $css);
        self::assertStringContainsString('color: red;', $css);
    }

    #[Test]
    public function selectAppendJoinsPrefixWithoutSpace(): void
    {
        $style = new StyleContainer('.page');

        $style->selectAppend('.title')->add('color', 'red');

        self::assertStringContainsString('.page.title', $style->render());
    }

    #[Test]
    public function selfUsesPrefixAndSuffix(): void
    {
        $style = new StyleContainer('.btn');

        $style->self('-primary')->add('color', 'green');

        self::assertStringContainsString('.btn-primary', $style->render());
    }

    #[Test]
    public function selectReusesSameRulesForSameSelector(): void
    {
        $style = new StyleContainer('.page');

        $first = $style->select('.a');
        $second = $style->select('.a');

        self::assertSame($first, $second);
    }

    #[Test]
    public function selectRunsCallback(): void
    {
        $style = new StyleContainer();

        $style->select('.a', function (StyleRules $rules) {
            $rules->add('margin', '0');
        });

        self::assertStringContainsString('margin: 0;', $style->render());
    }

    #[Test]
    public function wrapCreatesNestedContainerWithSamePrefix(): void
    {
        $style = new StyleContainer('.page');

        $nested = $style->wrap('@media (max-width: 767px)', function (StyleContainer $inner) {
            $inner->select('.title')->add('font-size', '12px');
        });

        self::assertNotSame($style, $nested);

        $css = $style->render();

        self::assertStringContainsString('@media (max-width: 767px)', $css);
        self::assertStringContainsString('.page .title', $css);
        self::assertStringContainsString('font-size: 12px;', $css);
    }

    #[Test]
    public function renderPutsMediaQueriesLast(): void
    {
        $style = new StyleContainer();

        $style->wrap('@media (max-width: 767px)', function (StyleContainer $inner) {
            $inner->select('.mobile')->add('display', 'none');
        });
        $style->select('.desktop')->add('display', 'block');

        $css = $style->render();

        self::assertGreaterThan(
            strpos($css, '.desktop'),
            strpos($css, '@media')
        );
    }

    #[Test]
    public function rwdCallsCallbackForEachBreakpoint(): void
    {
        $style = new StyleContainer('.page');

        $sizes = [];

        $style->rwd(function (StyleContainer $container, string $size) use (&$sizes) {
            $sizes[] = $size;
            $container->select('.x')->add('size', $size);
        });

        self::assertSame(['lg', 'md', 'xs'], $sizes);

        $css = $style->render();

        self::assertStringContainsString('@media (max-width: 991px) and (min-width: 768px)', $css);
        self::assertStringContainsString('@media (max-width: 767px)', $css);
        self::assertStringContainsString('size: md;', $css);
        self::assertStringContainsString('size: xs;', $css);
    }

    #[Test]
    public function renderReturnsEmptyStringWithoutSelectors(): void
    {
        self::assertSame('', new StyleContainer()->render());
    }
}
