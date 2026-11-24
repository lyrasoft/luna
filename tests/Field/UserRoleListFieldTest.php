<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Field\UserRoleListField;
use Lyrasoft\Luna\Tree\Node;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Utilities\Contract\LanguageInterface;
use Windwalker\Utilities\Enum\EnumTranslatableInterface;
use Windwalker\Utilities\Enum\EnumTranslatableTrait;

/**
 * Test-only translatable enum used as a selectable role source by UserRoleListFieldTest. Its backing value is
 * unwrapped as the option value. Remove together with the enum-related test in UserRoleListFieldTest.
 */
enum UserRoleListFieldTestRole: string implements EnumTranslatableInterface
{
    use EnumTranslatableTrait;

    case Editor = 'editor';

    public function trans(LanguageInterface $lang, ...$args): string
    {
        return $this->name;
    }
}

class UserRoleListFieldTest extends TestCase
{
    #[Test]
    public function selectableRolesUseKeysAsValuesAndTextsAsLabels(): void
    {
        $service = $this->createAccessService(
            selectable: ['editor' => 'Editor', 'viewer' => 'Viewer'],
        );

        self::assertSame(
            [['editor', 'Editor'], ['viewer', 'Viewer']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function listStyleSelectableRolesUseValueAsRoleNameAndWrappedRoleTitleAsLabel(): void
    {
        $service = $this->createAccessService(
            selectable: ['admin', 'editor'],
            wrapped: [
                'admin' => $this->makeRole(1, 'Administrator'),
                'editor' => null,
            ],
        );

        self::assertSame(
            [['admin', 'Administrator'], ['editor', 'editor']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function translatableEnumSelectableRoleUsesEnumValueAsOptionValue(): void
    {
        $service = $this->createAccessService(
            selectable: ['ignored-key' => UserRoleListFieldTestRole::Editor],
            wrapped: [
                'editor' => $this->makeRole(5, 'Editor Role'),
            ],
        );

        self::assertSame(
            [['editor', 'Editor Role']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function superUserOnlyRolesAreHiddenFromNonSuperUsers(): void
    {
        $service = $this->createAccessService(
            selectable: ['root' => 'Root', 'editor' => 'Editor'],
            superUser: false,
            superUserRoles: ['root'],
        );

        self::assertSame(
            [['editor', 'Editor']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function superUserOnlyRolesAreShownToSuperUsers(): void
    {
        $service = $this->createAccessService(
            selectable: ['root' => 'Root', 'editor' => 'Editor'],
            superUser: true,
            superUserRoles: ['root'],
        );

        self::assertSame(
            [['root', 'Root'], ['editor', 'Editor']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function dbRolesAreNotLoadedWhenDisabledByConfig(): void
    {
        $service = $this->createMock(AccessService::class);
        $service->method('getSelectableRoles')->willReturn(['editor' => 'Editor']);
        $service->method('isSuperUser')->willReturn(false);
        $service->method('isDbRolesEnabled')->willReturn(false);
        $service->expects($this->never())->method('loadDBRoles');

        self::assertSame(
            [['editor', 'Editor']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function dbRolesAreAppendedAfterSelectableRolesWhenEnabledByConfig(): void
    {
        $service = $this->createAccessService(
            selectable: ['editor' => 'Editor'],
            dbRoles: [
                $this->makeRole(3, 'Manager'),
                $this->makeRole(7, 'Writer'),
            ],
            dbEnabled: true,
        );

        self::assertSame(
            [['editor', 'Editor'], ['3', 'Manager'], ['7', 'Writer']],
            $this->readOptions($this->createField($service)),
        );
    }

    #[Test]
    public function loadDbRolesTrueOverridesDisabledConfig(): void
    {
        $service = $this->createAccessService(
            selectable: [],
            dbRoles: [$this->makeRole(4, 'Forced')],
            dbEnabled: false,
        );

        $field = $this->createField($service)->loadDbRoles(true);

        self::assertSame([['4', 'Forced']], $this->readOptions($field));
    }

    #[Test]
    public function loadDbRolesFalseOverridesEnabledConfig(): void
    {
        $service = $this->createAccessService(
            selectable: ['editor' => 'Editor'],
            dbRoles: [$this->makeRole(4, 'Hidden')],
            dbEnabled: true,
        );

        $field = $this->createField($service)->loadDbRoles(false);

        self::assertSame([['editor', 'Editor']], $this->readOptions($field));
    }

    #[Test]
    public function publishedOnlyExcludesUnpublishedDbRoles(): void
    {
        $service = $this->createAccessService(
            selectable: [],
            dbRoles: [
                $this->makeRole(1, 'Active', BasicState::PUBLISHED),
                $this->makeRole(2, 'Retired', BasicState::UNPUBLISHED),
            ],
            dbEnabled: true,
        );

        $field = $this->createField($service)->publishedOnly(true);

        self::assertSame([['1', 'Active']], $this->readOptions($field));
    }

    #[Test]
    public function unpublishedDbRolesAreIncludedWhenPublishedOnlyIsOff(): void
    {
        $service = $this->createAccessService(
            selectable: [],
            dbRoles: [
                $this->makeRole(1, 'Active', BasicState::PUBLISHED),
                $this->makeRole(2, 'Retired', BasicState::UNPUBLISHED),
            ],
            dbEnabled: true,
        );

        $field = $this->createField($service)->publishedOnly(false);

        self::assertSame(
            [['1', 'Active'], ['2', 'Retired']],
            $this->readOptions($field),
        );
    }

    /**
     * @param  array<int|string, mixed>      $selectable
     * @param  array<string, UserRole|null>  $wrapped         Map of role value to wrapUserRole() result.
     * @param  string[]                      $superUserRoles  Role values that count as super user roles.
     * @param  UserRole[]                    $dbRoles
     */
    private function createAccessService(
        array $selectable = [],
        array $wrapped = [],
        bool $superUser = false,
        array $superUserRoles = [],
        array $dbRoles = [],
        bool $dbEnabled = false,
    ): AccessService {
        $service = $this->createStub(AccessService::class);
        $service->method('getSelectableRoles')->willReturn($selectable);
        $service->method('isSuperUser')->willReturn($superUser);
        $service->method('isSuperUserRole')->willReturnCallback(
            fn(mixed $role): bool => in_array($role, $superUserRoles, true)
        );
        $service->method('wrapUserRole')->willReturnCallback(
            fn(mixed $role): ?UserRole => $wrapped[$role] ?? null
        );
        $service->method('isDbRolesEnabled')->willReturn($dbEnabled);

        $children = array_map(
            static fn(UserRole $role): Node => new Node($role),
            $dbRoles,
        );
        $service->method('loadDBRoles')->willReturn(new Node(null, $children));

        return $service;
    }

    private function createField(AccessService $service): UserRoleListField
    {
        $field = new UserRoleListField('roles', 'Roles');

        $property = new \ReflectionProperty(UserRoleListField::class, 'accessService');
        $property->setValue($field, $service);

        return $field;
    }

    /**
     * @return  array<int, array{0: string, 1: string}>
     */
    private function readOptions(UserRoleListField $field): array
    {
        return array_map(
            static fn($option): array => [(string) $option['value'], $option->textContent],
            $field->getOptions(),
        );
    }

    private function makeRole(int $id, string $title, BasicState $state = BasicState::PUBLISHED): UserRole
    {
        $role = new UserRole();
        $role->id = $id;
        $role->title = $title;
        $role->state = $state;

        return $role;
    }
}
