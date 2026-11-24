<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Field\ArticleModalField;
use Lyrasoft\Luna\Field\CategoryModalField;
use Lyrasoft\Luna\Field\MenuModalField;
use Lyrasoft\Luna\Field\PageModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\View\AliasMenuView;
use Lyrasoft\Luna\Menu\View\ArticleCategoryMenuView;
use Lyrasoft\Luna\Menu\View\ArticleMenuView;
use Lyrasoft\Luna\Menu\View\LinkMenuView;
use Lyrasoft\Luna\Menu\View\PageMenuView;
use Lyrasoft\Luna\Menu\View\PlaceholderMenuView;
use Lyrasoft\Luna\Menu\View\RouteMenuView;
use Lyrasoft\Luna\Services\MenuService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Field\RepeatableField;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Router;
use Windwalker\Form\Field\ListField;
use Windwalker\Form\Field\TextareaField;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;
use Windwalker\ORM\ORM;

/**
 * Covers the defineVariablesForm() hook of each Menu view: the expected fields are added to the
 * variables namespace with the expected field types.
 *
 * Translation is replaced by a mock that returns the translation key, so assertions do not depend
 * on language files.
 */
class DefineVariablesFormTest extends TestCase
{
    #[Test]
    public function routeViewAddsRouteAndVariablesFields(): void
    {
        $form = $this->define(new RouteMenuView($this->createStub(Router::class)));

        self::assertInstanceOf(TextField::class, $form->getField('route'));
        self::assertInstanceOf(RepeatableField::class, $form->getField('variables'));
    }

    #[Test]
    public function placeholderViewAddsTypeUrlHeaderAndTextFields(): void
    {
        $form = $this->define(new PlaceholderMenuView());

        self::assertInstanceOf(ListField::class, $form->getField('type'));
        self::assertInstanceOf(ListField::class, $form->getField('url'));
        self::assertInstanceOf(TextField::class, $form->getField('header'));
        self::assertInstanceOf(TextareaField::class, $form->getField('text'));
    }

    #[Test]
    public function linkViewAddsUrlField(): void
    {
        $form = $this->define(new LinkMenuView());

        self::assertInstanceOf(TextField::class, $form->getField('url'));
    }

    #[Test]
    public function aliasViewAddsTargetMenuModalField(): void
    {
        $form = $this->define(new AliasMenuView(
            $this->createStub(ORM::class),
            $this->createStub(MenuService::class)
        ));

        self::assertInstanceOf(MenuModalField::class, $form->getField('target'));
    }

    #[Test]
    public function pageViewAddsIdModalAndPathFields(): void
    {
        $form = $this->define(new PageMenuView($this->createStub(ORM::class)));

        self::assertInstanceOf(PageModalField::class, $form->getField('id'));
        self::assertInstanceOf(TextField::class, $form->getField('path'));
    }

    #[Test]
    public function articleViewAddsArticleModalIdField(): void
    {
        $form = $this->define(new ArticleMenuView($this->createStub(ORM::class)));

        self::assertInstanceOf(ArticleModalField::class, $form->getField('id'));
    }

    #[Test]
    public function articleCategoryViewAddsCategoryModalIdField(): void
    {
        $form = $this->define(new ArticleCategoryMenuView($this->createStub(ORM::class)));

        self::assertInstanceOf(CategoryModalField::class, $form->getField('id'));
    }

    /**
     * Runs defineVariablesForm() on a real Form with a stubbed translator and returns the form.
     */
    private function define(AbstractMenuView $view): Form
    {
        $lang = $this->createMock(LangService::class);
        $lang->expects($this->any())
            ->method('trans')
            ->willReturnArgument(0);

        new \ReflectionProperty($view, 'lang')->setValue($view, $lang);

        $form = new Form();
        new \ReflectionMethod($view, 'defineVariablesForm')->invoke($view, $form);

        return $form;
    }
}
