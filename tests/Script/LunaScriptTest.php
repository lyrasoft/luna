<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Script;

use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AssetService;

class LunaScriptTest extends TestCase
{
    private function createScript(AssetService $asset, UnicornScript $unicornScript): LunaScript
    {
        $script = new LunaScript($unicornScript);

        $prop = new ReflectionProperty($script, 'asset');
        $prop->setValue($script, $asset);

        return $script;
    }

    private function createUnicornScript(bool $next): UnicornScript
    {
        $unicornScript = $this->createStub(UnicornScript::class);
        $unicornScript->next = $next;

        return $unicornScript;
    }

    #[Test]
    public function captchaUsesUnicornModuleWhenNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = true;
        $unicornScript->expects($this->once())
            ->method('translate')
            ->with('luna.field.captcha.message.please.check.first')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with('u.$luna.useCaptcha()')
            ->willReturnSelf();

        $this->createScript($this->createStub(AssetService::class), $unicornScript)->captcha();
    }

    #[Test]
    public function captchaImportsFileWhenNotNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = false;
        $unicornScript->expects($this->once())
            ->method('translate')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with("u.import('@luna/dist/captcha.js')")
            ->willReturnSelf();

        $this->createScript($this->createStub(AssetService::class), $unicornScript)->captcha();
    }

    #[Test]
    public function captchaRunsOnlyOnce(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = false;
        $unicornScript->expects($this->once())
            ->method('translate')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->willReturnSelf();

        $script = $this->createScript($this->createStub(AssetService::class), $unicornScript);
        $script->captcha();
        $script->captcha();
    }

    #[Test]
    public function flagIconLoadsCss(): void
    {
        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('css')
            ->with('@luna/dist/flag-icon.css');

        $this->createScript($asset, $this->createStub(UnicornScript::class))->flagIcon();
    }

    #[Test]
    public function accountCheckAddsRouteAndUsesModuleWhenNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = true;
        $unicornScript->expects($this->once())
            ->method('translate')
            ->with('luna.message.user.account.exists')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('addRoute')
            ->with('@account_check')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with('u.$luna.useAccountCheck()')
            ->willReturnSelf();

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->never())
            ->method('js');

        $this->createScript($asset, $unicornScript)->accountCheck();
    }

    #[Test]
    public function accountCheckLoadsScriptWhenNotNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = false;
        $unicornScript->expects($this->once())
            ->method('translate')
            ->willReturnSelf();
        $unicornScript->expects($this->once())
            ->method('addRoute')
            ->willReturnSelf();
        $unicornScript->expects($this->never())
            ->method('importMainThen');

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('js')
            ->with('@luna/dist/account-check.js');

        $this->createScript($asset, $unicornScript)->accountCheck();
    }

    #[Test]
    public function langDropdownUsesModuleWhenNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = true;
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with('u.$luna.useLangDropdown()')
            ->willReturnSelf();

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->never())
            ->method('js');

        $this->createScript($asset, $unicornScript)->langDropdown();
    }

    #[Test]
    public function langDropdownLoadsScriptWhenNotNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = false;
        $unicornScript->expects($this->never())
            ->method('importMainThen');

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('js')
            ->with('@vendor/lyrasoft/luna/dist/lang-dropdown.js');

        $this->createScript($asset, $unicornScript)->langDropdown();
    }

    #[Test]
    public function localeSwitchUsesModuleWhenNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = true;
        $unicornScript->expects($this->once())
            ->method('importMainThen')
            ->with('u.$luna.useLocaleSwitch()')
            ->willReturnSelf();

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->never())
            ->method('js');

        $this->createScript($asset, $unicornScript)->localeSwitch();
    }

    #[Test]
    public function localeSwitchLoadsScriptWhenNotNext(): void
    {
        $unicornScript = $this->createMock(UnicornScript::class);
        $unicornScript->next = false;
        $unicornScript->expects($this->never())
            ->method('importMainThen');

        $asset = $this->createMock(AssetService::class);
        $asset->expects($this->once())
            ->method('js')
            ->with('@vendor/lyrasoft/luna/dist/locale-switch.js');

        $this->createScript($asset, $unicornScript)->localeSwitch();
    }
}
