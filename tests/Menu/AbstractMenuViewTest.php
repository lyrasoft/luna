<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuFieldDefineEvent;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Router\Navigator;
use Windwalker\Form\Form;
use Windwalker\Utilities\Contract\LanguageInterface;

/**
 * Concrete AbstractMenuView used only by AbstractMenuViewTest. Records the form namespaces
 * seen by the define hooks so the namespacing behavior can be asserted.
 */
class AbstractMenuViewTestFixture extends AbstractMenuView
{
    /**
     * @var  array<string>
     */
    public array $seenNamespaces = [];

    public static function getName(): string
    {
        return 'fixture';
    }

    protected function defineVariablesForm(Form $form): void
    {
        $this->seenNamespaces[] = 'variables:' . $form->getNamespace();
    }

    protected function defineParamsForm(Form $form): void
    {
        $this->seenNamespaces[] = 'params:' . $form->getNamespace();
    }

    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        throw new \LogicException('Not used in this test.');
    }

    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}

/**
 * Covers AbstractMenuView define flow, title/description keys, tab registration and default hooks.
 */
class AbstractMenuViewTest extends TestCase
{
    #[Test]
    public function noLinkConstantIsStableSentinel(): void
    {
        self::assertSame('__NO_LINK__', AbstractMenuView::NO_LINK);
    }

    #[Test]
    public function defineRunsParamsAndVariablesHooksInTheirNamespaces(): void
    {
        $view = new AbstractMenuViewTestFixture();

        $view->define(new Form());

        self::assertSame(
            ['variables:', 'params:'],
            $view->seenNamespaces
        );
    }

    #[Test]
    public function tabRegistersTabAndRunsCallbackOnCurrentForm(): void
    {
        $view = new AbstractMenuViewTestFixture();
        $form = new Form();
        $called = false;

        new \ReflectionProperty(AbstractMenuView::class, 'currentForm')->setValue($view, $form);

        $view->tab('basic', 'Basic', function () use (&$called) {
            $called = true;
        });

        self::assertSame(['basic' => ['title' => 'Basic']], $view->getTabs());
        self::assertTrue($called);
    }

    #[Test]
    public function defineEmitsFieldDefineEventWithFormAndMenu(): void
    {
        $view = new AbstractMenuViewTestFixture();
        $form = new Form();

        $received = [];

        $view->on(
            MenuFieldDefineEvent::class,
            function (MenuFieldDefineEvent $event) use (&$received) {
                $received[] = $event;
            }
        );

        $view->define($form);

        self::assertCount(1, $received);
        self::assertSame($form, $received[0]->getForm());
        self::assertSame($view, $received[0]->getMenu());
    }

    #[Test]
    public function getTitleAndDescriptionUseNameBasedTranslationKeys(): void
    {
        $lang = $this->createMock(LanguageInterface::class);
        $lang->expects($this->exactly(2))
            ->method('trans')
            ->willReturnMap([
                ['luna.menu.view.fixture.title', 'Fixture Title'],
                ['luna.menu.view.fixture.desc', 'Fixture Desc'],
            ]);

        self::assertSame('Fixture Title', AbstractMenuViewTestFixture::getTitle($lang));
        self::assertSame('Fixture Desc', AbstractMenuViewTestFixture::getDescription($lang));
    }

    #[Test]
    public function getGroupDefaultsToCore(): void
    {
        self::assertSame('core', AbstractMenuViewTestFixture::getGroup());
    }

    #[Test]
    public function defaultPrepareHooksLeaveVariablesUnchanged(): void
    {
        $view = new AbstractMenuViewTestFixture();
        $variables = ['id' => 1];

        $view->prepareVariablesForm($variables);
        $view->prepareVariablesStore($variables);

        self::assertSame(['id' => 1], $variables);
    }

}
