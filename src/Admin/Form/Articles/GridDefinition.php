<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Articles;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The GridDefinition class.
 *
 * @since  1.0
 */
class GridDefinition extends AbstractFieldDefinition
{
    use LunaFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     */
    protected function doDefine(Form $form)
    {
        $langPrefix = LunaHelper::getLangPrefix();

        /*
         * Search Control
         * -------------------------------------------------
         * Add search fields as options, by default, model will search all columns.
         * If you hop that user can choose a field to search, change "display" to true.
         */
        $this->group('search', function (Form $form) use ($langPrefix) {
            // Search Field
            $this->list('field')
                ->label(Translator::translate('phoenix.grid.search.field.label'))
                ->set('display', false)
                ->defaultValue('*')
                ->option(Translator::translate('phoenix.core.all'), '*')
                ->option(Translator::translate($langPrefix . 'article.field.title'), 'article.title')
                ->option(Translator::translate($langPrefix . 'article.field.alias'), 'article.alias')
                ->option(Translator::translate($langPrefix . 'category.title'), 'category.title');

            // Search Content
            $this->text('content')
                ->label(Translator::translate('phoenix.grid.search.label'))
                ->placeholder(Translator::translate('phoenix.grid.search.label'));
        });

        /*
         * Filter Control
         * -------------------------------------------------
         * Add filter fields to this section.
         * Remember to add onchange event => this.form.submit(); or Phoenix.post();
         *
         * You can override filter actions in ArticlesModel::configureFilters()
         */
        $this->group('filter', function (Form $form) use ($langPrefix) {
            // State
            $this->list('article.state')
                ->label('State')
                ->class('hasChosen')
                // Add empty option to support single deselect button
                ->option('', '')
                ->option(Translator::translate($langPrefix . 'article.filter.state.select'), '')
                ->option(Translator::translate('phoenix.grid.state.published'), '1')
                ->option(Translator::translate('phoenix.grid.state.unpublished'), '0')
                ->onchange('this.form.submit()');

            if (LunaHelper::tableExists('categories')) {
                $this->categoryList('article.category_id')
                    ->label(Translator::translate($langPrefix . 'field.category'))
                    ->class('hasChosen')
                    ->option('', '')
                    ->option(Translator::translate($langPrefix . 'filter.category.select'), '')
                    ->categoryType('article')
                    ->onchange('this.form.submit()');
            }

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('article.language')
                    ->label(Translator::translate($langPrefix . 'article.field.language'))
                    ->class('hasChosen')
                    ->option(Translator::translate($langPrefix . 'field.language.select'), '')
                    ->option(Translator::translate($langPrefix . 'field.language.all'), '*')
                    ->onchange('this.form.submit()');
            }
        });

        /*
         * This is batch form definition.
         * -----------------------------------------------
         * Every field is a table column.
         * For example, you can add a 'category_id' field to update item category.
         */
        $this->group('batch', function (Form $form) use ($langPrefix) {
            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(Translator::translate($langPrefix . 'article.field.language'))
                    ->class('hasChosen')
                    ->option(Translator::translate($langPrefix . 'field.language.select'), '')
                    ->option(Translator::translate($langPrefix . 'field.language.all'), '*');
            }

            if (LunaHelper::tableExists('categories')) {
                // Category
                $this->categoryList('category_id')
                    ->label(Translator::translate($langPrefix . 'category.title'))
                    ->class('hasChosen')
                    ->categoryType('article')
                    ->option(Translator::translate($langPrefix . 'filter.category.select'), '');
            }

            if (WarderHelper::tableExists('users')) {
                // Author
                $this->userModal('created_by')
                    ->label(Translator::translate($langPrefix . 'article.field.author'));
            }
        });
    }
}
