<?php

namespace Lyrasoft\Luna\PageBuilder\Renderer;

use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Exception\SassException;
use Windwalker\Data\Collection;

/**
 * The RowStyleRenderer class.
 *
 * @since  1.5.2
 */
class AddonRenderer extends AbstractPageRenderer
{
    /**
     * Property styles.
     *
     * @var StyleContainer
     */
    protected StyleContainer $styles;

    /**
     * Property type.
     *
     * @var  string
     */
    protected string $cssPrefix = '.c-addon';

    /**
     * render
     *
     * @param  array  $content
     * @param  string  $path
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public function render(array $content, string $path): string
    {
        $addon = new Collection($content);

        if ((string) $addon->getDeep('options.html_id') === '') {
            $addon->setDeep('options.html_id', 'luna-' . $addon->getDeep('id'));
        }

        $this->prepareAssets($addon);

        $options = $addon->extract('options');
        $classes = [];
        $attrs = [];

        $this->prepareElement($options, $classes, $attrs);

        $data = [
            'content' => $addon,
            'options' => $options,
            'classes' => $classes,
            'attrs' => $attrs,
            'styles' => $this->styles,
            'addonRenderer' => $this,
            'path' => $path,
        ];

        $addonInstance = $this->factory->createAddonInstance($addon->getDeep('type'), $data);

        return $addonInstance->render($this->createRenderer());
    }

    /**
     * prepareCSS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @throws SassException
     * @since  1.5.2
     */
    protected function prepareCSS(Collection $content): void
    {
        $this->styles = $styles = new StyleContainer('#' . $content->getDeep('options.html_id'));

        $options = $content->extract('options');

        // Basic
        $this->prepareBasicCSS($options, $styles);

        // Title
        $this->prepareTitleCSS($options, $styles);

        // Background
        $this->prepareBackgroundCSS($options, $styles);

        // Custom CSS
        $css = (string) $content->getDeep('options.html_css');

        if (trim($css)) {
            $this->renderCustomCSS($content);
        }
    }

    /**
     * prepareJS
     *
     * @param  Collection  $content
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareJS(Collection $content): void
    {
    }

    /**
     * prepareElement
     *
     * @param  Collection  $options
     * @param  array       $classes
     * @param  array       $attrs
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public function prepareElement(Collection $options, array &$classes, array &$attrs): void
    {
        $classes = array_merge($classes, array_values($options->getDeep('display')));
        $classes[] = $options->getDeep('html_class');

        parent::prepareElement($options, $classes, $attrs);
    }
}
