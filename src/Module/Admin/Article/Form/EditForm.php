<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Article\Form;

use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\TagListField;
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Unicorn\Field\TinymceEditorField;
use Windwalker\Core\Language\TranslatorTrait;
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

    public function __construct(protected ?string $type = 'article')
    {
    }

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
            ->addFilter('trim')
            ->required(true);

        $form->add('alias', TextField::class)
            ->label($this->trans('unicorn.field.alias'))
            ->addFilter('trim');

        $form->fieldset(
            'text',
            function (Form $form) {
                $form->add('introtext', TinymceEditorField::class)
                    ->label($this->trans('luna.article.field.introtext'))
                    ->editorOptions(
                        [
                            'height' => 400,
                        ]
                    );

                $form->add('fulltext', TinymceEditorField::class)
                    ->label($this->trans('luna.article.field.fulltext'))
                    ->rows(7)
                    ->editorOptions(
                        [
                            'height' => 550,
                        ]
                    );
            }
        );

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('category_id', CategoryListField::class)
                    ->label($this->trans('luna.article.field.category'))
                    ->categoryType($this->type);

                $form->add('tags', TagListField::class)
                    ->label($this->trans('luna.article.field.tags'))
                    ->multiple(true);

                $form->add('image', SingleImageDragField::class)
                    ->label($this->trans('unicorn.field.image'))
                    ->crop(true)
                    ->width(800)
                    ->height(600);

                $form->add('state', SwitcherField::class)
                    ->label($this->trans('unicorn.field.published'))
                    ->circle(true)
                    ->color('success');

                $form->add('created', CalendarField::class)
                    ->label($this->trans('unicorn.field.created'));

                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'))
                    ->disabled(true);

                $form->add('created_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.author'));

                $form->add('modified_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.modified_by'))
                    ->disabled(true);

                // $form->add('language', TextField::class)
                //     ->label($this->trans('luna.article.language'));
                //
                // $form->add('page_id', NumberField::class)
                //     ->label($this->trans('luna.article.page_id'));

                $form->add('type', HiddenField::class)
                    ->label('Type');
            }
        );

        $form->add('id', HiddenField::class);
    }
}
