<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Admin\Category\Form;

use App\Entity\Category;
use App\Field\CategoryListField;
use App\Field\ProductModalField;
use App\Field\RegionCategoryListField;
use App\Field\UserModalField;
use App\Services\CategoryService;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Unicorn\Field\TinymceEditorField;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * The CategoryEditDefinition class.
 *
 * @since  1.0
 */
class EditForm implements FieldDefinitionInterface
{
    use UnidevFieldTrait;
    use LunaFieldTrait;

    /**
     * EditForm constructor.
     */
    public function __construct(protected AppRequest $request, protected ORM $orm)
    {
    }

    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     * @throws \InvalidArgumentException
     */
    public function define(Form $form): void
    {
        $langPrefix = 'luna.';

        $type = $this->request->input('type');

        // Basic fieldset
        $form->fieldset(
            'basic',
            function (Form $form) use ($langPrefix, $type) {
                // ID
                $form->add('id', \Windwalker\Form\Field\HiddenField::class);

                // Code
                $form->add('code', \Windwalker\Form\Field\HiddenField::class);

                // Region ID
                $form->add('region_id', \Windwalker\Form\Field\HiddenField::class);

                // Title
                $form->add('title', \Windwalker\Form\Field\TextField::class)
                    ->label(__($langPrefix . 'category.field.title'))
                    ->placeholder(__($langPrefix . 'category.field.title'))
                    ->addFilter('trim')
                    ->required(true);

                // Alias
                $form->add('alias', \Windwalker\Form\Field\TextField::class)
                    ->label(__($langPrefix . 'category.field.alias'))
                    ->placeholder(__($langPrefix . 'category.field.alias'));

                // Parent
                $form->add('parent_id', CategoryListField::class)
                    ->label(__($langPrefix . 'category.field.parent'))
                    ->addClass('has-choices')
                    ->option(__($langPrefix . 'category.root'), 1)
                    ->categoryType($type)
                    ->configureQuery(
                        function (\Windwalker\Query\Query $query) {
                            if ($id = $this->request->input('id')) {
                                /** @var Category $self */
                                $self = $this->orm->mapper(Category::class)->findOne($id);

                                $query->whereRaw('(lft < ' . $self->getLft() . ' OR rgt > ' . $self->getRgt() . ')');
                            }
                        }
                    );

                if ($type === CategoryService::TYPE_COUNTRY) {
                    $form->add('region_category_id', RegionCategoryListField::class)
                        ->label('Region Category');
                }

                if ($type === CategoryService::TYPE_PRODUCT
                    || $type === CategoryService::TYPE_SOLUTION
                    || $type === CategoryService::TYPE_FAQ
                ) {
                    $form->add('image', SingleImageDragField::class)
                        ->label(__($langPrefix . 'category.field.images'))
                        ->showSizeNotice(true);
                }

                if ($type === CategoryService::TYPE_FAQ) {
                    $form->add('background', SingleImageDragField::class)
                        ->label(__($langPrefix . 'category.field.background'))
                        ->version(2)
                        ->exportZoom(2)
                        ->showSizeNotice(true)
                        ->width(400)
                        ->height(300);
                }

                // Description
                $form->add('description', TinymceEditorField::class)
                    ->label(__($langPrefix . 'category.field.description'))
                    ->editorOptions(
                        [
                            'height' => 450,
                        ]
                    )
                    ->rows(10);

                if ($type === CategoryService::TYPE_ARTICLE) {
                    $form->add('authority', \Windwalker\Form\Field\ListField::class)
                        ->label(__('datavideo.category.field.authority'))
                        ->option(__('datavideo.category.field.authority.public'), 0)
                        ->option(__('datavideo.category.field.authority.reseller'), 1)
                        ->defaultValue(0)
                        ->class('has-select2');
                }

                // Related Products
                if ($type === CategoryService::TYPE_PRODUCT) {
                    $form->add('related_products', ProductModalField::class)
                        ->label(__('datavideo.category.field.related.accessories'))
                        ->multiple(true)
                        ->sortable(true);
                }

                $form->add('type', \Windwalker\Form\Field\HiddenField::class)
                    ->label(__($langPrefix . 'category.field.type'));
            }
        );

        // Created fieldset
        $form->fieldset(
            'created',
            function (Form $form) use ($langPrefix, $type) {
                // State
                $form->add('state', SwitcherField::class)
                    ->label(__($langPrefix . 'category.field.published'))
                    ->class('')
                    ->circle(true)
                    ->color('success')
                    ->defaultValue(1);

                if ($type === CategoryService::TYPE_PRODUCT) {
                    $form->add('pin_to_top', SwitcherField::class)
                        ->label(__('datavideo.category.field.pin.to.top'))
                        ->class('')
                        ->circle(true)
                        ->color('success')
                        ->defaultValue(0);
                }

                // Created
                $form->add('created', CalendarField::class)
                    ->label(__($langPrefix . 'category.field.created'));

                // Modified
                $form->add('modified', CalendarField::class)
                    ->label(__($langPrefix . 'category.field.modified'))
                    ->disabled(true);

                if (WarderHelper::tableExists('users')) {
                    // Author
                    $form->add('created_by', UserModalField::class)
                        ->label(__($langPrefix . 'category.field.author'));

                    // Modified User
                    $form->add('modified_by', UserModalField::class)
                        ->label(__($langPrefix . 'category.field.modifiedby'))
                        ->disabled(true);
                }
            }
        );
    }
}
