<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Widget\AbstractWidget;
use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamInterface;
use Windwalker\Core\View\View;

/**
 * Unit tests of AbstractWidget render and entity proxy behaviour.
 *
 * The View is a double, so no template is rendered; only the layout hand-off and
 * the returned body are checked.
 */
class AbstractWidgetTest extends TestCase
{
    #[Test]
    public function renderSetsLayoutAndReturnsBodyAsString(): void
    {
        $widget = new CustomHtmlWidget();

        $stream = $this->createStub(StreamInterface::class);
        $stream->method('__toString')->willReturn('<p>hi</p>');

        $response = $this->createStub(ResponseInterface::class);
        $response->method('getBody')->willReturn($stream);

        $view = $this->createMock(View::class);
        $view->expects(self::once())
            ->method('setLayoutMap')
            ->with('custom-html');
        $view->expects(self::once())
            ->method('render')
            ->with(['x' => 1])
            ->willReturn($response);

        self::assertSame('<p>hi</p>', $widget->render($view, ['x' => 1]));
    }

    #[Test]
    public function setDataReturnsSelfAndGetDataReturnsEntity(): void
    {
        $widget = new CustomHtmlWidget();
        $entity = new Widget();

        self::assertSame($widget, $widget->setData($entity));
        self::assertSame($entity, $widget->getData());
    }

    #[Test]
    public function getParamReturnsEntityParams(): void
    {
        $widget = new CustomHtmlWidget();
        $entity = new Widget();
        $entity->params = ['color' => 'red'];
        $widget->setData($entity);

        self::assertSame(['color' => 'red'], $widget->getParam());
    }

    #[Test]
    public function magicGetterProxiesToEntity(): void
    {
        $widget = new CustomHtmlWidget();
        $entity = new Widget();
        $entity->title = 'Hello';
        $widget->setData($entity);

        self::assertSame('Hello', $widget->getTitle());
    }

    #[Test]
    public function typeAccessorsStoreStaticType(): void
    {
        AbstractWidget::setType('abc');
        self::assertSame('abc', AbstractWidget::getType());

        AbstractWidget::setType('');
    }
}
