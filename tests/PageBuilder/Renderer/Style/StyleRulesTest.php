<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer\Style;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleRules;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class StyleRulesTest extends TestCase
{
    #[Test]
    public function addAppendsUnitToValue(): void
    {
        $rules = (new StyleRules())->add('width', 10, 'px');

        $css = $rules->render('.box');

        self::assertStringContainsString('.box', $css);
        self::assertStringContainsString('width: 10px;', $css);
    }

    #[Test]
    public function addSkipsEmptyValue(): void
    {
        $rules = (new StyleRules())->add('color', '', 'px');

        self::assertSame('', $rules->render('.box'));
    }

    #[Test]
    public function addReturnsSelfForChaining(): void
    {
        $rules = new StyleRules();

        self::assertSame($rules, $rules->add('color', 'red'));
    }

    #[Test]
    public function renderReturnsEmptyStringWithoutRules(): void
    {
        self::assertSame('', (new StyleRules())->render('.box'));
    }

    #[Test]
    public function renderIncludesNestedContainer(): void
    {
        $rules = new StyleRules();
        $nested = new StyleContainer();
        $nested->self()->add('color', 'blue');

        $rules->addStyles($nested);

        $css = $rules->render('.box');

        self::assertStringContainsString('color: blue;', $css);
    }

    #[Test]
    public function renderNestedContainerAndRulesTogether(): void
    {
        $rules = new StyleRules();
        $rules->add('width', 10, 'px');

        $nested = new StyleContainer();
        $nested->self()->add('color', 'blue');
        $rules->addStyles($nested);

        $css = $rules->render('.box');

        self::assertStringContainsString('width: 10px;', $css);
        self::assertStringContainsString('color: blue;', $css);
    }
}
