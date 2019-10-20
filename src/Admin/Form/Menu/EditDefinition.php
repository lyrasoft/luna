<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Menu;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Field\Menu\MenuListField;
use Lyrasoft\Luna\Admin\Field\Menu\MenuModalField;
use Lyrasoft\Luna\Admin\Field\Menu\TypeListField;
use Lyrasoft\Luna\Admin\Field\Menu\ViewListField;
use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
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
//        $this->text('alias')
//            ->label(__($langPrefix . 'menu.field.alias'))
//            ->description(__($langPrefix . 'menu.field.alias.desc'))
//            ->maxlength(255);
        
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

            $this->add('view', ViewListField::class)
                ->label(__($langPrefix . 'menu.field.view'))
                ->class('has-select2')
                ->option(__($langPrefix . 'menu.field.view.select'), '')
                ->required(true);

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
                ->required(true)
                ->set('allow_add', false);

            $this->list('target')
                ->label(__($langPrefix . 'menu.field.target'))
                ->option(__($langPrefix . 'menu.field.target.option.blank'), '_blank')
                ->option(__($langPrefix . 'menu.field.target.option.self'), '_self')
                ->option(__($langPrefix . 'menu.field.target.option.parent'), '_parent')
                ->option(__($langPrefix . 'menu.field.target.option.top'), '_top')
                ->defaultValue('_self')
                ->class('has-select2')
                ->required(true);

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(__($langPrefix . 'category.field.language'))
                    ->option(__($langPrefix . 'field.language.all'), '*');
            }

            // State
            $this->switch('hidden')
                ->label(__($langPrefix . 'menu.field.hidden'))
                ->class('')
                ->color('warning')
                ->circle(true)
                ->defaultValue(0);

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
