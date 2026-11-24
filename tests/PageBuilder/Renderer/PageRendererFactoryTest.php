<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use LogicException;
use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\AddonType;
use Lyrasoft\Luna\PageBuilder\PageService;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererInterface;
use Lyrasoft\Luna\PageBuilder\Renderer\RowRenderer;
use Lyrasoft\Luna\Script\PageScript;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;

class PageRendererFactoryTest extends TestCase
{
    #[Test]
    public function createAddonInstanceThrowsForUnknownType(): void
    {
        $pageService = $this->createStub(PageService::class);
        $pageService->method('getAddonType')->willReturn(null);

        $factory = $this->createFactory($pageService, null);

        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('Addon type: "unknown" not exists.');

        $factory->createAddonInstance('unknown', []);
    }

    #[Test]
    public function getAnimationDriverReturnsConfiguredDriver(): void
    {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')->willReturn('wow');

        $factory = $this->createFactory($this->createStub(PageService::class), $app);

        self::assertSame('wow', $factory->getAnimationDriver());
    }

    #[Test]
    public function getAnimationDriverFallsBackToAos(): void
    {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')->willReturn(null);

        $factory = $this->createFactory($this->createStub(PageService::class), $app);

        self::assertSame('aos', $factory->getAnimationDriver());
    }

    #[Test]
    public function createAddonInstanceMakesAddonWithDataAndFactory(): void
    {
        $pageService = $this->createStub(PageService::class);
        $pageService->method('getAddonType')->willReturn(new AddonType(FactoryFixtureAddon::class));

        $app = $this->createMock(ApplicationInterface::class);
        $app->expects($this->once())
            ->method('make')
            ->with(
                FactoryFixtureAddon::class,
                $this->callback(fn (array $args): bool => $args['data'] === ['text' => 'hello'])
            )
            ->willReturnCallback(
                fn (string $class, array $args) => new FactoryFixtureAddon($args['factory'], $args['data'])
            );

        $factory = $this->createFactory($pageService, $app);

        $addon = $factory->createAddonInstance('fallback', ['text' => 'hello']);

        self::assertInstanceOf(FactoryFixtureAddon::class, $addon);
        self::assertSame('hello', $addon->getData()['text']);
    }

    #[Test]
    public function getScriptReturnsPageScriptFromApplication(): void
    {
        $script = $this->createStub(PageScript::class);

        $app = $this->createMock(ApplicationInterface::class);
        $app->expects(self::once())
            ->method('service')
            ->with(PageScript::class)
            ->willReturn($script);

        $factory = $this->createFactory($this->createStub(PageService::class), $app);

        self::assertSame($script, $factory->getScript());
    }

    #[Test]
    public function createRendererMakesNamedRendererWithFactory(): void
    {
        $renderer = $this->createStub(PageRendererInterface::class);

        $app = $this->createMock(ApplicationInterface::class);
        $app->expects(self::once())
            ->method('make')
            ->with(
                RowRenderer::class,
                self::callback(fn (array $args): bool => isset($args['factory']))
            )
            ->willReturn($renderer);

        $factory = $this->createFactory($this->createStub(PageService::class), $app);

        self::assertSame($renderer, $factory->createRenderer('row'));
    }

    private function createFactory(PageService $pageService, ?ApplicationInterface $app): PageRendererFactory
    {
        return new PageRendererFactory(
            $app ?? $this->createStub(ApplicationInterface::class),
            $pageService,
            $this->createStub(AssetService::class),
        );
    }
}

class FactoryFixtureAddon extends AbstractAddon
{
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
}
