<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\MetaRule;

use Lyrasoft\Luna\Entity\MetaRule;
use Lyrasoft\Luna\Repository\MetaRuleRepository;
use Unicorn\View\FormAwareViewModelTrait;
use Unicorn\View\ORMAwareViewModelTrait;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewMetadata;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Attributes\ViewPrepare;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\View\View;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\Utilities\Wrapper\RawWrapper;

/**
 * The MetaRuleEditView class.
 */
#[ViewModel(
    layout: 'meta-rule-edit',
    js: 'meta-rule-edit.ts'
)]
class MetaRuleEditView
{
    use TranslatorTrait;
    use ORMAwareViewModelTrait;
    use FormAwareViewModelTrait;

    public function __construct(
        #[Autowire]
        protected MetaRuleRepository $repository,
    ) {}

    #[ViewPrepare]
    public function prepare(AppContext $app, View $view): mixed
    {
        $id = $app->input('id');

        /** @var ?MetaRule $item */
        $item = $this->repository->getItem($id);

        // Bind item for injection
        $view[MetaRule::class] = $item;

        // Form::fill() would decode a JSON string into an array, so keep JSON-LD raw.
        $data = $this->orm->extractEntity($item);
        $data['json_ld'] = new RawWrapper((string) ($item?->jsonLd ?? ''));

        $editData = (array) $this->repository->getState()->getAndForget('edit.data');

        if (isset($editData['json_ld']) && is_string($editData['json_ld'])) {
            $editData['json_ld'] = new RawWrapper($editData['json_ld']);
        }

        $form = $this->createForm(MetaRuleEditForm::class)
            ->fillTo('item', $data)
            ->fillTo('item', $editData);

        return compact('form', 'id', 'item');
    }

    #[ViewMetadata]
    protected function prepareMetadata(HtmlFrame $htmlFrame): void
    {
        $htmlFrame->setTitle(
            $this->trans('unicorn.title.edit', title: $this->trans('luna.meta.rule.title'))
        );
    }
}
