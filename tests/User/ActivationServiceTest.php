<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Firebase\JWT\SignatureInvalidException;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Mailer\Transport\TransportInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Mailer\Mailer;
use Windwalker\Core\Mailer\MailMessage;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\DI\Container;
use Windwalker\ORM\ORM;

class ActivationServiceTest extends TestCase
{
    private function createService(string $secret = 'secret-a'): ActivationService
    {
        $app = $this->createStub(AppContext::class);
        // HS256 requires a key of at least 32 bytes.
        $app->method('getSecret')->willReturn(str_pad($secret, 32, '_'));

        return new ActivationService(
            $this->createStub(UserService::class),
            $app,
            $this->createStub(ORM::class),
            $this->createStub(Navigator::class),
            $this->createStub(RendererService::class),
        );
    }

    #[Test]
    public function tokenRoundTripKeepsDefaultUserInfo(): void
    {
        $service = $this->createService();
        $user = (object) ['id' => 7, 'email' => 'user@example.com'];

        $token = $service->createToken($user);
        $payload = $service->decodeToken($token);

        self::assertSame(['email' => 'user@example.com', 'id' => 7], [
            'email' => $payload['email'],
            'id' => $payload['id'],
        ]);
    }

    #[Test]
    public function sendActivateMailStoresTokenAndSendsRenderedMail(): void
    {
        $user = new User();
        $user->id = 9;
        $user->name = 'Alice';
        $user->email = 'alice@example.com';

        $userService = $this->createStub(UserService::class);
        $userService->method('getUser')->willReturn($user);

        $app = $this->createStub(AppContext::class);
        $app->method('getSecret')->willReturn(str_pad('secret-mail', 32, '_'));
        $app->method('config')->willReturn('');

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('updateOne')
            ->with(User::class, $this->identicalTo($user));

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('toNotifyLink')
            ->with('front::registration_activate', $this->callback(
                fn(array $args): bool => isset($args['token']) && $args['token'] !== ''
            ))
            ->willReturn($this->createStub(RouteUri::class));

        $renderer = $this->createMock(RendererService::class);
        $renderer->expects($this->once())
            ->method('render')
            ->with('mail.registration', $this->callback(
                fn(array $vars): bool => $vars['link'] instanceof RouteUri
            ))
            ->willReturn('<p>mail body</p>');

        $transport = $this->createStub(TransportInterface::class);
        $container = $this->createStub(Container::class);
        $container->method('getParam')->willReturn('noreply@example.com');
        $mailer = new Mailer($transport, $container);

        $app->method('service')->willReturn($mailer);

        $service = new ActivationService($userService, $app, $orm, $nav, $renderer);

        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturn('Activate your account');
        new \ReflectionProperty(ActivationService::class, 'lang')->setValue($service, $lang);

        $sent = $service->sendActivateMail(['id' => 9]);

        $message = $sent->getOriginalMessage();
        self::assertInstanceOf(MailMessage::class, $message);
        self::assertSame('Activate your account', $message->getSubject());
        self::assertSame('alice@example.com', $message->getTo()[0]->getAddress());
        self::assertSame('<p>mail body</p>', $message->getHtmlBody());
        self::assertNotEmpty($user->activation);
        self::assertSame(9, $service->decodeToken($user->activation)['id']);
    }

    #[Test]
    public function createTokenUsesCustomUserInfoGetter(): void
    {
        $service = $this->createService();
        $service->setUserInfoGetter(
            static fn(object $user): array => ['uid' => $user->id]
        );

        $payload = $service->decodeToken($service->createToken((object) ['id' => 3, 'email' => 'x']));

        self::assertSame(3, $payload['uid']);
        self::assertArrayNotHasKey('email', $payload);
    }

    #[Test]
    public function getUserInfoGetterReturnsCustomGetterWhenSet(): void
    {
        $service = $this->createService();
        $getter = static fn(object $user): array => ['custom' => true];

        $service->setUserInfoGetter($getter);

        self::assertSame($getter, $service->getUserInfoGetter());
    }

    #[Test]
    public function decodeTokenRejectsTokenSignedWithOtherSecret(): void
    {
        $token = $this->createService('secret-a')
            ->createToken((object) ['id' => 1, 'email' => 'a@example.com']);

        $this->expectException(SignatureInvalidException::class);

        $this->createService('secret-b')->decodeToken($token);
    }
}
