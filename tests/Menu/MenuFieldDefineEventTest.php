<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuFieldDefineEvent;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Form\Form;

class MenuFieldDefineEventTest extends TestCase
{
    #[Test]
    public function getFormAndGetMenuReturnTheInstancesPassedToConstructor(): void
    {
        $form = new Form('menu');
        $menu = $this->createStub(AbstractMenuView::class);

        $event = new MenuFieldDefineEvent(form: $form, menu: $menu);

        self::assertSame($form, $event->getForm());
        self::assertSame($menu, $event->getMenu());
    }

    #[Test]
    public function listenerChangesToFormFromEventAreVisibleOnOriginalForm(): void
    {
        $form = new Form('menu');
        $event = new MenuFieldDefineEvent(
            form: $form,
            menu: $this->createStub(AbstractMenuView::class)
        );

        $event->getForm()->setNamespace('changed-by-listener');

        self::assertSame('changed-by-listener', $form->getNamespace());
    }

    #[Test]
    public function eventNameDefaultsToItsClassName(): void
    {
        $event = new MenuFieldDefineEvent(
            form: new Form(),
            menu: $this->createStub(AbstractMenuView::class)
        );

        self::assertSame(MenuFieldDefineEvent::class, $event->getName());
    }
}
