<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Registration\Form;

use Unicorn\Field\CalendarField;
use Windwalker\Core\Attributes\Ref;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Filter\Rule\EmailAddress;
use Windwalker\Form\Field\EmailField;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\PasswordField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The EditForm class.
 */
class RegistrationForm implements FieldDefinitionInterface
{
    use TranslatorTrait;
    
    /**
     * RegistrationForm constructor.
     */
    public function __construct(#[Ref('user')] protected $config)
    {
    }

    /**
     * Define the form fields.
     *
     * @param    Form  $form  The Windwalker form object.
     *
     * @return    void
     */
    public function define(Form $form): void
    {
        $loginName = $this->config['login_name'] ?? 'username';

        $form->fieldset('basic', function (Form $form) use ($loginName) {
            if ($loginName !== 'email') {
                $form->add($loginName, TextField::class)
                    ->label($this->trans('luna.user.field.' . $loginName))
                    ->addFilter('trim')
                    ->required(true);
            }

            $form->add('email', EmailField::class)
                ->label($this->trans('luna.user.field.email'))
                ->addValidator(EmailAddress::class)
                ->addFilter('trim')
                ->required(true);

            $form->add('name', TextField::class)
                ->label($this->trans('luna.user.field.name'))
                ->required(true)
                ->addFilter('trim');

            $form->add('password', PasswordField::class)
                ->label($this->trans('luna.user.field.password'))
                ->required(true)
                ->attr('data-role', 'password')
                ->autocomplete('new-password');

            $form->add('password2', PasswordField::class)
                ->label($this->trans('luna.user.field.password.confirm'))
                ->attr('data-validate', 'password-confirm')
                ->attr('data-confirm-target', '[data-role=password]')
                ->attr('data-custom-error-message', $this->trans('luna.forget.reset.message.password.not.match'))
                ->autocomplete('new-password');
        });
    }
}
