<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder;

use Lyrasoft\Luna\PageBuilder\Addon\Image\ImageAddon;
use Lyrasoft\Luna\PageBuilder\Addon\Text\TextAddon;
use Lyrasoft\Luna\PageBuilder\PageService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\ORM\ORM;

class PageServiceTest extends TestCase
{
    #[Test]
    public function genPreviewSecretCanBeVerifiedForSameId(): void
    {
        $service = $this->createService('app-secret');

        $secret = $service->genPreviewSecret(10);

        self::assertStringContainsString('.', $secret);
        self::assertTrue($service->secretVerify(10, $secret));
    }

    #[Test]
    public function secretVerifyFailsForDifferentId(): void
    {
        $service = $this->createService('app-secret');

        $secret = $service->genPreviewSecret(10);

        self::assertFalse($service->secretVerify(11, $secret));
    }

    #[Test]
    public function secretVerifyFailsWithoutSeparator(): void
    {
        $service = $this->createService('app-secret');

        self::assertFalse($service->secretVerify(10, 'nodothere'));
    }

    #[Test]
    public function secretVerifyFailsForTamperedHash(): void
    {
        $service = $this->createService('app-secret');

        [$salt] = explode('.', $service->genPreviewSecret(10), 2);

        self::assertFalse($service->secretVerify(10, $salt . '.WRONG'));
    }

    #[Test]
    public function secretVerifyFailsWhenAppSecretDiffers(): void
    {
        $secret = $this->createService('app-secret')->genPreviewSecret(10);

        self::assertFalse($this->createService('other-secret')->secretVerify(10, $secret));
    }

    #[Test]
    public function secretVerifyAcceptsStringId(): void
    {
        $service = $this->createService('app-secret');

        $secret = $service->genPreviewSecret('abc');

        self::assertTrue($service->secretVerify('abc', $secret));
    }

    #[Test]
    public function getAddonTypesIndexesAddonClassesByType(): void
    {
        $service = new TestPageService(
            $this->createStub(ApplicationInterface::class),
            $this->createStub(ORM::class),
            [TextAddon::class, ImageAddon::class]
        );

        $types = $service->getAddonTypes();

        self::assertSame(['text', 'image'], array_keys($types));
        self::assertSame(TextAddon::class, $types['text']->getClassName());
    }

    #[Test]
    public function getAddonTypeReturnsMatchingTypeOrNull(): void
    {
        $service = new TestPageService(
            $this->createStub(ApplicationInterface::class),
            $this->createStub(ORM::class),
            [TextAddon::class]
        );

        self::assertNotNull($service->getAddonType('text'));
        self::assertNull($service->getAddonType('missing'));
    }

    private function createService(string $appSecret): PageService
    {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('getSecret')->willReturn($appSecret);

        return new PageService($app, $this->createStub(ORM::class));
    }
}

class TestPageService extends PageService
{
    public function __construct(ApplicationInterface $app, ORM $orm, private array $addonClasses)
    {
        parent::__construct($app, $orm);
    }

    public function getAddonClasses(): array
    {
        return $this->addonClasses;
    }
}
