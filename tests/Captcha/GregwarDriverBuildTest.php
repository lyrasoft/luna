<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Gregwar\Captcha\CaptchaBuilder;
use Lyrasoft\Luna\Captcha\GregwarDriver;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\State\AppState;

#[AllowMockObjectsWithoutExpectations]
class GregwarDriverBuildTest extends TestCase
{
    private AppState $state;

    private RendererService $renderer;

    protected function setUp(): void
    {
        $this->state = $this->createMock(AppState::class);
        $this->renderer = $this->createMock(RendererService::class);
    }

    private function createDriver(array $options = []): GregwarDriver
    {
        return new GregwarDriver($this->state, $this->renderer, $options);
    }

    private function builderWithPhrase(string $phrase): CaptchaBuilder
    {
        $builder = $this->createMock(CaptchaBuilder::class);
        $builder->expects(self::once())->method('build');
        $builder->method('getPhrase')->willReturn($phrase);

        return $builder;
    }

    #[Test]
    public function imageRemembersPhraseAndReturnsImage(): void
    {
        $builder = $this->builderWithPhrase('ABC12');
        $builder->expects(self::once())->method('get')->with(90)->willReturn('image-data');

        $this->state->expects(self::once())
            ->method('remember')
            ->with(
                'captcha',
                self::callback(fn(array $data): bool => $data['phrase'] === 'ABC12' && $data['time'] > 0),
            );

        $driver = $this->createDriver();
        $driver->setBuilder($builder);

        self::assertSame('image-data', $driver->image());
    }

    #[Test]
    public function imageUsesCustomSessionKeyAndQuality(): void
    {
        $builder = $this->builderWithPhrase('XYZ');
        $builder->expects(self::once())->method('get')->with(50)->willReturn('small');

        $this->state->expects(self::once())
            ->method('remember')
            ->with('my_captcha', self::anything());

        $driver = $this->createDriver(['session_key' => 'my_captcha', 'quality' => 50]);
        $driver->setBuilder($builder);

        self::assertSame('small', $driver->image());
    }

    #[Test]
    public function base64ReturnsInlineData(): void
    {
        $builder = $this->builderWithPhrase('Q1');
        $builder->expects(self::once())->method('inline')->with(90)->willReturn('data:image/jpeg;base64,xx');

        $this->state->expects(self::once())->method('remember');

        $driver = $this->createDriver();
        $driver->setBuilder($builder);

        self::assertSame('data:image/jpeg;base64,xx', $driver->base64());
    }

    #[Test]
    public function outputWritesImageToStdout(): void
    {
        $builder = $this->builderWithPhrase('OUT');
        $builder->expects(self::once())->method('output')->with(90);

        $this->state->expects(self::once())->method('remember');

        $driver = $this->createDriver();
        $driver->setBuilder($builder);

        ob_start();
        $driver->output();
        ob_end_clean();
    }

}
