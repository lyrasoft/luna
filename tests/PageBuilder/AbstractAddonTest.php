<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\HasOwnStyleInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\Utilities\Contract\LanguageInterface;

#[AllowMockObjectsWithoutExpectations]
class AbstractAddonTest extends TestCase
{
    #[Test]
    public function getNameFallsBackToTranslation(): void
    {
        $lang = $this->createStub(LanguageInterface::class);
        $lang->method('trans')->willReturnArgument(0);

        self::assertSame(
            'luna.addon.fixture.name',
            FallbackFixtureAddon::getName($lang)
        );
    }

    #[Test]
    public function getNameUsesStaticOverride(): void
    {
        $lang = $this->createStub(LanguageInterface::class);
        $lang->method('trans')->willReturnArgument(0);

        self::assertSame('Custom Name', NamedFixtureAddon::getName($lang));
    }

    #[Test]
    public function getRendererReturnsRendererFromData(): void
    {
        $renderer = $this->createStub(RendererService::class);
        $addon = new FallbackFixtureAddon(
            $this->createStub(PageRendererFactory::class),
            ['renderer' => $renderer]
        );

        self::assertSame($renderer, $addon->getRenderer());
    }

    #[Test]
    public function getDescriptionFallsBackToTranslation(): void
    {
        $lang = $this->createStub(LanguageInterface::class);
        $lang->method('trans')->willReturnArgument(0);

        self::assertSame(
            'luna.addon.fixture.desc',
            FallbackFixtureAddon::getDescription($lang)
        );
    }

    #[Test]
    public function prepareOptionsPushesStylesToAssetForPlainAddon(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('internalCSS')
            ->with($this->stringContains('#plain .c-x'));

        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($asset);

        $styles = new StyleContainer('#plain');
        $styles->select('.c-x')->add('color', 'red');

        $addon = new FallbackFixtureAddon($factory);
        $data = new Collection(['styles' => $styles]);

        $addon->callPrepareOptions($data);
    }

    #[Test]
    public function prepareOptionsAppliesOwnStyleAndElementForHasOwnStyleAddon(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('internalCSS')
            ->with($this->stringContains('#own .c-own'));

        $factory = $this->createStub(PageRendererFactory::class);
        $factory->method('getAsset')->willReturn($asset);

        $data = new Collection([
            'styles' => new StyleContainer('#own'),
            'options' => new Collection(['color' => 'blue']),
            'classes' => [],
            'attrs' => [],
        ]);

        $addon = new OwnStyleFixtureAddon($factory);
        $addon->callPrepareOptions($data);

        self::assertSame(['c-own-class'], $data['classes']);
        self::assertSame(['data-color' => 'blue'], $data['attrs']);
    }
}

class FallbackFixtureAddon extends AbstractAddon
{
    protected static ?string $name = null;

    protected static ?string $description = null;

    public static function getType(): string
    {
        return 'fixture';
    }

    public static function getIcon(): string
    {
        return 'icon';
    }

    public static function loadVueComponent(AppContext $app): ?string
    {
        return null;
    }

    protected function prepareData(Collection $data): void {}

    protected function prepareJS(Collection $content): void {}

    public function callPrepareOptions(Collection $data): void
    {
        $this->prepareOptions($data);
    }
}

class OwnStyleFixtureAddon extends FallbackFixtureAddon implements HasOwnStyleInterface
{
    public function prepareCSS(Collection $options, StyleContainer $styles): void
    {
        $styles->select('.c-own')->add('color', $options->get('color'));
    }

    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
        $classes[] = 'c-own-class';
        $attrs['data-color'] = $options->get('color');
    }
}


class NamedFixtureAddon extends FallbackFixtureAddon
{
    protected static ?string $name = 'Custom Name';

    protected static ?string $description = 'Custom Desc';
}
