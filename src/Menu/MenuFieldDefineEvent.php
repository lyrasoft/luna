<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu;

use Windwalker\Event\BaseEvent;
use Windwalker\Form\Form;
use Windwalker\Utilities\Accessible\AccessorBCTrait;

/**
 * The MenuFieldDefineEvent class.
 */
class MenuFieldDefineEvent extends BaseEvent
{
    use AccessorBCTrait;

    public function __construct(
        protected Form $form,
        protected AbstractMenuView $menu
    ) {
    }
}
