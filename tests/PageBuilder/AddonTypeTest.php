<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\PageBuilder;

use Lyrasoft\Luna\PageBuilder\AbstractAddon;
use Lyrasoft\Luna\PageBuilder\AddonType;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Data\Collection;
use Windwalker\Utilities\Contract\LanguageInterface;

class AddonTypeTest extends TestCase
{
    #[Test]
    public function toArrayCollectsAddonMetadata(): void
    {
        $type = new AddonType(AddonTypeFixtureAddon::class);

        $data = $type->toArray($this->createStub(LanguageInterface::class));

        self::assertSame([
            'type' => 'addon-type-fixture',
            'icon' => 'fa-fixture',
            'name' => 'Fixture Name',
            'description' => 'Fixture Desc',
            'componentName' => AddonTypeFixtureAddon::getVueComponentName(),
            'className' => AddonTypeFixtureAddon::class,
        ], $data);
    }

    #[Test]
    public function toJsonEncodesToArray(): void
    {
        $lang = $this->createStub(LanguageInterface::class);
        $type = new AddonType(AddonTypeFixtureAddon::class);

        self::assertSame(
            $type->toArray($lang),
            json_decode($type->toJson($lang), true)
        );
    }
}

class AddonTypeFixtureAddon extends AbstractAddon
{
    protected static ?string $name = 'Fixture Name';

    protected static ?string $description = 'Fixture Desc';

    public static function getType(): string
    {
        return 'addon-type-fixture';
    }

    public static function getIcon(): string
    {
        return 'fa-fixture';
    }

    public static function loadVueComponent(AppContext $app): ?string
    {
        return null;
    }

    protected function prepareData(Collection $data): void {}

    protected function prepareCSS(Collection $content): void {}

    protected function prepareJS(Collection $content): void {}
}
