<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Menu;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Field\Menu\MenuListField;
use Lyrasoft\Luna\Admin\Field\Menu\MenuModalField;
use Lyrasoft\Luna\Admin\Field\Menu\TypeListField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Ioc;
use Windwalker\Form\Filter\MaxLengthFilter;
use Windwalker\Form\Form;
use Windwalker\Query\Query;
use Windwalker\Validator\Rule;

/**
 * The MenuEditDefinition class.
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
     *
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        $langPrefix = LunaHelper::getLangPrefix();

        // Title
        $this->text('title')
            ->label(__($langPrefix . 'menu.field.title'))
            ->addFilter('trim')
            ->maxlength(255)
            ->required(true);

        // Alias
        $this->text('alias')
            ->label(__($langPrefix . 'menu.field.alias'))
            ->description(__($langPrefix . 'menu.field.alias.desc'))
            ->maxlength(255);
        
        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            $type = Ioc::getInput()->get('type');

            // ID
            $this->hidden('id');

            // Parent
            $this->menuList('parent_id')
                ->label(__($langPrefix . 'menu.field.parent'))
                ->class('has-select2')
                ->option(__($langPrefix . 'menu.root'), 1)
                ->menuType($type)
                ->postQueryHandler(function (Query $query) {
                    $input = Ioc::getInput();

                    if ($id = $input->get('id')) {
                        $self = MenuMapper::findOne($id);

                        $query->where('(lft < ' . $self->lft . ' OR rgt > ' . $self->rgt . ')');
                    }
                });

            // Image
//            $this->text('image')
//                ->label(__($langPrefix . 'menu.field.image'))
//                ->maxlength(255);
//
//            // URL
//            $this->text('url')
//                ->label(__($langPrefix . 'menu.field.url'))
//                ->maxlength(255)
//                ->addValidator(Rule\UrlValidator::class)
//                ->attr('data-validate', 'url');
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            // Introtext
            $this->textarea('introtext')
                ->label(__($langPrefix . 'menu.field.introtext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);

            // Fulltext
            $this->textarea('fulltext')
                ->label(__($langPrefix . 'menu.field.fulltext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            $type = Ioc::getInput()->get('type');

            // State
            $this->switch('state')
                ->label(__($langPrefix . 'menu.field.published'))
                ->class('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);

            // Type
            $this->add('type', TypeListField::class)
                ->label(__($langPrefix . 'menu.field.type'))
                ->option(__($langPrefix . 'menu.field.type.select'), '')
                ->defaultValue($type)
                ->set('allow_add', true);

            // Created
            $this->calendar('created')
                ->label(__($langPrefix . 'menu.field.created'))
                ->addFilter(UtcFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__($langPrefix . 'menu.field.modified'))
                ->addFilter(UtcFilter::class)
                ->disabled();

            // Author
            $this->add('created_by', UserModalField::class)
                ->label(__($langPrefix . 'menu.field.author'));

            // Modified User
            $this->add('modified_by', UserModalField::class)
                ->label(__($langPrefix . 'menu.field.modifiedby'))
                ->disabled();
        });
    }
}
