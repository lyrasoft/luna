<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\MetaRule;

use Lyrasoft\Luna\Enum\MetaRuleOverrideMode;
use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Field\UserModalField;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Attributes\Fieldset;
use Windwalker\Form\Attributes\FormDefine;
use Windwalker\Form\Attributes\NS;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;

class MetaRuleEditForm
{
    use TranslatorTrait;
    use LocaleAwareTrait;

    #[FormDefine]
    #[NS('item')]
    public function main(Form $form): void
    {
        $form->add('title', TextField::class)
            ->label($this->trans('unicorn.field.title'))
            ->addFilter('trim')
            ->required(true);

        $form->add('id', HiddenField::class);
    }

    #[FormDefine]
    #[Fieldset('basic')]
    #[NS('item')]
    public function basic(Form $form): void
    {
        $form->add('pattern', TextField::class)
            ->label($this->trans('luna.meta.rule.field.pattern'))
            ->description($this->trans('luna.meta.rule.field.pattern.desc'))
            ->addFilter('trim')
            ->required(true);

        $form->add('exclude_pattern', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.exclude.pattern'))
            ->description($this->trans('luna.meta.rule.field.exclude.pattern.desc'))
            ->rows(4);
    }

    #[FormDefine]
    #[Fieldset('publishing')]
    #[NS('item')]
    public function publishing(Form $form): void
    {
        $form->add('state', SwitcherField::class)
            ->label($this->trans('unicorn.field.published'))
            ->circle(true)
            ->color('success')
            ->defaultValue('1');

        if ($this->isLocaleEnabled()) {
            $form->add('language', LanguageListField::class)
                ->label($this->trans('luna.field.language'))
                ->option($this->trans('luna.language.all'), '*');
        }

        $overrideMode = $form->add('override_mode', ListField::class)
            ->label($this->trans('luna.meta.rule.field.override.mode'))
            ->required(true);

        foreach (MetaRuleOverrideMode::cases() as $mode) {
            $overrideMode->option(
                $mode->getTitle($this->lang) . ' - ' . $mode->getDescription($this->lang),
                $mode->value
            );
        }

        $form->add('description', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.description'))
            ->rows(3);
    }

    #[FormDefine]
    #[Fieldset('info')]
    #[NS('item')]
    public function info(Form $form): void
    {
        $form->add('created', CalendarField::class)
            ->label($this->trans('unicorn.field.created'))
            ->disabled(true);

        $form->add('created_by', UserModalField::class)
            ->label($this->trans('unicorn.field.author'))
            ->disabled(true);

        $form->add('modified', CalendarField::class)
            ->label($this->trans('unicorn.field.modified'))
            ->disabled(true);

        $form->add('modified_by', UserModalField::class)
            ->label($this->trans('unicorn.field.modified.by'))
            ->disabled(true);
    }

    #[FormDefine]
    #[Fieldset('meta')]
    #[NS('item/meta')]
    public function meta(Form $form): void
    {
        $form->add('title', TextField::class)
            ->label($this->trans('luna.page.field.meta.title'));

        $form->add('description', TextareaField::class)
            ->label($this->trans('luna.page.field.meta.desc'))
            ->rows(3);

        $form->add('keywords', TextField::class)
            ->label($this->trans('luna.page.field.meta.keyword'));

        $form->add('robots', ListField::class)
            ->label($this->trans('luna.meta.rule.field.robots'))
            ->option($this->trans('luna.meta.rule.robots.none'), '')
            ->option('index, follow', 'index,follow')
            ->option('noindex, follow', 'noindex,follow')
            ->option('index, nofollow', 'index,nofollow')
            ->option('noindex, nofollow', 'noindex,nofollow');

        $form->add('ogTitle', TextField::class)
            ->label($this->trans('luna.page.field.og.title'));

        $form->add('ogDescription', TextareaField::class)
            ->label($this->trans('luna.page.field.og.desc'))
            ->rows(3);

        // Facebook link cover size (1.91:1). Cropped in the browser, then uploaded with the form.
        $form->add('ogImage', SingleImageDragField::class)
            ->label($this->trans('luna.page.field.og.image'))
            ->crop(true)
            ->width(1200)
            ->height(630)
            ->showSizeNotice(true);
    }

    #[FormDefine]
    #[Fieldset('json_ld')]
    #[NS('item')]
    public function jsonLd(Form $form): void
    {
        $form->add('json_ld', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.json.ld'))
            ->description($this->trans('luna.meta.rule.field.json.ld.desc'))
            ->rows(10);
    }

    #[FormDefine]
    #[Fieldset('custom_code')]
    #[NS('item/custom_codes')]
    public function customCode(Form $form): void
    {
        $form->add('head', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.custom.code.head'))
            ->description($this->trans('luna.meta.rule.field.custom.code.desc'))
            ->rows(6);

        $form->add('body', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.custom.code.body'))
            ->rows(6);
    }
}
