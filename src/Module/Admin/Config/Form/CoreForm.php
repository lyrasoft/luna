<?php

namespace Lyrasoft\Luna\Module\Admin\Config\Form;

use InvalidArgumentException;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;

/**
 * The ConfigEditDefinition class.
 *
 * @since  1.0
 */
class CoreForm implements FieldDefinitionInterface
{
    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     *
     * @throws InvalidArgumentException
     */
    public function define(Form $form): void
    {
        $form->fieldset(
            'basic',
            function (Form $form) {
                $form->add('ga', TextField::class)
                    ->label('Google Analytics')
                    ->placeholder('UA-xxx-xxxx-xxxx');

                $form->add('gtm', TextField::class)
                    ->label('Google Tag Manager')
                    ->placeholder('GTM-XXXXXXX');

                $form->add('google_search_console', TextField::class)
                    ->label('Search Console');
            }
        );

        $form->fieldset(
            'advanced',
            function () {
                //
            }
        );
    }
}
