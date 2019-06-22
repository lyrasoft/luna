<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Category;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\Filter\ServerTZFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Ioc;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;
use Windwalker\Query\Query;

/**
 * The CategoryEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
    use PhoenixFieldTrait;
    use UnidevFieldTrait;
    use LunaFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        $langPrefix = LunaHelper::getLangPrefix();

        // Title
        $this->text('title')
            ->label(__($langPrefix . 'category.field.title'))
            ->placeholder(__($langPrefix . 'category.field.title'))
            ->addFilter('trim')
            ->required(true);

        // Alias
        $this->text('alias')
            ->label(__($langPrefix . 'category.field.alias'))
            ->placeholder(__($langPrefix . 'category.field.alias'));

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            $type = Ioc::getInput()->get('type');

            // ID
            $this->hidden('id');

            // Parent
            $this->categoryList('parent_id')
                ->label(__($langPrefix . 'category.field.parent'))
                ->class('has-select2')
                ->option(__($langPrefix . 'category.root'), 1)
                ->categoryType($type)
                ->postQueryHandler(function (Query $query) {
                    $input = Ioc::getInput();

                    if ($id = $input->get('id')) {
                        $self = CategoryMapper::findOne($id);

                        $query->where('(lft < ' . $self->lft . ' OR rgt > ' . $self->rgt . ')');
                    }
                });

            // Images
            $this->singleImageDrag('image')
                ->label(__($langPrefix . 'category.field.images'))
                ->version(2)
                ->exportZoom(2)
                ->showSizeNotice(true)
                ->width(400)
                ->height(300);

            $this->hidden('type')
                ->label(__($langPrefix . 'category.field.type'));
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            // Description
            $this->tinymceEditor('description')
                ->label(__($langPrefix . 'category.field.description'))
                ->editorOptions([
                    'height' => 350,
                ])
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->switch('state')
                ->label(__($langPrefix . 'category.field.published'))
                ->class('')
                ->circle(true)
                ->color('success')
                ->defaultValue(1);

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(__($langPrefix . 'category.field.language'))
                    ->option(__($langPrefix . 'field.language.all'), '*');
            }

            // Created
            $this->calendar('created')
                ->label(__($langPrefix . 'category.field.created'))
                ->addFilter(ServerTZFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__($langPrefix . 'category.field.modified'))
                ->disabled(true);

            if (WarderHelper::tableExists('users')) {
                // Author
                $this->userModal('created_by')
                    ->label(__($langPrefix . 'category.field.author'));

                // Modified User
                $this->userModal('modified_by')
                    ->label(__($langPrefix . 'category.field.modifiedby'))
                    ->disabled();
            }
        });
    }
}
