<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Form\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Unidev\Field\UnidevFieldTrait;
use Windwalker\Legacy\Core\Form\AbstractFieldDefinition;
use Windwalker\Legacy\Core\Language\Translator;
use Windwalker\Legacy\Form\Form;
use Windwalker\Legacy\Validator\Rule;

/**
 * The EditDefinition class.
 *
 * @since  1.2
 */
class EditDefinition extends AbstractFieldDefinition
{
    use UnidevFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     * @throws \InvalidArgumentException
     */
    protected function doDefine(Form $form)
    {
        $langPrefix = LunaHelper::getLangPrefix();

        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            // Title
            $this->text('subject')
                ->label(__($langPrefix . 'contact.field.subject'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.subject'))
                ->addFilter('trim')
                ->addClass('input-lg')
                ->required(true);

            // Email
            $this->email('email')
                ->label(__($langPrefix . 'contact.field.email'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.email'))
                ->addFilter('trim')
                ->addValidator(Rule\EmailValidator::class)
                ->addClass('validate-email')
                ->required(true);

            // Name
            $this->text('name')
                ->label(__($langPrefix . 'contact.field.name'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.name'))
                ->addFilter('trim')
                ->required(true);

            // URL
            $this->url('url')
                ->label(__($langPrefix . 'contact.field.url'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.url'))
                ->addValidator(Rule\UrlValidator::class)
                ->set('class', 'validate-url');

            // Phone
            $this->text('phone')
                ->label(__($langPrefix . 'contact.field.phone'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.phone'))
                ->addFilter('trim');

            // Content
            $this->textarea('content')
                ->label(__($langPrefix . 'contact.field.content'))
                ->placeholder(__($langPrefix . 'contact.field.placeholder.content'))
                ->rows(10);

            $this->captcha('captcha')
                ->jsVerify(true)
                ->required(true)
                ->autoValidate(true);
        });

        $this->group('details', function (Form $form) use ($langPrefix) {
            // Add details here...
        });
    }
}
