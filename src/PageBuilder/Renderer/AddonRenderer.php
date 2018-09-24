<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\AddonHelper;
use Lyrasoft\Luna\PageBuilder\Style\StyleContainer;
use Windwalker\Structure\Structure;

/**
 * The RowStyleRenderer class.
 *
 * @since  __DEPLOY_VERSION__
 */
class AddonRenderer extends AbstractPageRenderer
{
    /**
     * Property styles.
     *
     * @var StyleContainer
     */
    protected $styles;

    /**
     * Property type.
     *
     * @var  string
     */
    protected $cssPrefix = '.c-addon';

    /**
     * render
     *
     * @param array $content
     *
     * @return  string
     *
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  __DEPLOY_VERSION__
     */
    public function render(array $content)
    {
        $addon = new Structure($content);

        if ((string) $addon['options.html_id'] === '') {
            $addon['options.html_id'] = 'luna-' . $addon['id'];
        }

        $this->prepareAssets($addon);

        $options = $addon->extract('options');
        $classes = [];
        $attrs = [];

        static::prepareElement($options, $classes, $attrs);

        $data = [
            'content' => $addon,
            'options' => $options,
            'classes' => $classes,
            'attrs' => $attrs,
            'styles' => $this->styles,
            'addonRenderer' => $this
        ];

        $addonInstance = AddonHelper::getAddonInstance($addon['type'], $data);

        return $addonInstance->render();
    }

    /**
     * prepareCSS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareCSS(Structure $content)
    {
        $this->styles = $styles = new StyleContainer('#' . $content['options.html_id']);

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Title
        $this->prepareTitleCSS($options, $styles);

        // Background
        $this->prepareBackgroundCSS($options, $styles);
    }

    /**
     * prepareJS
     *
     * @param Structure $content
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function prepareJS(Structure $content)
    {
    }

    /**
     * prepareElement
     *
     * @param Structure $options
     * @param array     $classes
     * @param array     $attrs
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function prepareElement(Structure $options, array &$classes, array &$attrs)
    {
        $classes = array_merge($classes, array_values($options['display']));

        parent::prepareElement($options, $classes, $attrs);
    }
}
