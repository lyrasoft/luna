<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\RecaptchaEnterpriseDriver;
use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Http\HttpClient;
use Windwalker\Http\Response\HttpClientResponse;
use Windwalker\Stream\Stream;

#[AllowMockObjectsWithoutExpectations]
class RecaptchaEnterpriseDriverTest extends TestCase
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

    private function createDriver(string $type = 'checkbox', array $options = []): RecaptchaEnterpriseDriver
    {
        return new RecaptchaEnterpriseDriver(
            $this->lunaScript,
            '6LcNewKeyFormat',
            'my-project',
            'api-key',
            $type,
            $options,
        );
    }

    /**
     * @return  array{0: HttpClient, 1: \ArrayObject<int, array{url: string, body: string, options: mixed}>}
     */
    private function injectHttp(RecaptchaEnterpriseDriver $driver, int $status, array $result): \ArrayObject
    {
        $calls = new \ArrayObject();

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::once())
            ->method('post')
            ->willReturnCallback(
                function (string $url, string $body, array $options) use ($calls, $status, $result) {
                    $calls[] = ['url' => $url, 'body' => $body, 'options' => $options];

                    $stream = new Stream('php://memory', Stream::MODE_READ_WRITE_RESET);
                    $stream->write(json_encode($result));

                    return new HttpClientResponse($stream, $status);
                }
            );

        $property = new ReflectionProperty(RecaptchaEnterpriseDriver::class, 'http');
        $property->setValue($driver, $http);

        return $calls;
    }

    #[Test]
    public function inputRendersEnterpriseWidget(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver()->input([], ['js_verify' => false]);

        self::assertStringContainsString('class="g-recaptcha"', $html);
        self::assertStringContainsString('data-sitekey="6LcNewKeyFormat"', $html);
        self::assertStringContainsString('uni-captcha-recaptcha-enterprise="checkbox"', $html);
        self::assertStringNotContainsString('data-size', $html);
        self::assertStringNotContainsString('data-callback', $html);
    }

    #[Test]
    public function inputInvisibleAddsSizeAndCallback(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver('invisible')->input([], ['js_verify' => false]);

        self::assertStringContainsString('data-size="invisible"', $html);
        self::assertStringContainsString('data-callback="recaptchaEnterpriseCallback_', $html);
        self::assertStringContainsString('uni-captcha-recaptcha-enterprise="invisible"', $html);
    }

    #[Test]
    public function verifySucceedsWithValidTokenAndHighScore(): void
    {
        $_POST['g-recaptcha-response'] = 'token-123';

        $driver = $this->createDriver();
        $calls = $this->injectHttp($driver, 200, [
            'tokenProperties' => ['valid' => true, 'action' => ''],
            'riskAnalysis' => ['score' => 0.9],
        ]);

        self::assertTrue($driver->verify(null));

        $body = json_decode($calls[0]['body'], true);
        self::assertSame('token-123', $body['event']['token']);
        self::assertSame('6LcNewKeyFormat', $body['event']['siteKey']);
        self::assertStringContainsString('/projects/my-project/assessments?key=api-key', $calls[0]['url']);
    }

    #[Test]
    public function verifyFailsWhenTokenInvalid(): void
    {
        $_POST['g-recaptcha-response'] = 'token-123';

        $driver = $this->createDriver();
        $this->injectHttp($driver, 200, [
            'tokenProperties' => ['valid' => false, 'invalidReason' => 'EXPIRED'],
        ]);

        self::assertFalse($driver->verify(null));
    }

    #[Test]
    public function verifyFailsWhenScoreBelowThreshold(): void
    {
        $_POST['g-recaptcha-response'] = 'token-123';

        $driver = $this->createDriver();
        $this->injectHttp($driver, 200, [
            'tokenProperties' => ['valid' => true],
            'riskAnalysis' => ['score' => 0.1],
        ]);

        self::assertFalse($driver->verify(null));
    }

    #[Test]
    public function verifyFailsWhenActionMismatch(): void
    {
        $_POST['g-recaptcha-response'] = 'token-123';

        $driver = $this->createDriver();
        $calls = $this->injectHttp($driver, 200, [
            'tokenProperties' => ['valid' => true, 'action' => 'login'],
            'riskAnalysis' => ['score' => 0.9],
        ]);

        self::assertFalse($driver->verify(null, ['action' => 'signup']));

        $body = json_decode($calls[0]['body'], true);
        self::assertSame('signup', $body['event']['expectedAction']);
    }

    #[Test]
    public function verifyFailsOnNonOkResponse(): void
    {
        $_POST['g-recaptcha-response'] = 'token-123';

        $driver = $this->createDriver();
        $this->injectHttp($driver, 403, ['error' => ['message' => 'forbidden']]);

        self::assertFalse($driver->verify(null));
    }

    #[Test]
    public function verifyReturnsFalseWithoutTokenAndSkipsRequest(): void
    {
        $driver = $this->createDriver();

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::never())->method('post');

        $property = new ReflectionProperty(RecaptchaEnterpriseDriver::class, 'http');
        $property->setValue($driver, $http);

        self::assertFalse($driver->verify(''));
    }
}
