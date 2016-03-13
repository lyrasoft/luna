{{-- Part of earth project. --}}
<?php
/**
 * @var  $type        string
 * @var  $module      \Lyrasoft\Luna\Module\AbstractModule
 * @var  $moduleForm  \Windwalker\Form\Form
 * @var  $moduleType  \Lyrasoft\Luna\Module\ModuleType
 */
?>

<?php
$moduleForm = $module->getForm($item->params);
$fieldsets = $moduleForm->getFieldsets();
?>
<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active">
        <a href="#fieldset-text" aria-controls="home" role="tab" data-toggle="tab">
            @translate($module->getLangPrefix() . 'module.edit.fieldset.text')
        </a>
    </li>

    @foreach ($fieldsets as $i => $fieldset)
        <li role="presentation" class="">
            <a href="#fieldset-{{ $fieldset }}" aria-controls="home" role="tab" data-toggle="tab">
                @translate($module->getLangPrefix() . 'module.edit.fieldset.' . $fieldset)
            </a>
        </li>
    @endforeach
</ul>

<div id="module-param-block" class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active" id="fieldset-text">
        {{-- EDITOR --}}
        @if ($type == 'custom')
            {!! $form->getField('content')->renderInput() !!}
        @endif
    </div>

    @foreach ($fieldsets as $fieldset)
        <div role="tabpanel" class="tab-pane fade" id="fieldset-{{ $fieldset }}">
            <div class="form-horizontal">
                {!! $moduleForm->renderFields($fieldset) !!}
            </div>
        </div>
    @endforeach
</div>
