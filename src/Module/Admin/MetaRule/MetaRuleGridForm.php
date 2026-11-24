<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\MetaRule;

use Lyrasoft\Luna\Enum\MetaRuleOverrideMode;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Attributes\FormDefine;
use Windwalker\Form\Attributes\NS;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\SearchField;
use Windwalker\Form\Form;

class MetaRuleGridForm
{
    use TranslatorTrait;

    #[FormDefine]
    #[NS('search')]
    public function search(Form $form): void
    {
        $form->add('*', SearchField::class)
            ->label($this->trans('unicorn.grid.search.label'))
            ->placeholder($this->trans('unicorn.grid.search.label'))
            ->onchange('this.form.submit()');
    }

    #[FormDefine]
    #[NS('filter')]
    public function filter(Form $form): void
    {
        $form->add('meta_rule.state', ListField::class)
            ->label($this->trans('unicorn.field.state'))
            ->option($this->trans('unicorn.select.placeholder'), '')
            ->registerFromEnums(BasicState::class, $this->lang)
            ->onchange('this.form.submit()');
    }

    #[FormDefine]
    #[NS('batch')]
    public function batch(Form $form): void
    {
        $form->add('state', ListField::class)
            ->label($this->trans('unicorn.field.state'))
            ->option($this->trans('unicorn.select.no.change'), '')
            ->registerFromEnums(BasicState::class, $this->lang);

        $form->add('override_mode', ListField::class)
            ->label($this->trans('luna.meta.rule.field.override.mode'))
            ->option($this->trans('unicorn.select.no.change'), '')
            ->registerFromEnums(MetaRuleOverrideMode::class, $this->lang);

        $form->add('robots', ListField::class)
            ->label($this->trans('luna.meta.rule.field.robots'))
            ->option($this->trans('unicorn.select.no.change'), '')
            ->option($this->trans('luna.meta.rule.robots.none'), '__none__')
            ->option('index, follow', 'index,follow')
            ->option('noindex, follow', 'noindex,follow')
            ->option('index, nofollow', 'index,nofollow')
            ->option('noindex, nofollow', 'noindex,nofollow');
    }
}
