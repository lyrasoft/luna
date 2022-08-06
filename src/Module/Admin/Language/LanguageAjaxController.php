<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Language;

use Lyrasoft\Luna\Module\Admin\Language\Form\EditForm;
use Lyrasoft\Luna\Repository\LanguageRepository;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Upload\FileUploadService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\Event\AfterSaveEvent;

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
}
