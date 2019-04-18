<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Article;

use Lyrasoft\Luna\Admin\Field\Page\PageModalField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Form\Filter\MaxLengthFilter;
use Windwalker\Form\Form;

/**
 * The ArticleEditDefinition class.
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
            ->label(__($langPrefix . 'article.field.title'))
            ->placeholder(__($langPrefix . 'article.field.title'))
            ->addFilter('trim')
            ->addFilter(new MaxLengthFilter(255))
            ->required(true);

        // Alias
        $this->text('alias')
            ->label(__($langPrefix . 'article.field.alias'))
            ->placeholder(__($langPrefix . 'article.field.alias'));

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            // ID
            $this->hidden('id');

            if (LunaHelper::tableExists('categories')) {
                // Category
                $this->categoryList('category_id')
                    ->categoryType('article')
                    ->class('has-select2')
                    ->label(__($langPrefix . 'category.title'));
            }

            if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps')) {
                // Tags
                $this->tagList('tags')
                    ->label(__($langPrefix . 'tag.title'))
                    ->multiple(true);
            }

            if (LunaHelper::tableExists('pages') && LunaHelper::tableExists('tag_maps')) {
                // Page
                $this->add('page_id', PageModalField::class)
                    ->label(__($langPrefix . 'page.title'));
            }

            // Images
            $this->singleImageDrag('image')
                ->label(__($langPrefix . 'article.field.images'))
                ->set('force_v1', true)
                ->width(400)
                ->height(300);

            $this->multiUploader('i')
                ->label('M');
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            // Text
            $this->tinymceEditor('text')
                ->label(__($langPrefix . 'article.field.introtext'))
                ->editorOptions([
                    'height' => 450,
                ])
                ->includes('readmore')
                ->addFilter(new MaxLengthFilter(21844))// @see https://stackoverflow.com/a/4420195
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->switch('state')
                ->label(__($langPrefix . 'article.field.published'))
                ->class('')
                ->circle(true)
                ->color('success')
                ->defaultValue(1);

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(__($langPrefix . 'article.field.language'))
                    ->option(__($langPrefix . 'field.language.all'), '*');
            }

            // Created
            $this->calendar('created')
                ->label(__($langPrefix . 'article.field.created'))
                ->addFilter(UtcFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__($langPrefix . 'article.field.modified'))
                ->disabled();

            if (WarderHelper::tableExists('users')) {
                // Author
                $this->userModal('created_by')
                    ->label(__($langPrefix . 'article.field.author'));

                // Modified User
                $this->userModal('modified_by')
                    ->label(__($langPrefix . 'article.field.modifiedby'))
                    ->readonly();
            }
        });
    }
}
