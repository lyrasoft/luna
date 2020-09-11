<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\Controller\Page;

use Lyrasoft\Luna\Admin\DataMapper\ConfigMapper;
use Lyrasoft\Luna\Admin\Repository\ConfigRepository;
use Lyrasoft\Luna\Config\ConfigService;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Unidev\Controller\AbstractMultiTaskController;
use Lyrasoft\Unidev\Image\ImageHtmlHelper;
use Windwalker\Data\Collection;
use Windwalker\Data\Data;
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

        unset($template);

        $luna = LunaHelper::getPackage();
        $templates = array_merge(
            array_values($luna->get('page.templates') ?? []),
            array_values($templates)
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

            if (!empty($template['image'])) {
                $template['image'] = $this->value($template['image']);
            } else {
                $template['image'] = ImageHtmlHelper::defaultImage();
            }

            $found[] = $template;
        }

        return $found;
    }

    /**
     * saveTemplate
     *
     * @param ConfigService    $configService
     * @param ConfigRepository $repository
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function saveTemplate(ConfigService $configService, ConfigRepository $repository)
    {
        $title = $this->input->getString('title');
        $type = $this->input->get('type');
        $image = $this->input->getUrl('image');
        $content = $this->input->getString('content');

        if (!$title) {
            throw new \RuntimeException('沒有標題');
        }

        $config = $configService->getConfig('page_templates');
        $templates = $config->toArray() ?: [];

        foreach ($templates as $template) {
            if ($template['title'] === $title) {
                throw new \RuntimeException('已有相同標題');
            }
        }

        $templates[] = compact('type','title', 'image', 'content');

        $repository->save(
            new Data(
                [
                    'type' => 'page_templates',
                    'content' => json_encode($templates),
                ]
            )
        );

        return $templates;
    }

    /**
     * removeTemplate
     *
     * @param ConfigService    $configService
     * @param ConfigRepository $repository
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function removeTemplate(ConfigService $configService, ConfigRepository $repository)
    {
        $title = $this->input->getString('title');

        if (!$title) {
            throw new \RuntimeException('No Title');
        }

        $config = $configService->getConfig('page_templates');
        $templates = $config->toArray() ?: [];

        $templates = array_filter(
            $templates,
            static function ($tmpl) use ($title) {
                return $tmpl['title'] !== $title;
            }
        );

        $repository->save(
            new Data(
                [
                    'type' => 'page_templates',
                    'content' => json_encode($templates),
                ]
            )
        );

        return $templates;
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
