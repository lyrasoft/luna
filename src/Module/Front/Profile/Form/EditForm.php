<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Profile\Form;

use Lyrasoft\Luna\LunaPackage;
use Unicorn\Enum\BasicState;
use Unicorn\Field\SingleImageDragField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Filter\Rule\EmailAddress;
use Windwalker\Form\Field\EmailField;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\PasswordField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The EditForm class.
 */
class EditForm implements FieldDefinitionInterface
{
    use TranslatorTrait;

    public function __construct(protected LunaPackage $luna)
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
        $loginName = $this->luna->getLoginName();

        $form->fieldset(
            'basic',
            function (Form $form) use ($loginName) {
                $form->add('avatar', SingleImageDragField::class)
                    ->label($this->trans('luna.user.field.avatar'))
                    ->crop(true)
                    ->width(400)
                    ->height(400);

                $form->add('name', TextField::class)
                    ->label($this->trans('luna.user.field.name'))
                    ->required(true)
                    ->addFilter('trim');

                if ($loginName !== 'email') {
                    $form->add($loginName, TextField::class)
                        ->label($this->trans('luna.user.field.' . $loginName))
                        ->required(true)
                        ->addFilter('trim');
                }

                $form->add('email', EmailField::class)
                    ->label($this->trans('luna.user.field.email'))
                    ->required(true)
                    ->addFilter('trim')
                    ->addValidator(EmailAddress::class);

            }
        );

        $form->fieldset(
            'password',
            function (Form $form) {
                $form->add('password', PasswordField::class)
                    ->label($this->trans('luna.user.field.password'))
                    ->autocomplete('new-password');

                $form->add('password2', PasswordField::class)
                    ->label($this->trans('luna.user.field.password.confirm'))
                    ->autocomplete('new-password');
            }
        );
    }
}
