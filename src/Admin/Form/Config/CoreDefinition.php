<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Config;

use Lyrasoft\Luna\Admin\Field\Config\ConfigListField;
use Lyrasoft\Luna\Admin\Field\Config\ConfigModalField;
use Lyrasoft\Luna\Field\MultiUploaderField;
use Phoenix\Form\Filter\ServerTZFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Form\Filter\MaxLengthFilter;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;

/**
 * The ConfigEditDefinition class.
 *
 * @since  1.0
 */
class CoreDefinition extends AbstractFieldDefinition
{
    use PhoenixFieldTrait;

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
        $this->fieldset('basic', function () {
            $this->text('ga')
                ->label('Google Analytics');

            $this->add('banners', MultiUploaderField::class)
                ->label('Banners')
                ->accept('image/*')
                ->readonly(true);
        });

        $this->fieldset('advanced', function () {
            //
        });
    }
}
