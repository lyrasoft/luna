<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder\Renderer;

use LogicException;
use Lyrasoft\Luna\PageBuilder\PageService;
use Lyrasoft\Luna\PageBuilder\Renderer\PageRendererFactory;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Asset\AssetService;

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

    private function createFactory(PageService $pageService, ?ApplicationInterface $app): PageRendererFactory
    {
        return new PageRendererFactory(
            $app ?? $this->createStub(ApplicationInterface::class),
            $pageService,
            $this->createStub(AssetService::class),
        );
    }
}
