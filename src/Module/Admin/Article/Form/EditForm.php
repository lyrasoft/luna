<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Article\Form;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Field\CategoryListField;
use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Field\LocaleSwitchField;
use Lyrasoft\Luna\Field\PageModalField;
use Lyrasoft\Luna\Field\TagListField;
use Lyrasoft\Luna\Field\UserModalField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Unicorn\Field\TinymceEditorField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Attributes\Fieldset;
use Windwalker\Form\Attributes\FormDefine;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

class EditForm
{
    use TranslatorTrait;
    use LocaleAwareTrait;

    public function __construct(protected ?string $type = 'article')
    {
    }

    #[FormDefine]
    public function main(Form $form): void
    {
        $form->add('title', TextField::class)
            ->label($this->trans('unicorn.field.title'))
            ->addFilter('trim')
            ->required(true);

        $form->add('alias', TextField::class)
            ->label($this->trans('unicorn.field.alias'))
            ->addFilter('trim');

        $form->add('id', HiddenField::class);

        if ($this->isLocaleEnabled()) {
            $form->add('language', LocaleSwitchField::class)
                ->label($this->trans('luna.field.language'))
                ->table(Article::class)
                ->required(true)
                ->allowCreateEmpty(true);
        }
    }

    #[FormDefine]
    #[Fieldset('text')]
    public function text(Form $form): void
    {
        $form->add('introtext', TinymceEditorField::class)
            ->label($this->trans('luna.article.field.introtext'))
            ->editorOptions(
                [
                    'height' => 400,
                ]
            );

        $form->add('fulltext', TinymceEditorField::class)
            ->label($this->trans('luna.article.field.fulltext'))
            ->rows(7)
            ->editorOptions(
                [
                    'height' => 550,
                ]
            );
    }

    #[FormDefine]
    #[Fieldset('meta')]
    public function meta(Form $form): void
    {
        $form->add('category_id', CategoryListField::class)
            ->label($this->trans('luna.article.field.category'))
            ->categoryType((string) $this->type);

        $form->add('tags', TagListField::class)
            ->label($this->trans('luna.article.field.tags'))
            ->multiple(true);

        $form->add('page_id', PageModalField::class)
            ->label($this->trans('luna.article.field.page'));

        $form->add('image', SingleImageDragField::class)
            ->label($this->trans('unicorn.field.image'))
            ->crop(true)
            ->width(800)
            ->height(600);

        $form->add('state', SwitcherField::class)
            ->label($this->trans('unicorn.field.published'))
            ->circle(true)
            ->color('success');

        $form->add('created', CalendarField::class)
            ->label($this->trans('unicorn.field.created'));

        $form->add('modified', CalendarField::class)
            ->label($this->trans('unicorn.field.modified'))
            ->disabled(true);

        $form->add('created_by', UserModalField::class)
            ->label($this->trans('unicorn.field.author'));

        $form->add('modified_by', UserModalField::class)
            ->label($this->trans('unicorn.field.modified_by'))
            ->disabled(true);

        $form->add('type', HiddenField::class)
            ->label('Type');
    }
}
