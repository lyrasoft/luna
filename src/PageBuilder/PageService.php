<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\PageBuilder;

use App\Entity\Page;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Crypt\PseudoCrypt;
use Windwalker\Crypt\Password;
use Windwalker\ORM\ORM;

use function Windwalker\raw;

/**
 * The PageService class.
 */
class PageService
{
    public function __construct(protected ApplicationInterface $app, protected ORM $orm)
    {
    }

    public function getAvailableExtends(): array
    {
        $mapper = $this->orm->mapper(Page::class);

        $extends = $mapper->select(raw('DISTINCT extends'))
            ->from(Page::class)
            ->where('extends', '!=', '')
            ->order('extends')
            ->all()
            ->mapWithKeys(fn ($k, $v) => [$v, $v]);

        foreach ($this->app->config('pages.extends') ?? [] as $extend => $name) {
            if (is_numeric($extend)) {
                $extend = $name;
            }

            $extends[$extend] = $name;
        }

        ksort($extends);

        return $extends;
    }

    public function genPreviewSecret(string|int $id): string
    {
        $salt = Password::genRandomPassword(4);

        return $salt . '.' .$this->secretHash($salt, $id);
    }

    public function secretVerify(string|int $id, string $secret): bool
    {
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
