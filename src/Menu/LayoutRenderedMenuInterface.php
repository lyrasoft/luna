<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu;

/**
 * Interface LayoutRenderedMenuInterface
 *
 * @since  1.7.6
 */
interface LayoutRenderedMenuInterface
{
    /**
     * getLayout
     *
     * @return  string
     *
     * @since  1.7.6
     */
    public function getLayout(): string;
}
