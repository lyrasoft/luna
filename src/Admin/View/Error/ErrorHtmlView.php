<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Error;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\View\ItemView;
use Windwalker\Legacy\Core\Language\Translator;
use Windwalker\Legacy\Core\Renderer\RendererHelper;

/**
 * The ErrorHtmlView class.
 *
 * @since  1.0
 */
class ErrorHtmlView extends ItemView
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'error';

    /**
     * Property renderer.
     *
     * @var  string
     */
    protected $renderer = RendererHelper::EDGE;

    /**
     * init
     *
     * @return  void
     */
    protected function init()
    {
        $this->langPrefix = LunaHelper::getLangPrefix();
    }

    /**
     * prepareData
     *
     * @param \Windwalker\Legacy\Data\Data $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        parent::prepareData($data);

        $data->code = $data->exception->getCode();
        $data->msg  = $data->exception->getMessage();

        $data->code = ($data->code >= 400 && $data->code < 500) ? $data->code : 500;

        if ($data->code === 404) {
            $data->msg = __($this->langPrefix . 'error.not.found');
        } elseif ($data->code < 400 || $data->code >= 500) {
            $data->msg = __($this->langPrefix . 'error.internal');
        }

        $this->setTitle($data->msg);
    }

    /**
     * setTitle
     *
     * @param string $title
     *
     * @return  static
     */
    public function setTitle($title = null)
    {
        return parent::setTitle($title);
    }
}
