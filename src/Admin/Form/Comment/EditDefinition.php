<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Form\Comment;

use Lyrasoft\Luna\Field\LunaFieldTrait;
use Lyrasoft\Warder\Helper\WarderHelper;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Core\Language\Translator;
use Windwalker\Form\Form;

/**
 * The CommentEditDefinition class.
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

        // Basic fieldset
        $this->fieldset('basic', function (Form $form) use ($langPrefix) {
            // ID
            $this->hidden('id');

            // Type
            $this->hidden('type')
                ->label(__($langPrefix . 'comment.field.type'));

            // Target ID
            $this->text('target_id')
                ->label(__($langPrefix . 'comment.field.target.id'));
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) use ($langPrefix) {
            if (WarderHelper::tableExists('users')) {
                $this->userModal('user_id')
                    ->label(__($langPrefix . 'comment.field.author'));
            }

            // Content
            $this->textarea('content')
                ->label(__($langPrefix . 'comment.field.content'))
                ->rows(10);

            if (WarderHelper::tableExists('users')) {
                $this->userModal('reply_user_id')
                    ->label(__($langPrefix . 'comment.field.replyer'));
            }

            // Reply
            $this->textarea('reply')
                ->label(__($langPrefix . 'comment.field.reply'))
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) use ($langPrefix) {
            // State
            $this->switch('state')
                ->label(__($langPrefix . 'comment.field.published'))
                ->class('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);
        });
    }
}
