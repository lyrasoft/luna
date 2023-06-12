<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Article\Form;

use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\SearchField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The GridForm class.
 */
class GridForm implements FieldDefinitionInterface
{
    use LocaleAwareTrait;
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
                    ->placeholder($this->trans('unicorn.grid.search.label'));
            }
        );

        $form->ns(
            'filter',
            function (Form $form) {
                $form->add('article.state', ListField::class)
                    ->label($this->trans('unicorn.field.state'))
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->registerOptions(BasicState::getTransItems($this->lang))
                    ->onchange('this.form.submit()');

                $form->add('article.category_id', CategoryListField::class)
                    ->label($this->trans('luna.article.field.category'))
                    ->option($this->trans('unicorn.select.placeholder'), '')
                    ->categoryType('article')
                    ->onchange('this.form.submit()');

                if ($this->isLocaleEnabled()) {
                    $form->add('article.language', LanguageListField::class)
                        ->label($this->trans('luna.field.language'))
                        ->option($this->trans('unicorn.select.placeholder'), '')
                        // ->option($this->trans('luna.language.all'), '*')
                        ->onchange('this.form.submit()');
                }
            }
        );

        $form->ns(
            'batch',
            function (Form $form) {
                $form->add('state', ListField::class)
                    ->label($this->trans('unicorn.field.state'))
                    ->option($this->trans('unicorn.select.no.change'), '')
                    ->registerOptions(BasicState::getTransItems($this->lang));

                // if ($this->isLocaleEnabled()) {
                //     $form->add('language', LanguageListField::class)
                //         ->label($this->trans('luna.field.language'))
                //         ->option($this->trans('unicorn.select.no.change'), '')
                //         ->option($this->trans('luna.language.all'), '*');
                // }
            }
        );
    }
}
