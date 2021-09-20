<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Form\Event\BuildFormFieldEvent;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;

/**
 * The BuildFormFieldSubscriber class.
 */
#[EventSubscriber]
class BuildFormFieldSubscriber
{
    #[ListenTo(BuildFormFieldEvent::class)]
    public function buildFormField(BuildFormFieldEvent $event): void
    {
        $column = $event->getColumn();
        $label = $event->getLabel();
        $colName = $column->getColumnName();
        $builder = $event->getFormFieldsBuilder();
        $code = null;

        switch ($colName) {
            case 'created_by':
            case 'modified_by':
                $builder->addUse(UserModalField::class);

                $code = <<<PHP
        \$form->add('$colName', UserModalField::class)
            ->label($label);
PHP;
            break;

            case 'image':
                $builder->addUse(SingleImageDragField::class);

                $code = <<<PHP
        \$form->add('$colName', SingleImageDragField::class)
            ->label($label)
            ->crop(true)
            ->width(800)
            ->height(600);
PHP;

        }

        $event->setCode($code);
    }
}
