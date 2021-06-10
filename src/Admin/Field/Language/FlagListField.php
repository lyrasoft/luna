<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Language;

use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Script\Select2Script;
use Windwalker\Legacy\Filesystem\File;
use Windwalker\Legacy\Filesystem\Folder;
use Windwalker\Legacy\Form\Field\ListField;
use Windwalker\Legacy\Html\Option;

/**
 * The FlagListField class.
 *
 * @since  1.0
 */
class FlagListField extends ListField
{
    /**
     * buildInput
     *
     * @param array $attrs
     *
     * @return  mixed|void
     */
    public function buildInput($attrs)
    {
        $this->prepareScript();

        return parent::buildInput($attrs);
    }

    /**
     * prepareOptions
     *
     * @return  Option[]
     */
    protected function prepareOptions()
    {
        $options = [];

        $attribs = (array) $this->getAttribute('option_attribs');

        $files = Folder::files(LUNA_ROOT . '/src/Resources/asset/flags/4x3');

        foreach ($files as $file) {
            $name = File::getFilename(File::stripExtension($file));

            $attribs['data-flag-class'] = Locale::getFlagIconClass($name);

            $options[] = new Option($name, $name, $attribs);
        }

        return $options;
    }

    /**
     * prepareScript
     *
     * @return  void
     */
    protected function prepareScript()
    {
        $tmpl = <<<JS
\\function (state) {
	if (!state.id) {
		return state.text;
	}

	var \$state = $(
		'<span>' +
		 '<span class="' + $(state.element).attr('data-flag-class') + '"></span> ' +
		 '<span class="' + $(state.element).attr('data-flag-class') + ' flag-icon-squared"></span> ' +
		 state.text +
		 '</span>'
	);

	return \$state;
}
JS;


        Select2Script::select2('#' . $this->getId(), ['templateResult' => $tmpl, 'templateSelection' => $tmpl]);
    }
}
