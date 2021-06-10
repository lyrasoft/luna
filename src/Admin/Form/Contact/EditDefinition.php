<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Contact;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Form\Filter\ServerTZFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Legacy\Core\Form\AbstractFieldDefinition;
use Windwalker\Legacy\Core\Language\Translator;
use Windwalker\Legacy\Form\Form;
use Windwalker\Legacy\Validator\Rule;

/**
 * The ContactEditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
    use PhoenixFieldTrait;
    use LunaFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     *
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        $langPrefix = LunaHelper::getLangPrefix();

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            // ID
            $this->hidden('id');

            // Title
            $this->text('subject')
                ->label(__($langPrefix . '.contact.field.subject'))
                ->addFilter('trim')
                ->required(true);

            // Email
            $this->email('email')
                ->label(__($langPrefix . '.contact.field.email'))
                ->addFilter('trim')
                ->addValidator(Rule\EmailValidator::class)
                ->addClass('validate-email')
                ->required(true);

            // Name
            $this->text('name')
                ->label(__($langPrefix . '.contact.field.name'))
                ->addFilter('trim')
                ->required(true);

            // URL
            $this->url('url')
                ->label(__($langPrefix . '.contact.field.url'))
                ->addValidator(Rule\UrlValidator::class)
                ->set('class', 'validate-url');

            // Phone
            $this->text('phone')
                ->label(__($langPrefix . '.contact.field.phone'))
                ->addFilter('trim');
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            // Content
            $this->textarea('content')
                ->label(__($langPrefix . '.contact.field.content'))
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->list('state')
                ->label(__($langPrefix . 'contact.field.state'))
                ->addClass('has-select2')
                ->defaultValue(1)
                ->option(__($langPrefix . 'contact.state.cancel'), '-1')
                ->option(__($langPrefix . 'contact.state.pending'), '0')
                ->option(__($langPrefix . 'contact.state.handling'), '1')
                ->option(__($langPrefix . 'contact.state.done'), '2');

            // Created
            $this->calendar('created')
                ->label(__($langPrefix . '.contact.field.created'))
                ->addFilter(ServerTZFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__($langPrefix . '.contact.field.modified'))
                ->disabled();

            // Author
            $this->userModal('created_by')
                ->label(__($langPrefix . '.contact.field.author'));

            // Modified User
            $this->userModal('modified_by')
                ->label(__($langPrefix . '.contact.field.modifiedby'))
                ->disabled();
        });
    }
}
