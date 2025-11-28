<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Locale;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\AssociationService;
use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\DI\Attributes\Service;
use Windwalker\DOM\HTMLElement;
use Windwalker\Form\Form;

use function Windwalker\DOM\h;

/**
 * Trait AssociationTrait
 */
trait LanguageAssocTrait
{
    #[Service]
    protected LocaleService $localeService;

    #[Service]
    protected AssociationService $associationService;

    public function defineForm(string $lang, Form $form, string $fieldClass, ?callable $postHandler = null): void
    {
        if ($lang === '*' || !$lang) {
            return;
        }

        $langs = $this->localeService->getAvailableLanguages()
            ->filter(fn (Language $lan) => $lan->code !== $lang);

        $form->ns(
            'assoc',
            function (Form $form) use ($postHandler, $fieldClass, $langs) {
                foreach ($langs as $language) {
                    $flag = h('span', ['class' => $this->localeService->getFlagIconClass($language->image)]);

                    $field = $form->add($language->code, $fieldClass)
                        ->modifyLabel(
                            function (HTMLElement $label) use ($language, $flag) {
                                $label->appendChild($flag);
                                $label->appendText(' ' . $language->title);
                            }
                        );

                    if ($postHandler) {
                        $postHandler($field, $form);
                    }
                }
            }
        );
    }

    public function prepareAssocValues(string $type, string|int $targetId, Form $form): void
    {
        $associations = $this->associationService->getRelativeItemsByTargetId($type, $targetId);

        $assoc = [];

        foreach ($associations as $association) {
            $assoc[$association->key] = $association->targetId;
        }

        $form->fill(compact('assoc'));
    }

    public function saveLangAssociations(string $type, string $key, string|int $targetId, array $associations): void
    {
        $this->localeService->saveLangAssociations($type, $key, $targetId, $associations);
    }
}
