<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\CloudflareDriver;
use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Http\HttpClient;
use Windwalker\Http\Response\HttpClientResponse;
use Windwalker\Stream\Stream;

#[AllowMockObjectsWithoutExpectations]
class CloudflareDriverTest extends TestCase
{
    private LunaScript $lunaScript;

    protected function setUp(): void
    {
        $this->lunaScript = $this->createMock(LunaScript::class);
        $_POST = [];
    }

    protected function tearDown(): void
    {
        $_POST = [];
    }

    private function jsonResponse(string $body): HttpClientResponse
    {
        $stream = new Stream('php://memory', 'wb+');
        $stream->write($body);
        $stream->rewind();

        return new HttpClientResponse($stream);
    }

    private function createDriver(array $options = []): CloudflareDriver
    {
        return new CloudflareDriver($this->lunaScript, 'site-key', 'secret-key', $options);
    }

    private function injectHttp(CloudflareDriver $driver, HttpClient $http): void
    {
        $property = new ReflectionProperty(CloudflareDriver::class, 'http');
        $property->setValue($driver, $http);
    }

    #[Test]
    public function inputRendersWidgetWithDefaults(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver()->input(['class' => 'my-class']);

        self::assertStringContainsString('class="cf-turnstile my-class"', $html);
        self::assertStringContainsString('data-sitekey="site-key"', $html);
        self::assertStringContainsString('uni-captcha-cloudflare="checkbox"', $html);
        self::assertStringNotContainsString('data-js-verify', $html);
    }

    #[Test]
    public function inputMergesOptionsAndJsVerify(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $driver = $this->createDriver(['theme' => 'dark', 'size' => 'compact']);

        $html = $driver->input([], ['language' => 'en', 'type' => 'invisible', 'js_verify' => true]);

        self::assertStringContainsString('data-theme="dark"', $html);
        self::assertStringContainsString('data-size="compact"', $html);
        self::assertStringContainsString('data-language="en"', $html);
        self::assertStringContainsString('uni-captcha-cloudflare="invisible"', $html);
        self::assertStringContainsString('data-js-verify="1"', $html);
    }

    #[Test]
    public function verifyReturnsFalseWhenTokenMissing(): void
    {
        $http = $this->createMock(HttpClient::class);
        $http->expects(self::never())->method('post');

        $driver = $this->createDriver();
        $this->injectHttp($driver, $http);

        self::assertFalse($driver->verify(''));
        self::assertFalse($driver->verify(null));
    }

    #[Test]
    public function verifyReadsTokenFromPostAndPassesSuccess(): void
    {
        $_POST[CloudflareDriver::RESPONSE_FIELD] = 'token-from-post';

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::once())
            ->method('post')
            ->with(
                CloudflareDriver::VERIFY_URL,
                self::callback(function (string $body): bool {
                    parse_str($body, $data);

                    return $data['secret'] === 'secret-key'
                        && $data['response'] === 'token-from-post'
                        && $data['remoteip'] === '1.2.3.4';
                }),
            )
            ->willReturn($this->jsonResponse('{"success": true}'));

        $driver = $this->createDriver();
        $this->injectHttp($driver, $http);

        self::assertTrue($driver->verify('', ['server' => ['REMOTE_ADDR' => '1.2.3.4']]));
    }

    #[Test]
    public function verifyReturnsFalseWhenCloudflareRejects(): void
    {
        $http = $this->createStub(HttpClient::class);
        $http->method('post')->willReturn($this->jsonResponse('{"success": false}'));

        $driver = $this->createDriver();
        $this->injectHttp($driver, $http);

        self::assertFalse($driver->verify('bad-token'));
    }

    #[Test]
    public function verifyReturnsFalseOnInvalidJson(): void
    {
        $http = $this->createStub(HttpClient::class);
        $http->method('post')->willReturn($this->jsonResponse('not-json'));

        $driver = $this->createDriver();
        $this->injectHttp($driver, $http);

        self::assertFalse($driver->verify('some-token'));
    }
}
