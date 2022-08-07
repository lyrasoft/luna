<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Closure;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\Services\AssociationService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Middleware\AttributeMiddlewareTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Data\Collection;
use Windwalker\ORM\ORM;

/**
 * The LangAssocMiddleware class.
 */
class LangAssocMiddleware implements MiddlewareInterface
{
    use LocaleAwareTrait;
    use AttributeMiddlewareTrait;

    public function __construct(
        protected AppContext $app,
        protected AssociationService $associationService,
        protected ORM $orm,
        protected Navigator $nav,
        protected string $inputName = 'lang_assoc',
    ) {
        //
    }

    public function run(ServerRequestInterface $request, Closure $next): ResponseInterface
    {
        $res = $next($request);

        if (!$this->isLocaleEnabled()) {
            return $res;
        }

        $data = $request->getParsedBody()[$this->inputName] ?? null;

        $task = $data['task'] ?? '';

        if ($task === 'create') {
            return $this->createNew($data);
        }

        if ($task === 'switch') {
            return $this->switch($data);
        }

        return $res;
    }

    protected function createNew(array $data): ResponseInterface
    {
        [
            'type' => $type,
            'table' => $table,
            'code' => $code,
            'copy' => $copy,
            'currentId' => $currentId,
            'defaultId' => $defaultId,
            'langField' => $langField,
            'titleField' => $titleField,
            'routeName' => $routeName,
        ] = $data;

        $mapper = $this->orm->mapper($table);
        $metadata = $this->orm->getEntityMetadata($table);
        $idName = $metadata->getMainKey();

        $associations = $this->associationService->getRelativeItemsByTargetId($type, $currentId);

        $assoc = [];

        foreach ($associations as $association) {
            $assoc[$association->getKey()] = $association->getTargetId();
        }

        $handleCopyData = function (
            array $data,
            array $oldData
        ) use (
            $idName,
            $langField,
            $code,
            $titleField,
            &$assoc
        ) {
            if (isset($data[$titleField], $oldData[$titleField])) {
                $data[$titleField] = $oldData[$titleField] . ' (' . $code . ')';
            }

            $data[$langField] = $code;

            $assoc[$oldData[$langField]] = $oldData[$idName];

            return $data;
        };

        if ($copy === 'current') {
            $new = $mapper->copy([$idName => $currentId], $handleCopyData)[0];
        } elseif ($copy === 'default') {
            $new = $mapper->copy([$idName => $defaultId], $handleCopyData)[0];
        } else {
            $old = $this->orm->findOne($table, $currentId ?: $defaultId, Collection::class);
            $new = $mapper->createOne(
                [
                    $titleField => $old?->$titleField . ' (' . $code . ')',
                    $langField => $code
                ]
            );
            $assoc[$old?->$langField] = $old?->$idName;
        }

        $newCollection = $mapper->toCollection($new);

        $this->associationService->saveAssociations(
            $type,
            $code,
            $newCollection?->$idName,
            $assoc
        );

        $config = $this->app->config('luna.i18n.types.' . $type) ?? [];

        $routeCallback = $config['edit_route'] ??
            function (
                Navigator $nav,
                object $item
            ) use (
                $routeName,
                $idName
            ) {
                $item = $this->orm->toCollection($item);

                return (string) $nav->to($routeName)->var($idName, $item?->$idName);
            };

        return $this->nav->redirect(
            $this->app->call($routeCallback, [$this->nav, $new])
        );
    }

    protected function switch(array $data): ResponseInterface
    {
        [
            'table' => $table,
            'routeName' => $routeName,
            'targetId' => $targetId,
        ] = $data;

        $metadata = $this->orm->getEntityMetadata($table);
        $idName = $metadata->getMainKey();
        $item = $this->orm->findOne($table, $targetId, Collection::class);

        $routeCallback = $this->routeCallback ?? function (Navigator $nav, object $item) use ($idName, $routeName) {
            $item = $this->orm->toCollection($item);

            return $this->nav->to($routeName)->var($idName, $item?->$idName);
        };

        return $this->nav->redirect($routeCallback($this->nav, $item));
    }
}
