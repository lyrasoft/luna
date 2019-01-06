<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Language;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Phoenix\Controller\AbstractPhoenixController;

/**
 * The ChangeController class.
 *
 * @since  1.0
 */
class ChangeController extends AbstractPhoenixController
{
    /**
     * doExecute
     *
     * @return  mixed
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \Throwable
     */
    protected function doExecute()
    {
        $lang = $this->input->get('lang');

        $return = $this->input->getBase64('return');

        $return = $return ? base64_decode($return) : $return;

        if ($return && (strpos($return, '/') === 0 || strpos($return, 'http') === 0)) {
            throw new \RuntimeException('Return value should be relative path, not full URI or URL.');
        }

        $uri = $this->container->get('uri');

        $luna = LunaHelper::getPackage();

        // Clear cache to build route with new locale
        $this->router->getRouter()->clearCache();

        if ($luna->isFrontend()) {
            $redirect = $luna->get('frontend.redirect.language', 'home');
        } else {
            $redirect = $luna->get('admin.redirect.language', 'home');
        }

        try {
            if (!$lang) {
                throw new \InvalidArgumentException('No language', 404);
            }

            $language = Locale::getLanguage($lang);

            if (!$language) {
                throw new \RangeException('Language ' . $lang . ' not exists.', 404);
            }

            Locale::setLocale($lang);
        } catch (\Throwable $e) {
            if (WINDWALKER_DEBUG) {
                throw $e;
            }

            $this->setRedirect($this->router->route($redirect));

            return false;
        }

        if ($return) {
            $return = $uri->path . '/' .
                ltrim($uri->script . '/', '/') . $language->alias . '/' . $return;
        } else {
            $return = $this->router->route($redirect);
        }

        $this->setRedirect($return);

        return true;
    }
}
