<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\MetaRule;

use Unicorn\Enum\BasicState;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Attributes\Fieldset;
use Windwalker\Form\Attributes\FormDefine;
use Windwalker\Form\Attributes\NS;
use Windwalker\Form\Field\HiddenField;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\NumberField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;

class MetaRuleEditForm
{
    use TranslatorTrait;

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

        $form->add('override_mode', ListField::class)
            ->label($this->trans('luna.meta.rule.field.override.mode'))
            ->option($this->trans('luna.meta.rule.override.mode.fallback'), 'fallback')
            ->option($this->trans('luna.meta.rule.override.mode.force'), 'force')
            ->required(true);

        $form->add('description', TextareaField::class)
            ->label($this->trans('luna.meta.rule.field.description'))
            ->rows(3);
    }

    #[FormDefine]
    #[Fieldset('publishing')]
    #[NS('item')]
    public function publishing(Form $form): void
    {
        $form->add('state', ListField::class)
            ->label($this->trans('unicorn.field.state'))
            ->registerFromEnums(BasicState::class, $this->lang)
            ->defaultValue('1');

        $form->add('ordering', NumberField::class)
            ->label($this->trans('unicorn.field.ordering'))
            ->description($this->trans('luna.meta.rule.field.ordering.desc'))
            ->defaultValue(0);
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

        $form->add('og_title', TextField::class)
            ->label($this->trans('luna.page.field.og.title'));

        $form->add('og_description', TextareaField::class)
            ->label($this->trans('luna.page.field.og.desc'))
            ->rows(3);

        $form->add('og_image', TextField::class)
            ->label($this->trans('luna.page.field.og.image'));
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
