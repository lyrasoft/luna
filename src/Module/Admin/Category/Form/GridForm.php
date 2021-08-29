<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Admin\Category\Form;


use App\Field\CategoryListField;
use App\Field\RegionListField;
use App\Field\UserModalField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The GridDefinition class.
 *
 * @since  1.0
 */
class GridForm implements FieldDefinitionInterface
{
    use LunaFieldTrait;

    /**
     * GridForm constructor.
     */
    public function __construct(protected AppRequest $request)
    {
    }

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     */
    public function define(Form $form): void
    {
        $langPrefix = 'luna.';

        /*
         * Search Control
         * -------------------------------------------------
         * Add search fields as options, by default, model will search all columns.
         * If you hop that user can choose a field to search, change "display" to true.
         */
        $form->group('search', function (Form $form) use ($langPrefix) {
            // Search Field
            $form->add('field', \Windwalker\Form\Field\ListField::class)
                ->label(__('phoenix.grid.search.field.label'))
                ->set('display', false)
                ->defaultValue('*')
                ->option(__('phoenix.core.all'), '*')
                ->option(__($langPrefix . 'category.field.id'), 'category.id')
                ->option(__($langPrefix . 'category.field.title'), 'category.title')
                ->option(__($langPrefix . 'category.field.alias'), 'category.alias');

            // Search Content
            $form->add('*', \Windwalker\Form\Field\SearchField::class)
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
        $form->group('filter', function (Form $form) use ($langPrefix) {
            // State
            $form->add('category.state', \Windwalker\Form\Field\ListField::class)
                ->label(__($langPrefix . 'category.field.published'))
                // Add empty option to support single deselect button
                ->option('', '')
                ->option(__($langPrefix . 'category.filter.state.select'), '')
                ->option(__('phoenix.grid.state.published'), '1')
                ->option(__('phoenix.grid.state.unpublished'), '0')
                ->onchange('this.form.submit()');

            $form->add('region', RegionListField::class)
                ->label('Region')
                ->option(__('datavideo.category.filter.region.select'), '')
                ->addClass('has-select2')
                ->onchange('this.form.submit()');
        });

        /*
         * This is batch form definition.
         * -----------------------------------------------
         * Every field is a table column.
         * For example, you can add a 'category_id' field to update item category.
         */
        $form->group('batch', function (Form $form) use ($langPrefix) {
            // Parent
            $form->add('parent_id', CategoryListField::class)
                ->label(__($langPrefix . 'category.field.parent'))
                ->class('col-md-12 has-select2')
                ->categoryType($this->request->input('type') ?? '')
                ->showRoot(true)
                ->option(__($langPrefix . 'category.batch.parent.select'), '');


            if (WarderHelper::tableExists('users')) {
                // Author
                $form->add('created_by', UserModalField::class)
                    ->label(__($langPrefix . 'category.field.author'));
            }
        });
    }
}
