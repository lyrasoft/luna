<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Module;

use Lyrasoft\Luna\Admin\Field\Module\PositionListField;
use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The ModuleEditDefinition class.
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
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        $langPrefix = \Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix();

        // Title
        $this->text('title')
            ->label(__($langPrefix . 'module.field.title'))
            ->addFilter('trim')
            ->labelClass('hide')
            ->required(true);

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {

        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            // Content
            $this->tinymceEditor('content')
                ->label(__($langPrefix . 'module.field.content'))
                ->rows(10)
                ->editorOptions([
                    'height' => 400,
                ]);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->switch('state')
                ->label(__($langPrefix . 'module.field.published'))
                ->class('')
                ->circle(true)
                ->color('success')
                ->defaultValue(1);

            // Position
            $this->add('position', new PositionListField)
                ->label(__($langPrefix . 'module.field.position'))
                ->option(__($langPrefix . 'field.position.select'), '')
                ->set('allow_add', true);

            // Type
            $this->text('type')
                ->label(__($langPrefix . 'module.field.type'))
                ->readonly()
                ->required();

            if (Locale::isEnabled()) {
                // Language
                $this->languageList('language')
                    ->label(__($langPrefix . 'module.field.language'))
                    ->option(__($langPrefix . 'field.language.all'), '*');
            }

            if (WarderHelper::tableExists('users')) {
                // Created
                $this->calendar('created')
                    ->label(__($langPrefix . 'module.field.created'))
                    ->addFilter(UtcFilter::class);

                // Author
                $this->userModal('created_by')
                    ->label(__($langPrefix . 'module.field.author'));
            }

            // Note
            $this->textarea('note')
                ->label(__($langPrefix . 'module.field.note'))
                ->rows(5);

            // ID
            $this->hidden('id');
        });
    }
}
