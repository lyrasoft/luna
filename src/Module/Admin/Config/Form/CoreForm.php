<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module\Admin\Config\Form;

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
     * @throws \InvalidArgumentException
     */
    public function define(Form $form): void
    {
        $form->fieldset(
            'basic',
            function (Form $form) {
                $form->add('ga', \Windwalker\Form\Field\TextField::class)
                    ->label('Google Analytics')
                    ->placeholder('UA-xxx-xxxx-xxxx');

                $form->add('google_search_console', \Windwalker\Form\Field\TextField::class)
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
