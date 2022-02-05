<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Widget\Form;

use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Field\WidgetPositionListField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
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
    use LocaleAwareTrait;

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
            ->addFilter('trim');

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('state', SwitcherField::class)
                    ->label($this->trans('unicorn.field.published'))
                    ->circle(true)
                    ->color('success')
                    ->defaultValue('1');

                $form->add('position', WidgetPositionListField::class)
                    ->label($this->trans('luna.widget.field.position'))
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->allowCreate(true);

                $form->add('type', TextField::class)
                    ->label($this->trans('luna.widget.field.type'))
                    ->readonly(true);

                if ($this->isLocaleEnabled()) {
                    $form->add('language', LanguageListField::class)
                        ->label($this->trans('luna.field.language'))
                        ->option($this->trans('luna.language.all'), '*');
                }

                $form->add('note', TextField::class)
                    ->label($this->trans('luna.widget.field.note'));

                // $form->add('content', TextareaField::class)
                //     ->label($this->trans('luna.widget.field.content'))
                //     ->rows(7);

                $form->add('created', CalendarField::class)
                    ->label($this->trans('unicorn.field.created'))
                    ->disabled(true);

                $form->add('created_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.author'))
                    ->disabled(true);

                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'))
                    ->disabled(true);

                $form->add('modified_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.modified_by'))
                    ->disabled(true);
            }
        );

        $form->add('id', HiddenField::class);
    }
}
