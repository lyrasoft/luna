<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Admin\Field\Category\CategoryListField;
use Lyrasoft\Luna\Admin\Field\Language\LanguageListField;
use Lyrasoft\Luna\Admin\Field\Tag\TagListField;
use Lyrasoft\Luna\Field\Editor\SummernoteEditorField;
use Lyrasoft\Luna\Field\Editor\TinymceEditorField;
use Lyrasoft\Warder\Admin\Field\User\UserModalField;

/**
 * The LunaFieldTrait class.
 *
 * @method  SummernoteEditorField summernoteEditor($name = null, $label = null)
 * @method  TinymceEditorField    tinymceEditor($name = null, $label = null)
 * @method  CategoryListField     categoryList($name = null, $label = null)
 * @method  TagListField          tagList($name = null, $label = null)
 * @method  LanguageListField     languageList($name = null, $label = null)
 * @method  UserModalField        userModal($name = null, $label = null)
 * @method  MultiUploaderField    multiUploader($name = null, $label = null)
 *
 * @since  {DEPLOY_VERSION}
 */
trait LunaFieldTrait
{
    /**
     * bootPhoenixFieldTrait
     *
     * @return  void
     */
    public function bootLunaFieldTrait()
    {
        $this->addNamespace('Lyrasoft\Luna\Field\Editor');
        $this->addNamespace('Lyrasoft\Luna\Field');

        $this->addMap('categoryList', CategoryListField::class);
        $this->addMap('tagList', TagListField::class);
        $this->addMap('languageList', LanguageListField::class);
        $this->addMap('userModal', UserModalField::class);
    }
}
