<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Page;

use Lyrasoft\Luna\Admin\Field\Page\ExtendListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Phoenix\Form\Filter\ServerTZFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Legacy\Core\Form\AbstractFieldDefinition;
use Windwalker\Legacy\Form\Form;

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

            $this->add('extends', ExtendListField::class)
                ->label(__('luna.page.field.extends'))
                ->set('allow_add', true)
                ->help(__('luna.page.field.extends.desc'))
                ->required(true);

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(__( 'luna.page.field.language'))
                    ->option(__('luna.field.language.all'), '*');
            }

            // State
            $this->switch('state')
                ->label(__('luna.page.field.published'))
                ->class('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);
        });
        $this->fieldset('meta', function (Form $form) {
            $this->group('meta', function () {
                $this->text('meta_title')
                    ->label(__('luna.page.field.meta.title'))
                    ->description(__('luna.page.field.meta.title.desc'))
                    ->maxlength(255);

                $this->textarea('meta_desc')
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
                    ->crop(false)
                    ->showSizeNotice(true);
            });
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) {
            // Created
            $this->calendar('created')
                ->label(__('luna.page.field.created'))
                ->addFilter(ServerTZFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__('luna.page.field.modified'))
                ->addFilter(ServerTZFilter::class)
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
