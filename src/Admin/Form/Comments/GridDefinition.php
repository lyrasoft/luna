<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Comments;

use Lyrasoft\Luna\Helper\LunaHelper;
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
                ->label(__('phoenix.grid.search.field.label'))
                ->set('display', false)
                ->defaultValue('*')
                ->option(__('phoenix.core.all'), '*')
                ->option(__($langPrefix . 'comment.field.title'), 'comment.title')
                ->option('User Name', 'user.name')
                ->option('Replyer Name', 'replyer.name')
                ->option('Content', 'comment.content')
                ->option('Reply', 'comment.reply')
                ->option('Target Title', 'target.title');

            // Search Content
            $this->text('content')
                ->label(__('phoenix.grid.search.label'))
                ->placeholder(__('phoenix.grid.search.label'));
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
            $this->list('comment.state')
                ->label('State')
                ->class('has-select2')
                // Add empty option to support single deselect button
                ->option('', '')
                ->option(__($langPrefix . 'comment.filter.state.select'), '')
                ->option(__('phoenix.grid.state.published'), '1')
                ->option(__('phoenix.grid.state.unpublished'), '0')
                ->onchange('this.form.submit()');
        });

        /*
         * This is batch form definition.
         * -----------------------------------------------
         * Every field is a table column.
         * For example, you can add a 'category_id' field to update item category.
         */
        $this->wrap(null, 'batch', function (Form $form) use ($langPrefix) {
            // Nothing
        });
    }
}
