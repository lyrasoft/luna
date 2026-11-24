<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Subscriber\AdminSessionSubscriber;
use Psr\Http\Message\ServerRequestInterface;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Events\Web\AfterRoutingEvent;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\SystemUri;
use Windwalker\DI\Container;
use Windwalker\Session\Session;

class AdminSessionSubscriberTest extends TestCase
{
    protected function tearDown(): void
    {
        putenv('ADMIN_SESS_NAME');
        putenv('ADMIN_REMEMBER_TOKEN_NAME');
        unset($_ENV['ADMIN_SESS_NAME'], $_ENV['ADMIN_REMEMBER_TOKEN_NAME']);

        parent::tearDown();
    }

    private function createEvent(string $namespace): AfterRoutingEvent
    {
        $matched = $this->createStub(Route::class);
        $matched->method('getExtraValue')->willReturnCallback(
            static fn (string $key) => $key === 'namespace' ? $namespace : null
        );

        return new AfterRoutingEvent(
            $this->createStub(SystemUri::class),
            $this->createStub(ServerRequestInterface::class),
            'route',
            $matched,
        );
    }

    /**
     * @return array{0: Container, 1: Container}  [child, parent]
     */
    private function createContainers(?Session $session): array
    {
        $parent = new Container();
        $child = new Container($parent);

        if ($session !== null) {
            $child->set(Session::class, $session);
        }

        return [$child, $parent];
    }

    #[Test]
    public function adminNamespaceRenamesSessionAndRememberCookie(): void
    {
        $session = $this->createMock(Session::class);
        $session->expects(self::once())
            ->method('setName')
            ->with('WINDWALKER_ADMIN_SESSID');

        [$child, $parent] = $this->createContainers($session);

        (new AdminSessionSubscriber($child))->afterRouting($this->createEvent('admin'));

        self::assertSame(
            'WINDWALKER_ADMIN_REMEMBER',
            $parent->getParameters()->getDeep('user.remember.cookie_name')
        );
    }

    #[Test]
    public function nonAdminNamespaceLeavesSessionUntouched(): void
    {
        $session = $this->createMock(Session::class);
        $session->expects(self::never())->method('setName');

        [$child, $parent] = $this->createContainers($session);

        (new AdminSessionSubscriber($child))->afterRouting($this->createEvent('front'));

        self::assertNull($parent->getParameters()->getDeep('user.remember.cookie_name'));
    }

    #[Test]
    public function missingSessionServiceReturnsEarly(): void
    {
        [$child, $parent] = $this->createContainers(null);

        (new AdminSessionSubscriber($child))->afterRouting($this->createEvent('admin'));

        self::assertNull($parent->getParameters()->getDeep('user.remember.cookie_name'));
    }

    #[Test]
    public function envVariablesOverrideDefaultNames(): void
    {
        putenv('ADMIN_SESS_NAME=CUSTOM_SESS');
        putenv('ADMIN_REMEMBER_TOKEN_NAME=CUSTOM_REMEMBER');
        $_ENV['ADMIN_SESS_NAME'] = 'CUSTOM_SESS';
        $_ENV['ADMIN_REMEMBER_TOKEN_NAME'] = 'CUSTOM_REMEMBER';

        $session = $this->createMock(Session::class);
        $session->expects(self::once())
            ->method('setName')
            ->with('CUSTOM_SESS');

        [$child, $parent] = $this->createContainers($session);

        (new AdminSessionSubscriber($child))->afterRouting($this->createEvent('admin'));

        self::assertSame(
            'CUSTOM_REMEMBER',
            $parent->getParameters()->getDeep('user.remember.cookie_name')
        );
    }
}
