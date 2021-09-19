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
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Unicorn\Field\TinymceEditorField;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Core\Language\LangService;
use Unicorn\Field\CalendarField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\NumberField;
use Windwalker\Form\Field\HiddenField;
use Unicorn\Enum\BasicState;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

use function Windwalker\raw;

/**
 * The EditForm class.
 */
class EditForm implements FieldDefinitionInterface
{
    #[Inject]
    protected LangService $lang;
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
            ->label('Title')
            ->addFilter('trim')
            ->required(true);

        $form->add('alias', TextField::class)
            ->label('Alias')
            ->addFilter('trim');

        $form->fieldset(
            'text',
            function (Form $form) {
                $form->add('introtext', TinymceEditorField::class)
                    ->label($this->lang->trans('luna.article.field.introtext'))
                    ->editorOptions(
                        [
                            'height' => 400,
                        ]
                    );

                $form->add('fulltext', TinymceEditorField::class)
                    ->label($this->lang->trans('luna.article.field.fulltext'))
                    ->rows(7)
                    ->editorOptions(
                        [
                            'height' => 550,
                            'setup' => raw('window.addButtons')
                        ]
                    );
            }
        );

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('category_id', CategoryListField::class)
                    ->label($this->lang->trans('luna.article.field.category'))
                    ->addClass('has-choices')
                    ->categoryType($this->type);

                $form->add('image', SingleImageDragField::class)
                    ->label($this->lang->trans('luna.article.field.image'))
                    ->crop(true)
                    ->width(800)
                    ->height(600);

                $form->add('state', SwitcherField::class)
                    ->label($this->lang->trans('luna.article.field.published'))
                    ->circle(true)
                    ->color('success');

                $form->add('created', CalendarField::class)
                    ->label($this->lang->trans('luna.article.field.created'));

                $form->add('modified', CalendarField::class)
                    ->label($this->lang->trans('luna.article.field.modified'))
                    ->disabled(true);

                $form->add('created_by', UserModalField::class)
                    ->label($this->lang->trans('luna.article.field.created_by'));

                $form->add('modified_by', UserModalField::class)
                    ->label($this->lang->trans('luna.article.field.modified_by'))
                    ->disabled(true);

                // $form->add('language', TextField::class)
                //     ->label($this->lang->trans('luna.article.language'));
                //
                // $form->add('page_id', NumberField::class)
                //     ->label($this->lang->trans('luna.article.page_id'));

                $form->add('type', HiddenField::class)
                    ->label($this->lang->trans('luna.article.type'));
            }
        );
        $form->add('id', HiddenField::class);
    }
}
