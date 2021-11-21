<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\Entity\Page;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Crypt\PseudoCrypt;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Crypt\Password;
use Windwalker\Data\Collection;
use Windwalker\ORM\ORM;

use Windwalker\Utilities\Cache\InstanceCacheTrait;

use function Windwalker\raw;

/**
 * The PageService class.
 */
class PageService
{
    use InstanceCacheTrait;
    use TranslatorTrait;

    public function __construct(protected ApplicationInterface $app, protected ORM $orm)
    {
    }

    /**
     * getAddonType
     *
     * @param  string  $name
     *
     * @return  string|null|AddonType
     */
    public function getAddonType(string $name): ?AddonType
    {
        return $this->getAddonTypes()[$name] ?? null;
    }

    /**
     * getAddonTypes
     *
     * @return  array<AddonType>
     */
    public function getAddonTypes(): array
    {
        return $this->once(
            'addon.types',
            function () {
                $classNames = $this->getAddonClasses();
                $types = [];

                foreach ($classNames as $className) {
                    $type = new AddonType($className);

                    $types[$type->getType()] = $type;
                }

                return $types;
            }
        );
    }

    public function getAddonClasses(): array
    {
        return (array) $this->app->config('pages.addons');
    }

    public function getAvailableExtends(): Collection
    {
        $mapper = $this->orm->mapper(Page::class);

        $extends = $mapper->select(raw('DISTINCT extends'))
            ->where('extends', '!=', '')
            ->order('extends')
            ->loadColumn()
            ->mapWithKeys(fn ($v, $k) => [$v => $v]);

        foreach ($this->app->config('pages.page_extends') ?? [] as $extend => $name) {
            if (is_numeric($extend)) {
                $extend = $name;
            } else {
                $name = $this->trans($name);
            }

            $extends[$extend] = $name;
        }

        $extends->sortKeys();

        return $extends;
    }

    public function genPreviewSecret(string|int $id): string
    {
        $salt = Password::genRandomPassword(4);

        return $salt . '.' .$this->secretHash($salt, $id);
    }

    public function secretVerify(string|int $id, string $secret): bool
    {
        if (!str_contains($secret, '.')) {
            return false;
        }

        [$salt, $hash] = explode('.', $secret, 2);

        return $hash === $this->secretHash($salt, $id);
    }

    protected function secretHash(string $salt, string|int $id): string
    {
        $appSecret = $this->getAppSecret();

        $seed = $appSecret . ':' . $id . ':' . $salt;

        return (new PseudoCrypt())->hash(crc32($seed), 8);
    }

    protected function getAppSecret(): string
    {
        return $this->app->config('app.secret') ?? '';
    }
}
