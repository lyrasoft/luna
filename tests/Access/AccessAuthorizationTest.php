<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Access;

use Lyrasoft\Luna\Access\AccessAuthorization;
use Lyrasoft\Luna\Access\AccessService;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Authorization\Authorization;
use Windwalker\Authorization\PolicyInterface;
use Windwalker\Authorization\PolicyProviderInterface;

#[AllowMockObjectsWithoutExpectations]
class AccessAuthorizationTest extends TestCase
{
    private Authorization $authorization;

    private AccessService $accessService;

    private AccessAuthorization $accessAuthorization;

    protected function setUp(): void
    {
        $this->authorization = $this->createMock(Authorization::class);
        $this->accessService = $this->createMock(AccessService::class);

        $this->accessAuthorization = new AccessAuthorization($this->authorization, $this->accessService);
    }

    #[Test]
    public function authorizeUsesRegisteredPolicyWithUserAndArgs(): void
    {
        $policy = $this->createMock(PolicyInterface::class);

        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('edit')
            ->willReturn(true);

        $this->authorization->expects($this->once())
            ->method('getPolicy')
            ->with('edit')
            ->willReturn($policy);

        $policy->expects($this->once())
            ->method('authorize')
            ->with('user1', 42, 'x')
            ->willReturn(true);

        $this->accessService->expects($this->never())->method('check');

        self::assertTrue($this->accessAuthorization->authorize('edit', 'user1', 42, 'x'));
    }

    #[Test]
    public function authorizeReturnsFalseWhenRegisteredPolicyDenies(): void
    {
        $policy = $this->createMock(PolicyInterface::class);

        $this->authorization->method('hasPolicy')->willReturn(true);
        $this->authorization->method('getPolicy')->willReturn($policy);
        $policy->expects($this->once())->method('authorize')->willReturn(false);

        self::assertFalse($this->accessAuthorization->authorize('delete', 'user1'));
    }

    #[Test]
    public function authorizeReturnsFalseWhenPolicyIsMissingEvenIfHasPolicyIsTrue(): void
    {
        $this->authorization->method('hasPolicy')->willReturn(true);
        $this->authorization->method('getPolicy')->willReturn(null);

        $this->accessService->expects($this->never())->method('check');

        self::assertFalse($this->accessAuthorization->authorize('delete', 'user1'));
    }

    #[Test]
    public function authorizeFallsBackToAccessServiceWhenNoPolicy(): void
    {
        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('article.edit')
            ->willReturn(false);

        $this->authorization->expects($this->never())->method('getPolicy');

        $this->accessService->expects($this->once())
            ->method('check')
            ->with('article.edit', 'user1', 'arg1')
            ->willReturn(true);

        self::assertTrue($this->accessAuthorization->authorize('article.edit', 'user1', 'arg1'));
    }

    #[Test]
    public function authorizeAcceptsUnitEnumPolicy(): void
    {
        $action = AccessActionForTest::Edit;

        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with($action)
            ->willReturn(false);

        $this->accessService->expects($this->once())
            ->method('check')
            ->with($action, 'user1')
            ->willReturn(false);

        self::assertFalse($this->accessAuthorization->authorize($action, 'user1'));
    }

    #[Test]
    public function addPolicyDelegatesAndReturnsSelf(): void
    {
        $handler = static fn(mixed $user): bool => true;

        $this->authorization->expects($this->once())
            ->method('addPolicy')
            ->with('edit', $handler);

        self::assertSame(
            $this->accessAuthorization,
            $this->accessAuthorization->addPolicy('edit', $handler)
        );
    }

    #[Test]
    public function hasPolicyDelegatesToAuthorization(): void
    {
        $this->authorization->expects($this->once())
            ->method('hasPolicy')
            ->with('edit')
            ->willReturn(true);

        self::assertTrue($this->accessAuthorization->hasPolicy('edit'));
    }

    #[Test]
    public function registerPolicyProviderDelegatesAndReturnsSelf(): void
    {
        $provider = $this->createMock(PolicyProviderInterface::class);

        $this->authorization->expects($this->once())
            ->method('registerPolicyProvider')
            ->with($provider);

        self::assertSame(
            $this->accessAuthorization,
            $this->accessAuthorization->registerPolicyProvider($provider)
        );
    }

    #[Test]
    public function getAuthorizationReturnsInjectedInstance(): void
    {
        self::assertSame($this->authorization, $this->accessAuthorization->getAuthorization());
    }

    #[Test]
    public function setAuthorizationReplacesInstanceAndReturnsSelf(): void
    {
        $other = $this->createMock(Authorization::class);

        self::assertSame($this->accessAuthorization, $this->accessAuthorization->setAuthorization($other));
        self::assertSame($other, $this->accessAuthorization->getAuthorization());
    }
}

enum AccessActionForTest: string
{
    case Edit = 'edit';
}
