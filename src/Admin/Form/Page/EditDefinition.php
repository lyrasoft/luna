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
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
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
    use LunaFieldTrait;
    use UnidevFieldTrait;

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

            $this->group('meta', function () {
                $this->text('meta_title')
                    ->label(__('luna.page.field.meta.title'))
                    ->description(__('luna.page.field.meta.title.desc'))
                    ->maxlength(255);

                $this->text('meta_desc')
                    ->label(__('luna.page.field.meta.desc'))
                    ->description(__('luna.page.field.meta.desc.desc'))
                    ->maxlength(255);

                $this->text('meta_keyword')
                    ->label(__('luna.page.field.meta.keyword'))
                    ->description(__('luna.page.field.meta.keyword.desc'))
                    ->maxlength(255);

                $this->text('og_title')
                    ->label(__('luna.page.field.og.title'))
                    ->description(__('luna.page.field.og.title.desc'))
                    ->maxlength(255);

                $this->text('og_desc')
                    ->label(__('luna.page.field.og.desc'))
                    ->description(__('luna.page.field.og.desc.desc'))
                    ->maxlength(255);

                $this->singleImageDrag('og_image')
                    ->label(__('luna.page.field.og.image'))
                    ->description(__('luna.page.field.og.image.desc'))
                    ->version(2)
                    ->maxWidth(2000)
                    ->maxHeight(2000)
                    ->showSizeNotice(true);
            });
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
