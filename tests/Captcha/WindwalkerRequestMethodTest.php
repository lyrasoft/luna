<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\Recaptcha\WindwalkerRequestMethod;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestParameters;
use Windwalker\Http\HttpClient;
use Windwalker\Http\Response\HttpClientResponse;
use Windwalker\Stream\Stream;

#[AllowMockObjectsWithoutExpectations]
class WindwalkerRequestMethodTest extends TestCase
{
    private function response(string $body, int $status): HttpClientResponse
    {
        $stream = new Stream('php://memory', 'wb+');
        $stream->write($body);
        $stream->rewind();

        return new HttpClientResponse($stream, $status);
    }

    #[Test]
    public function submitReturnsBodyOnSuccessStatus(): void
    {
        $params = new RequestParameters('secret-key', 'code-123', '1.2.3.4');

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::once())
            ->method('post')
            ->with(ReCaptcha::SITE_VERIFY_URL, $params->toQueryString())
            ->willReturn($this->response('{"success": true}', 200));

        $method = new WindwalkerRequestMethod($http);

        self::assertSame('{"success": true}', $method->submit($params));
    }

    #[Test]
    public function submitReturnsConnectionFailedOnErrorStatus(): void
    {
        $params = new RequestParameters('secret-key', 'code-123');

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::once())
            ->method('post')
            ->willReturn($this->response('server error', 500));

        $method = new WindwalkerRequestMethod($http);
        $result = json_decode($method->submit($params), true);

        self::assertFalse($result['success']);
        self::assertSame([ReCaptcha::E_CONNECTION_FAILED], $result['error-codes']);
    }

    #[Test]
    public function submitUsesCustomUrl(): void
    {
        $params = new RequestParameters('secret-key', 'code-123');

        $http = $this->createMock(HttpClient::class);
        $http->expects(self::once())
            ->method('post')
            ->with('https://example.test/verify', $params->toQueryString())
            ->willReturn($this->response('{"success": true}', 200));

        $method = new WindwalkerRequestMethod($http, 'https://example.test/verify');

        self::assertSame('{"success": true}', $method->submit($params));
    }
}
