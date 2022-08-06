<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Field\LanguageListField;
use Lyrasoft\Luna\Field\LocaleSwitchField;
use Lyrasoft\Luna\Services\LocaleService;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

/**
 * @var LocaleSwitchField $field
 */

$asset->js('@vendor/lyrasoft/luna/dist/locale-switch.js');
$localeService = $app->service(LocaleService::class);

$value = $field->getValue();

$languages = $localeService->getAvailableLanguages();
$currentId = $field->getCurrentId();
$modalId = $field->getId('-modal');
$idName = $field->getIdName();
$defaultLang = $lang->getFallback();

$app->service(UnicornScript::class)
    ->addRoute('@language_ajax');
?>

@if ($value)
    <?php
    $currentLang = $localeService->getLanguageByCode((string) $value);
    ?>
    <div class="card">
        <div class="card-body p-2 d-flex gap-3">
            <div class="flex-grow-1">
                <h4>
                    {{ $currentLang->getTitle() }}
                    <span class="badge bg-secondary">
                    {{ $currentLang->getCode() }}
                    </span>
                </h4>
                <div class="small text-muted">
                    <span class="{{ $localeService->getFlagIconClass($currentLang->getImage()) }}"></span>
                    {{ $currentLang->getTitleNative() }}
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#{{ $modalId }}"
                >
                    @lang('luna.field.locale.switch.button.select')
                </button>
            </div>
        </div>
    </div>

    {!! $input !!}
@else
    <?php
    $languageField = $app->make(LanguageListField::class);
    $languageField->setNamespace($field->getNamespace());
    $languageField->setName($field->getName());
    $languageField->setForm($field->getForm());
    $languageField->required($field->isRequired());
    $languageField->disabled($field->isDisabled());
    $languageField->isReadonly($field->isReadonly());
    // $languageField->setWrapperClass($field->getWrapperClass());
    // $languageField->setClass($field->getClass());
    $languageField->option(
        $lang('luna.field.locale.select.placeholder'),
        ''
    );
    ?>

    <x-input :field="$languageField"></x-input>
@endif

@teleport('locale-swich__' . $field->getId())
<?php
$defaultItem = $field->getItemByLandCode($defaultLang);

$jsOptions = [
    'type' => $field->getAssocType(),
    'routeName' => $field->getRouteName(),
    'table' => $field->getTable(),
    'currentId' => $currentId,
    'defaultId' => $defaultItem?->$idName,
    'inputId' => $field->getId(),
    'langField' => $field->getLanguageField(),
    'titleField' => $field->getTitleField(),
    'triggerInputName' => $field->get('trigger_input_name') ?? 'lang_assoc'
];
?>
<div class="modal fade " id="{{ $modalId }}" tabindex="-1" role="dialog" aria-labelledby="locale-switch-modal-label"
    aria-hidden="true"
    uni-locale-switch-modal='@json($jsOptions)'
>
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="locale-switch-modal-label">

                </h4>
                <button type="button" class="close btn-close" data-bs-dismiss="modal" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="visually-hidden">&times;</span>
                </button>
            </div>
            <div class="modal-body overflow-hidden list-group list-group-flush p-0">
                @foreach ($languages as $language)
                        <?php
                        $item = $field->getItemByLandCode($language->getCode());
                        $titleField = $field->getTitleField();

                        $active = (string) $item?->$idName === (string) $currentId;
                        ?>
                    <div
                        class="list-group-item d-flex align-items-center gap-2 {{ $active ? 'active' : '' }} {{ $item ? '' : 'bg-light' }}">
                        <div class="flex-grow-1">
                            <div class="small {{ $active ? '' : 'text-muted' }} mb-2">
                                <span class="{{ $localeService->getFlagIconClass($language->getImage()) }}"></span>
                                <strong>{{ $language->getTitle() }}</strong>
                                - {{ $language->getTitleNative() }}
                                <span
                                    class="badge {{ $active ? 'bg-light text-primary' : '' }} {{ $item ? 'bg-success' : 'bg-secondary' }}">
                                {{ $language->getCode() }}
                                </span>
                                @if ($defaultLang === $language->getCode())
                                    <span class="badge {{ $active ? 'bg-light text-primary' : 'bg-dark' }}">
                                    @lang('luna.field.locale.switch.default')
                                </span>
                                @endif
                            </div>
                            @if ($item)
                                <h6>
                                    {{ $item->$titleField }}
                                </h6>
                            @else
                                <div class="text-muted">
                                    @lang('luna.field.locale.switch.empty')
                                </div>
                            @endif
                        </div>
                        <div>
                            @if ($active)

                            @elseif ($item)
                                <button type="button"
                                    class="btn btn-outline-primary stretched-link"
                                    data-task="switch_lang"
                                    data-target-id="{{ $item->$idName }}"
                                >
                                    @lang('luna.field.locale.switch.button.switch')
                                </button>
                            @else
                                <div class="dropdown">
                                    <button type="button" class="btn btn-light dropdown-toggle"
                                        data-bs-toggle="dropdown">
                                        @lang('luna.field.locale.switch.button.create')
                                    </button>
                                    <div class="dropdown-menu">
                                        <button class="dropdown-item"
                                            data-task="create_lang_version"
                                            data-lang="{{ $language->getCode() }}"
                                            data-copy="current"
                                        >
                                            Copy From Current
                                        </button>
                                        @if ($defaultItem || $defaultItem?->$idName !== $item?->$idName)
                                            <button class="dropdown-item"
                                                data-task="create_lang_version"
                                                data-lang="{{ $language->getCode() }}"
                                                data-copy="default">
                                                Copy From Default
                                            </button>
                                        @endif
                                        @if ($field->isAllowCreateEmpty())
                                            <button class="dropdown-item"
                                                data-task="create_lang_version"
                                                data-lang="{{ $language->getCode() }}"
                                                data-copy="no">
                                                Create Empty
                                            </button>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endTeleport
