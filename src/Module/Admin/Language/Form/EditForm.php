<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Language\Form;

use Lyrasoft\Luna\Field\FlagListField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\NumberField;
use Unicorn\Field\SwitcherField;
use Windwalker\Form\Field\TextareaField;
use Unicorn\Field\SingleImageDragField;
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
            ->label($this->trans('unicorn.field.title'))
            ->required(true)
            ->addFilter('trim');

        $form->add('alias', TextField::class)
            ->label($this->trans('unicorn.field.alias'));

        $form->fieldset(
            'basic',
            function (Form $form) {
                $form->add('title_native', TextField::class)
                    ->label($this->trans('luna.language.field.title_native'));

                $form->add('code', TextField::class)
                    ->label($this->trans('luna.language.field.code'));

                $form->add('image', FlagListField::class)
                    ->label($this->trans('unicorn.field.image'));

                $form->add('description', TextareaField::class)
                    ->label($this->trans('unicorn.field.description'))
                    ->rows(7);
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

                $form->add('sitename', TextField::class)
                    ->label($this->trans('luna.language.field.sitename'));

                $form->add('meta/description', TextareaField::class)
                    ->label($this->trans('luna.language.field.meta.description'))
                    ->rows(4);

                $form->add('meta/cover', SingleImageDragField::class)
                    ->label($this->trans('luna.language.field.meta.cover'))
                    ->width(1200)
                    ->height(628)
                    ->crop(true)
                    ->showSizeNotice(true);

                $form->add('meta/keywords', TextField::class)
                    ->label($this->trans('luna.language.field.meta.keywords'));

                $form->add('meta/custom_code', TextareaField::class)
                    ->label($this->trans('luna.language.field.meta.custom.code'))
                    ->rows(7);
            }
        );

        $form->add('id', HiddenField::class);
    }
}
