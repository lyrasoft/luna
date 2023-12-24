<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\User\Form;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Field\UserRoleListField;
use Lyrasoft\Luna\LunaPackage;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Field\SwitcherField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Filter\Rule\EmailAddress;
use Windwalker\Form\Field\EmailField;
use Windwalker\Form\Field\HiddenField;
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

    public function __construct(
        protected LunaPackage $luna,
        protected AccessService $accessService,
        protected SRPService $srpService,
    ) {
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
                $form->add('name', TextField::class)
                    ->label($this->trans('luna.user.field.name'))
                    ->required(true)
                    ->addFilter('trim');

                if ($loginName !== 'email') {
                    $form->add($loginName, TextField::class)
                        ->label($this->trans('luna.user.field.' . $loginName))
                        ->attr('data-input-identity', true)
                        ->required(true)
                        ->addFilter('trim');
                }

                $form->add('email', EmailField::class)
                    ->label($this->trans('luna.user.field.email'))
                    ->attr('data-input-identity', $loginName === 'email')
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
                    ->attr('data-role', 'password')
                    ->attr('data-input-password', true)
                    ->attr(
                        'data-value-missing-message',
                        $this->trans('luna.user.field.validate.change.identity.required.password')
                    )
                    ->autocomplete('new-password');

                $form->add('password2', PasswordField::class)
                    ->label($this->trans('luna.user.field.password.confirm'))
                    ->attr('data-validate', 'password-confirm')
                    ->attr('data-confirm-target', '[data-role=password]')
                    ->attr('data-custom-error-message', $this->trans('luna.message.password.not.match'))
                    ->attr('data-srp-override', true)
                    ->autocomplete('new-password');
            }
        );

        $form->fieldset(
            'meta',
            function (Form $form) {
                $form->add('avatar', SingleImageDragField::class)
                    ->label($this->trans('luna.user.field.avatar'))
                    ->crop(true)
                    ->width(400)
                    ->height(400);

                if ($this->accessService->canSelectUserRoles()) {
                    $form->add('roles', UserRoleListField::class)
                        ->label($this->trans('luna.user.field.roles'))
                        ->multiple(true)
                        ->addClass('has-tom-select');
                }

                $form->add('enabled', SwitcherField::class)
                    ->label($this->trans('luna.user.field.enabled'))
                    ->circle(true)
                    ->color('success');

                $form->add('receive_mail', SwitcherField::class)
                    ->label($this->trans('luna.user.field.receive_mail'))
                    ->circle(true)
                    ->color('primary');

                $form->add('last_reset', CalendarField::class)
                    ->label($this->trans('luna.user.field.last_reset'))
                    ->disabled(true);

                $form->add('last_login', CalendarField::class)
                    ->label($this->trans('luna.user.field.last_login'))
                    ->disabled(true);

                $form->add('registered', CalendarField::class)
                    ->label($this->trans('luna.user.field.registered'))
                    ->disabled(true);

                $form->add('modified', CalendarField::class)
                    ->label($this->trans('unicorn.field.modified'))
                    ->disabled(true);
            }
        );

        $form->add('id', HiddenField::class);
    }
}
