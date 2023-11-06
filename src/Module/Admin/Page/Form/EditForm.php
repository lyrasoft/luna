<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Page\Form;

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\LocaleSwitchField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\PageBuilder\PageService;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The EditForm class.
 */
class EditForm implements FieldDefinitionInterface
{
    use TranslatorTrait;
    use LocaleAwareTrait;

    public function __construct(protected PageService $pageService)
    {
    }

    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     */
    public function define(Form $form): void
    {
        // Basic fieldset
        $form->fieldset('basic', function (Form $form) {
            // ID
            $form->add('id', HiddenField::class);

            // Title
            $form->add('title', TextField::class)
                ->label($this->trans('luna.page.field.title'))
                ->addFilter('trim')
                ->maxlength(255)
                ->required(true);

            // Alias
            $form->add('alias', TextField::class)
                ->label($this->trans('luna.page.field.alias'))
                ->description($this->trans('luna.page.field.alias.desc'));

            $form->add('category_id', CategoryListField::class)
                ->label($this->trans('luna.page.field.category'))
                ->option($this->trans('unicorn.select.placeholder'))
                ->categoryType('article');

            $form->add('extends', TextField::class)
                ->label($this->trans('luna.page.field.extends'))
                ->registerOptions($this->pageService->getAvailableExtends()->dump())
                ->help($this->trans('luna.page.field.extends.desc'))
                ->required(true)
                ->defaultValue('global.body');

            // State
            $form->add('state', SwitcherField::class)
                ->label($this->trans('luna.page.field.published'))
                ->addClass('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);

            $form->add('image', SingleImageDragField::class)
                ->label($this->trans('luna.page.field.og.image'))
                ->maxWidth(2000)
                ->maxHeight(2000)
                ->crop(false)
                ->showSizeNotice(true);
        });
        $form->fieldset('meta', function (Form $form) {
            if ($this->isLocaleEnabled()) {
                $form->add('language', LocaleSwitchField::class)
                    ->label($this->trans('luna.field.language'))
                    ->table(Page::class)
                    ->required(true)
                    ->allowCreateEmpty(false);
            }

            $form->group('meta', function (Form $form) {
                $form->add('title', TextField::class)
                    ->label($this->trans('luna.page.field.meta.title'));

                $form->add('description', TextareaField::class)
                    ->label($this->trans('luna.page.field.meta.desc'))
                    ->rows(3);

                $form->add('keywords', TextField::class)
                    ->label($this->trans('luna.page.field.meta.keyword'));

                $form->add('og_title', TextField::class)
                    ->label($this->trans('luna.page.field.og.title'));

                $form->add('og_description', TextareaField::class)
                    ->label($this->trans('luna.page.field.og.desc'))
                    ->rows(3);
            });
        });

        // Created fieldset
        $form->fieldset('created', function (Form $form) {
            // Created
            $form->add('created', CalendarField::class)
                ->label($this->trans('luna.page.field.created'));

            // Modified
            $form->add('modified', CalendarField::class)
                ->label($this->trans('luna.page.field.modified'))
                ->disabled(true);

            // Author
            $form->add('created_by', TextField::class)
                ->label($this->trans('luna.page.field.author'));

            // Modified User
            $form->add('modified_by', TextField::class)
                ->label($this->trans('luna.page.field.modifiedby'))
                ->disabled(true);
        });
    }
}
