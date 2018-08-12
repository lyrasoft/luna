<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Page;

use Lyrasoft\Luna\Admin\Field\Page\PageListField;
use Lyrasoft\Luna\Admin\Field\Page\PageModalField;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Form\Filter\MaxLengthFilter;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;

/**
 * The PageEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
    use PhoenixFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     *
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        // Basic fieldset
        $this->fieldset('basic', function (Form $form) {
            // ID
            $this->hidden('id');

            // Title
            $this->text('title')
                ->label(__('luna.page.field.title'))
                ->addFilter('trim')
                ->maxlength(255)
                ->required(true);

            // Alias
            $this->text('alias')
                ->label(__('luna.page.field.alias'))
                ->description(__('luna.page.field.alias.desc'))
                ->maxlength(255);

            // Image
            $this->text('image')
                ->label(__('luna.page.field.image'))
                ->maxlength(255);

            // URL
            $this->text('url')
                ->label(__('luna.page.field.url'))
                ->maxlength(255)
                ->addValidator(Rule\UrlValidator::class)
                ->attr('data-validate', 'url');

            // Example: Page List
            // TODO: Please remove this field in production
            $this->add('page_list', PageListField::class)
                ->label('List Example')
                ->option('- Select Page Example -', '')
                ->addClass('has-select2');

            // Example: Page Modal
            // TODO: Please remove this field in production
            $this->add('page_modal', PageModalField::class)
                ->label('Modal Example')
                ->set('placeholder', 'Select Page Example');
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) {
            // Introtext
            $this->textarea('introtext')
                ->label(__('luna.page.field.introtext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);

            // Fulltext
            $this->textarea('fulltext')
                ->label(__('luna.page.field.fulltext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) {
            // State
            $this->switch('state')
                ->label(__('luna.page.field.published'))
                ->class('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);

            // Created
            $this->calendar('created')
                ->label(__('luna.page.field.created'))
                ->addFilter(UtcFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__('luna.page.field.modified'))
                ->addFilter(UtcFilter::class)
                ->disabled();

            // Author
            $this->text('created_by')
                ->label(__('luna.page.field.author'));

            // Modified User
            $this->text('modified_by')
                ->label(__('luna.page.field.modifiedby'))
                ->disabled();
        });
    }
}
