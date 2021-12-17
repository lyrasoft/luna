<?php

/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category\Form;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * The CategoryEditDefinition class.
 *
 * @since  1.0
 */
class EditForm implements FieldDefinitionInterface
{
    use TranslatorTrait;

    /**
     * EditForm constructor.
     */
    public function __construct(protected string $type, protected mixed $id, protected ORM $orm)
    {
    }

    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     * @throws \InvalidArgumentException
     */
    public function define(Form $form): void
    {
        $type = $this->type;

        // ID
        $form->add('id', HiddenField::class);

        // Title
        $form->add('title', TextField::class)
            ->label($this->trans('unicorn.field.title'))
            ->placeholder($this->trans('unicorn.field.title'))
            ->addFilter('trim')
            ->required(true);

        // Alias
        $form->add('alias', TextField::class)
            ->label($this->trans('unicorn.field.alias'))
            ->placeholder($this->trans('unicorn.field.alias'));

        // Basic fieldset
        $form->fieldset(
            'basic',
            function (Form $form) use ($type) {
                // Parent
                $form->add('parent_id', CategoryListField::class)
                    ->label($this->trans('unicorn.field.parent'))
                    ->addClass('js-tom-select')
                    ->option($this->trans('luna.category.root'), '1')
                    ->categoryType($type)
                    ->configureQuery(
                        function (\Windwalker\Query\Query $query) {
                            if ($id = $this->id) {
                                /** @var Category $self */
                                $self = $this->orm->mapper(Category::class)->findOne($id);

                                if ($self) {
                                    $query->whereRaw(
                                        '(lft < ' . $self->getLft() . ' OR rgt > ' . $self->getRgt() . ')'
                                    );
                                }
                            }
                        }
                    );

                $form->add('image', SingleImageDragField::class)
                    ->label($this->trans('unicorn.field.image'))
                    ->crop(true)
                    ->width(800)
                    ->height(600);

                // Description
                // $form->add('description', TinymceEditorField::class)
                //     ->label($this->trans('luna.category.field.description'))
                //     ->editorOptions(
                //         [
                //             'height' => 450,
                //         ]
                //     )
                //     ->rows(10);

                // Description
                $form->add('description', TextareaField::class)
                    ->label($this->trans('unicorn.field.description'))
                    ->rows(10);

                $form->add('type', HiddenField::class)
                    ->label($this->trans('unicorn.field.type'));
            }
        );

        // Meta fieldset
        $form->fieldset(
            'meta',
            function (Form $form) {
                // State
                $form->add('state', SwitcherField::class)
                    ->label($this->trans('unicorn.field.published'))
                    ->addClass('')
                    ->circle(true)
                    ->color('success')
                    ->defaultValue(1);

                // Created
                $form->add('created', CalendarField::class)
                    ->label($this->trans('unicorn.field.created'));

                // Modified
                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'))
                    ->disabled(true);

                // Author
                $form->add('created_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.author'));

                // Modified User
                $form->add('modified_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.modified.by'))
                    ->disabled(true);
            }
        );
    }
}
