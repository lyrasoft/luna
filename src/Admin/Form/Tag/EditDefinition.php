<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Tag;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\Filter\ServerTZFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The TagEditDefinition class.
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
        $langPrefix = LunaHelper::getLangPrefix();

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            // ID
            $this->hidden('id');

            // Title
            /** @noinspection PhpDeprecationInspection */
            $this->text('title')
                ->label(__($langPrefix . 'tag.field.title'))
                ->addFilter('trim')
                ->required(true);

            // Alias
            $this->text('alias')
                ->label(__($langPrefix . 'tag.field.alias'));
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->switch('state')
                ->label(__($langPrefix . 'tag.field.published'))
                ->class('')
                ->circle(true)
                ->color('success')
                ->defaultValue(1);

            // Created
            $this->calendar('created')
                ->label(__($langPrefix . 'tag.field.created'))
                ->addFilter(ServerTZFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__($langPrefix . 'tag.field.modified'))
                ->disabled();

            if (WarderHelper::tableExists('users')) {
                // Author
                $this->userModal('created_by')
                    ->label(__($langPrefix . 'tag.field.author'));

                // Modified User
                $this->userModal('modified_by')
                    ->label(__($langPrefix . 'tag.field.modifiedby'))
                    ->disabled();
            }
        });
    }
}
