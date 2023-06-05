<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Language;

use Lyrasoft\Luna\Entity\Association;
use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Router\Navigator;
use Windwalker\Data\Collection;
use Windwalker\ORM\ORM;

use function Windwalker\collect;
use function Windwalker\Query\val;

/**
 * The LanguageAjaxController class.
 */
#[Controller()]
class LanguageAjaxController
{
    public function handle(AppContext $app): mixed
    {
        $task = $app->input('task');

        return $app->call([$this, $task]);
    }

    public function getAssociations(
        AppContext $app,
        LocaleService $localeService,
        Navigator $nav,
        ORM $orm,
    ): Collection {
        $id = (string) $app->input('id');
        $idName = (string) $app->input('idName');
        $type = (string) $app->input('type');
        $routeName = (string) $app->input('routeName');
        $table = (string) $app->input('table');
        $langField = (string) $app->input('langField');

        $assoc = $orm->findOne(Association::class, ['type' => $type, 'target_id' => $id]);

        if (!$assoc) {
            return collect();
        }

        if (!$routeName) {
            $routeName = $type . '_edit';
        }

        $config = $app->config('luna.i18n.types.' . $type) ?? [];

        $routeCallback = $config['edit_route'] ??
            static function (
                Navigator $nav,
                object $item
            ) use (
                $orm,
                $routeName,
                $idName
            ) {
                $item = $orm->toCollection($item);

                return (string) $nav->to($routeName)->var($idName, $item->$idName);
            };

        $items = $orm->from($table, $type)
            ->leftJoin(
                Association::class,
                'assoc',
                [
                    ['assoc.target_id', '=', $type . '.' . $idName],
                    ['assoc.type', '=', val($type)],
                ]
            )
            ->leftJoin(
                Language::class,
                'lang',
                'lang.code',
                $type . '.' . $langField
            )
            ->where('assoc.hash', $assoc->getHash())
            ->where($type . '.' . $idName, '!=', $id)
            ->groupByJoins()
            ->all(Collection::class);

        foreach ($items as $item) {
            $item->lang->flagClass = $localeService->getFlagIconClass($item->lang->image);

            $entity = $orm->toEntity($table, $item);

            $item->lang->editLink = (string) $app->call($routeCallback, [$nav, $entity]);
        }

        return $items;
    }
}
