<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Tag\Form;

use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\TextareaField;
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SwitcherField;
use Windwalker\Form\Field\HiddenField;
use Unicorn\Enum\BasicState;
use Windwalker\Form\Field\ListField;
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
        $form->fieldset(
            'basic',
            function (Form $form) {
                $form->add('title', TextField::class)
                    ->label($this->trans('unicorn.field.title'))
                    ->required(true)
                    ->addFilter('trim')
                    ->addClass('form-control-lg');

                $form->add('alias', TextField::class)
                    ->label($this->trans('unicorn.field.alias'));
            }
        );

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('state', SwitcherField::class)
                    ->label($this->trans('unicorn.field.published'))
                    ->circle(true)
                    ->color('success')
                    ->defaultValue('1');

                $form->add('created', CalendarField::class)
                    ->label($this->trans('unicorn.field.created'));

                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'));

                $form->add('created_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.author'));

                $form->add('modified_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.modified_by'));
            }
        );

        $form->add('id', HiddenField::class);
    }
}
