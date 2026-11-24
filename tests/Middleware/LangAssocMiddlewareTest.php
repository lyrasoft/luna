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
use Windwalker\ORM\EntityMapper;
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
    public function createCopiesCurrentItemWithRewrittenTitleAndLanguage(): void
    {
        $copied = (object) ['id' => 9, 'title' => 'Hello (ja-JP)', 'lang' => 'ja-JP'];
        $capturedCopyData = null;

        $mapper = $this->createMock(EntityMapper::class);
        $mapper->expects($this->once())
            ->method('copy')
            ->with(['id' => 5], $this->isInstanceOf(Closure::class))
            ->willReturnCallback(
                function (array $where, Closure $handler) use (&$capturedCopyData, $copied) {
                    $capturedCopyData = $handler(
                        ['title' => 'Hello', 'lang' => 'en-US'],
                        ['id' => 5, 'title' => 'Hello', 'lang' => 'en-US'],
                    );

                    return [$copied];
                }
            );
        $mapper->method('toCollection')->willReturn(new Collection(['id' => 9]));

        $associationService = $this->createMock(AssociationService::class);
        $associationService->method('getRelativeItemsByTargetId')->willReturn([]);
        $associationService->expects($this->once())
            ->method('saveAssociations')
            ->with('article', 'ja-JP', 9, ['en-US' => 5]);

        [$orm, $nav, $app] = $this->createCreateDependencies($mapper, '/article/edit/9');
        $nav->expects($this->once())->method('redirect')->with('/article/edit/9')
            ->willReturn($this->createStub(ResponseInterface::class));

        $this->createMiddleware(
            app: $app,
            associationService: $associationService,
            orm: $orm,
            nav: $nav,
        )->run(
            $this->createRequest([
                'lang_assoc' => $this->createPayload(['copy' => 'current', 'currentId' => 5]),
            ]),
            $this->createNext($this->createStub(ResponseInterface::class)),
        );

        self::assertSame(
            ['title' => 'Hello (ja-JP)', 'lang' => 'ja-JP'],
            $capturedCopyData,
        );
    }

    #[Test]
    public function createWithoutCopyCreatesBlankTranslationAndLinksOriginal(): void
    {
        $original = new Collection(['id' => 3, 'title' => 'Hello', 'lang' => 'en-US']);
        $created = (object) ['id' => 9, 'title' => 'Hello (ja-JP)', 'lang' => 'ja-JP'];

        $mapper = $this->createMock(EntityMapper::class);
        $mapper->expects($this->once())
            ->method('createOne')
            ->with(['title' => 'Hello (ja-JP)', 'lang' => 'ja-JP'])
            ->willReturn($created);
        $mapper->method('toCollection')->willReturn(new Collection(['id' => 9]));

        $orm = $this->createMock(ORM::class);
        $orm->method('mapper')->willReturn($mapper);
        $orm->method('getEntityMetadata')->willReturn($this->createEntityMetadata('id'));
        $orm->expects($this->once())
            ->method('findOne')
            ->with('articles', 3, Collection::class)
            ->willReturn($original);

        $associationService = $this->createMock(AssociationService::class);
        $associationService->method('getRelativeItemsByTargetId')->willReturn([]);
        $associationService->expects($this->once())
            ->method('saveAssociations')
            ->with('article', 'ja-JP', 9, ['en-US' => 3]);

        $app = $this->createStub(AppContext::class);
        $app->method('config')->willReturn(null);
        $app->method('call')->willReturn('/article/edit/9');

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())->method('redirect')->with('/article/edit/9')
            ->willReturn($this->createStub(ResponseInterface::class));

        $this->createMiddleware(
            app: $app,
            associationService: $associationService,
            orm: $orm,
            nav: $nav,
        )->run(
            $this->createRequest([
                'lang_assoc' => $this->createPayload(['copy' => '', 'currentId' => 3]),
            ]),
            $this->createNext($this->createStub(ResponseInterface::class)),
        );
    }

    /**
     * @return  array{ORM, Navigator, AppContext}
     */
    private function createCreateDependencies(EntityMapper $mapper, string $redirectTarget): array
    {
        $orm = $this->createStub(ORM::class);
        $orm->method('mapper')->willReturn($mapper);
        $orm->method('getEntityMetadata')->willReturn($this->createEntityMetadata('id'));

        $app = $this->createStub(AppContext::class);
        $app->method('config')->willReturn(null);
        $app->method('call')->willReturn($redirectTarget);

        $nav = $this->createMock(Navigator::class);

        return [$orm, $nav, $app];
    }

    private function createPayload(array $overrides): array
    {
        return array_merge(
            [
                'task' => 'create',
                'type' => 'article',
                'table' => 'articles',
                'code' => 'ja-JP',
                'defaultId' => 3,
                'langField' => 'lang',
                'titleField' => 'title',
                'routeName' => 'article_edit',
            ],
            $overrides,
        );
    }

    private function createEntityMetadata(string $mainKey): EntityMetadata
    {
        $metadata = $this->createStub(EntityMetadata::class);
        $metadata->method('getMainKey')->willReturn($mainKey);

        return $metadata;
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
