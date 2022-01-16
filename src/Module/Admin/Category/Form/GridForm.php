<?php

/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Admin\Category\Form;

use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\SearchField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The GridDefinition class.
 *
 * @since  1.0
 */
class GridForm implements FieldDefinitionInterface
{
    use LocaleAwareTrait;
    use TranslatorTrait;

    /**
     * GridForm constructor.
     */
    public function __construct(protected AppRequest $request)
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
        /*
         * Search Control
         * -------------------------------------------------
         * Add search fields as options, by default, model will search all columns.
         * If you hop that user can choose a field to search, change "display" to true.
         */
        $form->group('search', function (Form $form) {
            // Search Content
            $form->add('*', SearchField::class)
                ->label($this->trans('unicorn.grid.search.label'))
                ->placeholder($this->trans('unicorn.grid.search.label'));
        });

        /*
         * Filter Control
         * -------------------------------------------------
         * Add filter fields to this section.
         * Remember to add onchange event => this.form.submit();
         */
        $form->group('filter', function (Form $form) {
            // State
            $form->add('category.state', ListField::class)
                ->label($this->trans('unicorn.field.state'))
                ->option($this->trans('unicorn.select.placeholder'), '')
                ->registerOptions(BasicState::getTransItems($this->lang))
                ->onchange('this.form.submit()');

            if ($this->isLocaleEnabled()) {
                $form->add('category.language', LanguageListField::class)
                    ->label($this->trans('luna.field.language'))
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->option($this->trans('luna.language.all'), '*')
                    ->onchange('this.form.submit()');
            }
        });

        /*
         * This is batch form definition.
         * -----------------------------------------------
         * Every field is a table column.
         * For example, you can add a 'category_id' field to update item category.
         */
        $form->group('batch', function (Form $form) {
            // Parent
            $form->add('parent_id', CategoryListField::class)
                ->label($this->trans('unicorn.field.parent'))
                ->addClass('js-tom-select')
                ->categoryType($this->request->input('type') ?? '')
                ->showRoot(true)
                ->option($this->trans('luna.category.parent.select'), '');

            if ($this->isLocaleEnabled()) {
                $form->add('language', LanguageListField::class)
                    ->label($this->trans('luna.field.language'))
                    ->option($this->trans('unicorn.select.no.change'), '')
                    ->option($this->trans('luna.language.all'), '*');
            }
        });
    }
}
