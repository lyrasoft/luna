<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Widget\Custom;

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\View\View;
use Windwalker\Form\Form;

/**
 * Unit tests of the CustomHtmlWidget preparation and metadata.
 */
class CustomHtmlWidgetTest extends TestCase
{
    #[Test]
    public function layoutIsCustomHtml(): void
    {
        self::assertSame('custom-html', new CustomHtmlWidget()->getLayout());
    }

    #[Test]
    public function typeMetadataIsStable(): void
    {
        self::assertSame('fa fa-pencil', CustomHtmlWidget::getTypeIcon());
    }

    #[Test]
    public function prepareReturnsContentAndParams(): void
    {
        $entity = new Widget();
        $entity->content = '<b>x</b>';
        $entity->params = ['k' => 'v'];

        $widget = new CustomHtmlWidget();
        $widget->setData($entity);

        $result = $widget->prepare(
            $this->createStub(AppContext::class),
            $this->createStub(View::class)
        );

        self::assertSame(
            ['html' => '<b>x</b>', 'params' => ['k' => 'v']],
            $result
        );
    }

    #[Test]
    public function defineAddsTextFieldsetWithContentField(): void
    {
        $form = new Form();

        $widget = new CustomHtmlWidget();
        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturn('Text');
        new ReflectionProperty($widget, 'lang')->setValue($widget, $lang);

        $widget->define($form);

        self::assertTrue($form->hasField('content'));
    }
}
