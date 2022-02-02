<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Widget\Form;

use Windwalker\Core\Language\TranslatorTrait;
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\CalendarField;
use Windwalker\Form\Field\NumberField;
use Unicorn\Field\SwitcherField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The EditForm class.
 */
class EditForm implements FieldDefinitionInterface
{
    use TranslatorTrait;
    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     */
    public function define(Form $form): void
    {
        $form->add('title', TextField::class)
            ->label('Title')
            ->addFilter('trim');

        $form->add('alias', TextField::class)
            ->label('Alias')
            ->addFilter('trim');

        $form->fieldset(
            'basic',
            function (Form $form) {
                //
            }
        );
        $form->add('id', HiddenField::class);

        $form->add('type', TextField::class)
            ->label($this->trans('unicorn.field.type'));

        $form->add('position', TextField::class)
            ->label($this->trans('luna.widget.field.position'));

        $form->add('note', TextField::class)
            ->label($this->trans('luna.widget.field.note'));

        $form->add('content', TextareaField::class)
            ->label($this->trans('luna.widget.field.content'))
            ->rows(7);

        $form->add('state', SwitcherField::class)
            ->label($this->trans('luna.widget.field.published'))
            ->circle(true)
            ->color('success')
            ->defaultValue('1');

        $form->add('ordering', NumberField::class)
            ->label($this->trans('unicorn.field.ordering'));

        $form->add('created', CalendarField::class)
            ->label($this->trans('unicorn.field.created'));

        $form->add('created_by', UserModalField::class)
            ->label($this->trans('unicorn.field.author'));

        $form->add('modified', CalendarField::class)
            ->label($this->trans('unicorn.field.modified'));

        $form->add('modified_by', UserModalField::class)
            ->label($this->trans('unicorn.field.modified_by'));

        $form->add('language', TextField::class)
            ->label($this->trans('luna.widget.field.language'));

        $form->add('params', TextareaField::class)
            ->label($this->trans('luna.widget.field.params'))
            ->rows(7);
    }
}
