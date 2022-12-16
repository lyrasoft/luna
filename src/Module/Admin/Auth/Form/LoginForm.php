<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Auth\Form;

use Windwalker\Core\Attributes\Ref;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Form\Field\EmailField;
use Windwalker\Form\Field\PasswordField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

use function Windwalker\DOM\h;

/**
 * The LoginForm class.
 */
class LoginForm implements FieldDefinitionInterface
{
    use TranslatorTrait;

    public function __construct(
        #[Ref('user')]
        protected array $config
    ) {
        //
    }

    public function define(Form $form): void
    {
        $this->useLangNamespace('luna.');

        $form->ns('user', function (Form $form) {
            $loginName = $this->config['login_name'] ?? 'username';

            if ($loginName === 'email') {
                $form->add('email', EmailField::class)
                    ->label($this->trans('user.field.email'))
                    ->required(true);
            } else {
                $form->add($loginName, TextField::class)
                    ->label($this->trans('user.field.' . $loginName))
                    ->required(true);
            }

            $form->add('password', PasswordField::class)
                ->label($this->trans('user.field.password'))
                ->required(true)
                ->set(
                    'append',
                    <<<HTML
                    <button type="button" class="btn btn-outline-primary"
                        data-bs-toggle="tooltip" title="生物辨識"
                        data-task="webauthn"
                        >
                        <i class="fa-solid fa-fingerprint"></i>
                    </button>
                    HTML
                );
        });
    }
}
