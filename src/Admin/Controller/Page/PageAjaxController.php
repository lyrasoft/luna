<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\Controller\Page;

use Lyrasoft\Luna\Config\ConfigService;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Unidev\Controller\AbstractMultiTaskController;
use Lyrasoft\Unidev\Image\ImageHtmlHelper;
use Windwalker\Data\Collection;
use Windwalker\Utilities\Arr;

/**
 * The PageAjaxController class.
 *
 * @since  __DEPLOY_VERSION__
 */
class PageAjaxController extends AbstractMultiTaskController
{
    /**
     * getTemplates
     *
     * @param ConfigService $configService
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getTemplates(ConfigService $configService): array
    {
        $type = $this->input->getString('type');
        $types = Arr::explodeNoEmpty(',', $type);

        $templates = $configService->getConfig('page_templates')->toArray() ?: [];

        foreach ($templates as &$template) {
            $template['can_delete'] = true;
        }

        $luna = LunaHelper::getPackage();
        $templates = array_merge(
            $luna->get('page.templates') ?? [],
            $templates
        );

        $found = [];

        foreach ($templates as $template) {
            $template = $this->value($template);

            if (!in_array($template['type'], $types, true)) {
                continue;
            }

            if (!isset($template['content'])) {
                if (isset($template['file'])) {
                    $template['content'] = file_get_contents($this->value($template['file']));
                }
            }

            if (isset($template['image'])) {
                $template['image'] = $this->value($template['image']);
            } else {
                $template['image'] = ImageHtmlHelper::defaultImage();
            }

            $found[] = $template;
        }

        return $found;
    }

    /**
     * value
     *
     * @param mixed $value
     *
     * @return  mixed
     *
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function value($value)
    {
        if (is_callable($value)) {
            return $this->app->getContainer()->call($value);
        }

        return $value;
    }
}
