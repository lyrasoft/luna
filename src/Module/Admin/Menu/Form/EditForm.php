<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Menu\Form;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Field\MenuListField;
use Lyrasoft\Luna\Field\MenuTypeListField;
use Lyrasoft\Luna\Field\MenuViewListField;
use Lyrasoft\Luna\Field\UserModalField;
use Unicorn\Enum\BasicState;
use Unicorn\Field\CalendarField;
use Unicorn\Field\FileDragField;
use Unicorn\Field\RepeatableField;
use Unicorn\Field\SwitcherField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;
use Windwalker\Query\Query;

/**
 * The EditForm class.
 */
class EditForm implements FieldDefinitionInterface
{
    use TranslatorTrait;

    public function __construct(protected string|int|null $id, protected string $type, protected ORM $orm)
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

        $form->fieldset(
            'basic',
            function (Form $form) {
                $form->add('parent_id', MenuListField::class)
                    ->label($this->trans('unicorn.field.parent'))
                    ->option($this->trans('luna.menu.root'), '1')
                    ->menuType($this->type)
                    ->addClass('has-tom-select')
                    ->required(true)
                    ->configureQuery(
                        function (Query $query) {
                            if ($this->id) {
                                $self = $this->orm->findOne(Menu::class, $this->id);

                                if ($self) {
                                    $query->whereRaw(
                                        '(lft < ' . $self->getLft() . ' OR rgt > ' . $self->getRgt() . ')'
                                    );
                                }
                            }
                        }
                    );

                $form->add('view', MenuViewListField::class)
                    ->label($this->trans('luna.menu.field.view'))
                    ->addClass('has-tom-select')
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->required(true);
            }
        );

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('state', SwitcherField::class)
                    ->label($this->trans('unicorn.field.published'))
                    ->addClass('')
                    ->color('success')
                    ->circle(true)
                    ->defaultValue('1');

                $form->add('type', MenuTypeListField::class)
                    ->label($this->trans('luna.menu.field.type'))
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->required(true);
                
                $form->add('target', ListField::class)
                    ->label($this->trans('luna.menu.field.target'))
                    ->option($this->trans('luna.menu.field.target.option.blank'), '_blank')
                    ->option($this->trans('luna.menu.field.target.option.self'), '_self')
                    ->option($this->trans('luna.menu.field.target.option.parent'), '_parent')
                    ->option($this->trans('luna.menu.field.target.option.top'), '_top')
                    ->required(true);

                // @languages

                // Hidden
                $form->add('hidden', SwitcherField::class)
                    ->label($this->trans('luna.menu.field.hidden'))
                    ->addClass('')
                    ->color('warning')
                    ->circle(true)
                    ->defaultValue(0);

                $form->add('created', CalendarField::class)
                    ->label($this->trans('unicorn.field.author'))
                    ->disabled(true);

                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'))
                    ->disabled(true);

                $form->add('created_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.author'))
                    ->disabled(true);

                $form->add('modified_by', UserModalField::class)
                    ->label($this->trans('unicorn.field.modified_by'))
                    ->disabled(true);
            }
        );

        $form->add('id', HiddenField::class);
    }
}
