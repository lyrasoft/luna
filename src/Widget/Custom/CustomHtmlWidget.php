<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Widget\Custom;

use Lyrasoft\Luna\Widget\AbstractWidget;
use Unicorn\Field\TinymceEditorField;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Form\Form;

/**
 * The CustomTextWidget class.
 */
class CustomHtmlWidget extends AbstractWidget implements ViewModelInterface
{
    use TranslatorTrait;

    public static function getTypeIcon(): string
    {
        return 'fa fa-pencil';
    }

    public static function getTypeTitle(LangService $lang): string
    {
        return $lang('luna.widget.custom.html.title');
    }

    public static function getTypeDescription(LangService $lang): string
    {
        return $lang('luna.widget.custom.html.description');
    }

    /**
     * @inheritDoc
     */
    public function define(Form $form): void
    {
        $form->fieldset(
            'text',
            function (Form $form) {
                $form->add('content', TinymceEditorField::class)
                ->editorOptions(
                    [
                        'height' => 550
                    ]
                );
            }
        )
            ->title($this->trans('unicorn.fieldset.text'));
    }

    /**
     * @inheritDoc
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $data = $this->getData();
        $html = $data->getContent();
        $params = $data->getParams();

        return compact('html', 'params');
    }

    public function getLayout(): string
    {
        return 'custom-html';
    }
}
