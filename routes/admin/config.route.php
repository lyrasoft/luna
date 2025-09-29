<?php

namespace App\Routes;

use Lyrasoft\Luna\Module\Admin\Config\ConfigController;
use Lyrasoft\Luna\Module\Admin\Config\ConfigEditView;
use Lyrasoft\Luna\Module\Admin\Config\Form\CoreForm;
use Unicorn\Controller\S3MultipartUploadController;
use Windwalker\Core\Router\RouteCreator;

/** @var RouteCreator $router */

$router->group('config')
    ->register(
        function (RouteCreator $router) {
            $router->any('config_core', '/config/core')
                ->controller(ConfigController::class)
                ->view(ConfigEditView::class)
                ->var('type', 'core')
                ->var('form', CoreForm::class);

            $router->any('config_ajax', '/config/ajax[/{task}]')
                ->controller(ConfigController::class, 'ajax');

            $router->any('config_upload', '/config/upload[/{task}]')
                ->controller(S3MultipartUploadController::class, 'ajax');
        }
    );
