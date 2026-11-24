<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\User\Handler\UserHandler;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\Session\Session;

class UserHandlerTest extends TestCase
{
    private function createHandler(
        Session $session,
        ?EntityMapper $mapper = null,
        ?RememberMeService $rememberMeService = null,
    ): UserHandler {
        $app = $this->createStub(AppContext::class);

        $orm = $this->createStub(ORM::class);
        $orm->method('mapper')->willReturn($mapper ?? $this->createStub(EntityMapper::class));

        $rememberMeService ??= $this->createStub(RememberMeService::class);

        return new class ($app, $session, $orm, [], $rememberMeService) extends UserHandler {
            public function __construct(
                AppContext $app,
                Session $session,
                ORM $orm,
                array $config,
                private RememberMeService $rememberMe,
            ) {
                parent::__construct($app, $session, $orm, $config);
            }

            public function getRememberMeService(): RememberMeService
            {
                return $this->rememberMe;
            }
        };
    }

    #[Test]
    public function loginWithEntityStoresItsIdInSession()
    {
        $session = $this->createMock(Session::class);
        $session->method('getId')->willReturn('sess-1');
        $session->expects($this->once())
            ->method('set')
            ->with('login_user_id', 7);

        $user = new User();
        $user->id = 7;

        $handler = $this->createHandler($session);

        self::assertTrue($handler->login($user));
    }

    #[Test]
    public function loginWithArrayUsesMainKeyFromMapper()
    {
        $session = $this->createMock(Session::class);
        $session->method('getId')->willReturn('sess-1');
        $session->expects($this->once())
            ->method('set')
            ->with('login_user_id', 9);

        $mapper = $this->createStub(EntityMapper::class);
        $mapper->method('getMainKey')->willReturn('id');
        $mapper->method('toCollection')->willReturn(new Collection(['id' => 9, 'username' => 'bob']));

        $handler = $this->createHandler($session, $mapper);

        self::assertTrue($handler->login(['id' => 9, 'username' => 'bob']));
    }

    #[Test]
    public function logoutDestroysSessionAndForgetsRememberToken()
    {
        $session = $this->createMock(Session::class);
        $session->expects($this->once())->method('start');
        $session->expects($this->once())->method('destroy');
        $session->expects($this->once())
            ->method('regenerate')
            ->with(false, false);

        $rememberMeService = $this->createMock(RememberMeService::class);
        $rememberMeService->expects($this->once())->method('forget');

        $handler = $this->createHandler($session, rememberMeService: $rememberMeService);

        self::assertTrue($handler->logout());
    }

    #[Test]
    public function getLoginUserIdReturnsSessionValueWithoutCheckingRememberToken()
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturn(5);

        $rememberMeService = $this->createMock(RememberMeService::class);
        $rememberMeService->expects($this->never())->method('getRenewableTokenItem');

        $handler = $this->createHandler($session, rememberMeService: $rememberMeService);

        self::assertSame(5, $handler->getLoginUserId());
    }

    #[Test]
    public function getLoginUserIdRestoresSessionFromRememberToken()
    {
        $session = $this->createMock(Session::class);
        $session->method('get')->willReturn(null);
        $session->method('getId')->willReturn('sess-new');
        $session->expects($this->once())
            ->method('set')
            ->with('login_user_id', 11);

        $token = new RememberToken();
        $token->userId = 11;

        $renewArgs = [];
        $rememberMeService = $this->createMock(RememberMeService::class);
        $rememberMeService->method('getRenewableTokenItem')->willReturn($token);
        $rememberMeService->expects($this->once())
            ->method('renew')
            ->willReturnCallback(function (RememberToken $t, $expires = null, ?string $sessId = null) use (&$renewArgs) {
                $renewArgs = ['token' => $t, 'sessId' => $sessId];

                return 'renewed-token';
            });

        $handler = $this->createHandler($session, rememberMeService: $rememberMeService);

        self::assertSame(11, $handler->getLoginUserId());
        self::assertSame($token, $renewArgs['token']);
        self::assertSame('sess-new', $renewArgs['sessId']);
    }

    #[Test]
    public function getLoginUserIdReturnsNullWhenNoSessionAndNoRememberToken()
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturn(null);

        $rememberMeService = $this->createStub(RememberMeService::class);
        $rememberMeService->method('getRenewableTokenItem')->willReturn(null);

        $handler = $this->createHandler($session, rememberMeService: $rememberMeService);

        self::assertNull($handler->getLoginUserId());
    }

    #[Test]
    public function loadReturnsNullForGuest()
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturn(null);

        $mapper = $this->createMock(EntityMapper::class);
        $mapper->expects($this->never())->method('findOne');

        $handler = $this->createHandler($session, $mapper);

        self::assertNull($handler->load());
    }

    #[Test]
    public function loadPassesEmailThroughAsciiNormalization()
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturn(null);

        $mapper = $this->createMock(EntityMapper::class);
        $mapper->expects($this->once())
            ->method('findOne')
            ->willReturnCallback(function (array $conditions) {
                self::assertSame('alice@example.com', $conditions['email']);

                return null;
            });

        $handler = $this->createHandler($session, $mapper);

        self::assertNull($handler->load(['email' => 'alice@example.com']));
    }

    #[Test]
    public function loadCurrentLoginUserRemovesPasswordBeforeCreatingEntity()
    {
        $session = $this->createStub(Session::class);

        $mapper = $this->createMock(EntityMapper::class);
        $mapper->method('getMainKey')->willReturn('id');
        $mapper->method('findOne')
            ->willReturn(new Collection(['id' => 5, 'username' => 'carol', 'password' => 'hash']));
        $mapper->expects($this->once())
            ->method('toEntity')
            ->willReturnCallback(function (array $data) {
                self::assertArrayNotHasKey('password', $data);
                self::assertSame('carol', $data['username']);

                $user = new User();
                $user->id = 5;

                return $user;
            });

        $handler = $this->createHandler($session, $mapper);

        $user = $handler->loadCurrentLoginUser(5);

        self::assertInstanceOf(User::class, $user);
        self::assertSame(5, $user->id);
    }
}
