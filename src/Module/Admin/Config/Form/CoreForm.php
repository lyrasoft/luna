<?php

namespace Lyrasoft\Luna\Module\Admin\Config\Form;

use InvalidArgumentException;
use Unicorn\Field\InlineField;
use Unicorn\Field\RepeatableField;
use Windwalker\Form\Field\ListField;
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

                $form->add('qwe', RepeatableField::class)
                    ->colWidths(3, 3, 6)
                    ->layout(RepeatableField::LAYOUT_GRID)
                    ->rwdBreakpoint('xl')
                    ->configureForm(
                        function (Form $form) {
                            $form->add('county', ListField::class)
                                ->label('縣市');
                            $form->add('dist', ListField::class)
                                ->label('區域');
                            $form->add('address', TextField::class)
                                ->label('街道地址');
                        }
                    );
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
