<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Middleware;

use Closure;
use Lyrasoft\Luna\Entity\Association;
use Lyrasoft\Luna\Middleware\LangAssocMiddleware;
use Lyrasoft\Luna\Services\AssociationService;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use ReflectionProperty;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Data\Collection;
use Windwalker\ORM\Metadata\EntityMetadata;
use Windwalker\ORM\ORM;

class LangAssocMiddlewareTest extends TestCase
{
    private function createMiddleware(
        ?AppContext $app = null,
        ?AssociationService $associationService = null,
        ?ORM $orm = null,
        ?Navigator $nav = null,
        ?LocaleService $localeService = null,
    ): LangAssocMiddleware {
        $middleware = new LangAssocMiddleware(
            $app ?? $this->createStub(AppContext::class),
            $associationService ?? $this->createStub(AssociationService::class),
            $orm ?? $this->createStub(ORM::class),
            $nav ?? $this->createStub(Navigator::class),
        );

        $localeService ??= $this->createLocaleService(true);
        new ReflectionProperty($middleware, 'localeService')->setValue($middleware, $localeService);

        return $middleware;
    }

    private function createLocaleService(bool $enabled): LocaleService
    {
        $localeService = $this->createStub(LocaleService::class);
        $localeService->method('isEnabled')->willReturn($enabled);

        return $localeService;
    }

    private function createRequest(?array $parsedBody): ServerRequestInterface
    {
        $request = $this->createStub(ServerRequestInterface::class);
        $request->method('getParsedBody')->willReturn($parsedBody);

        return $request;
    }

    private function createNext(ResponseInterface $response): Closure
    {
        return fn() => $response;
    }

    #[Test]
    public function localeDisabledReturnsNextResponseUntouched(): void
    {
        $response = $this->createStub(ResponseInterface::class);

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->never())->method('findOne');

        $middleware = $this->createMiddleware(
            orm: $orm,
            localeService: $this->createLocaleService(false),
        );

        $result = $middleware->run(
            $this->createRequest(['lang_assoc' => ['task' => 'refresh']]),
            $this->createNext($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function missingPayloadReturnsNextResponseUntouched(): void
    {
        $response = $this->createStub(ResponseInterface::class);

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->never())->method('findOne');

        $result = $this->createMiddleware(orm: $orm)->run(
            $this->createRequest([]),
            $this->createNext($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function switchTaskRedirectsToRouteBuiltFromTargetItem(): void
    {
        $item = new Collection(['id' => 7, 'lang' => 'ja-JP']);

        $routeUri = $this->createMock(RouteUri::class);
        $routeUri->expects($this->once())
            ->method('var')
            ->with('id', 7)
            ->willReturnSelf();

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('article_edit')
            ->willReturn($routeUri);
        $redirected = $this->createStub(ResponseInterface::class);
        $nav->expects($this->once())
            ->method('redirect')
            ->with($routeUri)
            ->willReturn($redirected);

        $metadata = $this->createStub(EntityMetadata::class);
        $metadata->method('getMainKey')->willReturn('id');

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('getEntityMetadata')
            ->with('articles')
            ->willReturn($metadata);
        $orm->expects($this->once())
            ->method('findOne')
            ->with('articles', 7, Collection::class)
            ->willReturn($item);
        $orm->expects($this->once())
            ->method('toCollection')
            ->with($item)
            ->willReturn($item);

        $middleware = $this->createMiddleware(orm: $orm, nav: $nav);

        $result = $middleware->run(
            $this->createRequest([
                'lang_assoc' => [
                    'task' => 'switch',
                    'table' => 'articles',
                    'routeName' => 'article_edit',
                    'targetId' => 7,
                ],
            ]),
            $this->createNext($this->createStub(ResponseInterface::class)),
        );

        self::assertSame($redirected, $result);
    }

    #[Test]
    public function refreshDeletesStaleAssociationWhenKeyDiffersFromCode(): void
    {
        $assoc = new Association();
        $assoc->type = 'article';
        $assoc->targetId = 5;
        $assoc->key = 'en-US';

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('findOne')
            ->with(Association::class, ['type' => 'article', 'target_id' => 5])
            ->willReturn($assoc);
        $orm->expects($this->once())
            ->method('deleteBatch')
            ->with(
                Association::class,
                ['type' => 'article', 'target_id' => 5, 'key' => 'en-US'],
            );

        $response = $this->createStub(ResponseInterface::class);

        $result = $this->createMiddleware(orm: $orm)->run(
            $this->createRequest([
                'lang_assoc' => [
                    'task' => 'refresh',
                    'type' => 'article',
                    'code' => 'ja-JP',
                    'currentId' => 5,
                ],
            ]),
            $this->createNext($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function refreshKeepsAssociationWhenKeyMatchesCode(): void
    {
        $assoc = new Association();
        $assoc->type = 'article';
        $assoc->targetId = 5;
        $assoc->key = 'ja-JP';

        $orm = $this->createMock(ORM::class);
        $orm->method('findOne')->willReturn($assoc);
        $orm->expects($this->never())->method('deleteBatch');

        $response = $this->createStub(ResponseInterface::class);

        $result = $this->createMiddleware(orm: $orm)->run(
            $this->createRequest([
                'lang_assoc' => [
                    'task' => 'refresh',
                    'type' => 'article',
                    'code' => 'ja-JP',
                    'currentId' => 5,
                ],
            ]),
            $this->createNext($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function refreshWithoutExistingAssociationDoesNothing(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->method('findOne')->willReturn(null);
        $orm->expects($this->never())->method('deleteBatch');

        $response = $this->createStub(ResponseInterface::class);

        $result = $this->createMiddleware(orm: $orm)->run(
            $this->createRequest([
                'lang_assoc' => [
                    'task' => 'refresh',
                    'type' => 'article',
                    'code' => 'ja-JP',
                    'currentId' => 5,
                ],
            ]),
            $this->createNext($response),
        );

        self::assertSame($response, $result);
    }
}
