<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Menu\Form;

use Lyrasoft\Luna\Field\MenuModalField;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\SearchField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The GridForm class.
 */
class GridForm implements FieldDefinitionInterface
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
        $form->ns(
            'search',
            function (Form $form) {
                $form->add('*', SearchField::class)
                    ->label($this->trans('unicorn.grid.search.label'))
                    ->placeholder($this->trans('unicorn.grid.search.label'))
                    ->attr('x-on:keydown.enter', '$store.grid.sendFilter($event)');
            }
        );

        $form->ns(
            'filter',
            function (Form $form) {
                $form->add('menu.state', ListField::class)
                    ->label('State')
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->registerOptions(BasicState::getTransItems($this->lang))
                    ->attr('x-on:change', '$store.grid.sendFilter()');
            }
        );

        $form->ns(
            'batch',
            function (Form $form) {
                $form->add('parent_id', MenuModalField::class)
                    ->label($this->trans('unicorn.field.parent'));
            }
        );
    }
}
