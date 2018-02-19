<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Language;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ModalField;

/**
 * The LanguageModalField class.
 *
 * @since  1.0
 */
class LanguageModalField extends ModalField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::LANGUAGES;

    /**
     * Property view.
     *
     * @var  string
     */
    protected $view = 'languages';

    /**
     * Property titleField.
     *
     * @var  string
     */
    protected $titleField = 'title';

    /**
     * Property keyField.
     *
     * @var  string
     */
    protected $keyField = 'id';

    /**
     * buildInput
     *
     * @param array $attrs
     *
     * @return  string
     */
    public function buildInput($attrs)
    {
        $this->package = LunaHelper::getPackage()->getCurrentPackage()->getName();

        return parent::buildInput($attrs);
    }

    /**
     * getUrl
     *
     * @return  string
     */
    protected function getUrl()
    {
        if ($this->get('published', false)) {
            $query = (array) $this->get('query');

            $query['filter']['language.state'] = 1;

            $this->set('query', $query);
        }

        return parent::getUrl();
    }
}
