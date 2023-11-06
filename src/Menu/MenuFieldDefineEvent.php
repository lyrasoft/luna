<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu;

use Windwalker\Event\AbstractEvent;
use Windwalker\Form\Form;

/**
 * The MenuFieldDefineEvent class.
 */
class MenuFieldDefineEvent extends AbstractEvent
{
    protected Form $form;

    protected AbstractMenuView $menu;

    /**
     * @return Form
     */
    public function getForm(): Form
    {
        return $this->form;
    }

    /**
     * @param  Form  $form
     *
     * @return  static  Return self to support chaining.
     */
    public function setForm(Form $form): static
    {
        $this->form = $form;

        return $this;
    }

    /**
     * @return AbstractMenuView
     */
    public function getMenu(): AbstractMenuView
    {
        return $this->menu;
    }

    /**
     * @param  AbstractMenuView  $menu
     *
     * @return  static  Return self to support chaining.
     */
    public function setMenu(AbstractMenuView $menu): static
    {
        $this->menu = $menu;

        return $this;
    }
}
