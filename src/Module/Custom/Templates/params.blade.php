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
    <li role="presentation" class="nav-item active">
        <a class="nav-link" href="#fieldset-text" aria-controls="home" role="tab" data-toggle="tab">
            @translate($module->getLangPrefix() . 'module.edit.fieldset.text')
        </a>
    </li>

    @foreach ($fieldsets as $i => $fieldset)
        <li role="presentation" class="nav-item">
            <a class="nav-link" href="#fieldset-{{ $fieldset }}" aria-controls="home" role="tab" data-toggle="tab">
                @translate($module->getLangPrefix() . 'module.edit.fieldset.' . $fieldset)
            </a>
        </li>
    @endforeach
</ul>

<div id="module-param-block" class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active" id="fieldset-text">
        {{-- EDITOR --}}
        {!! $form->getField('content')->renderInput() !!}
    </div>

    @foreach ($fieldsets as $fieldset)
        <div role="tabpanel" class="tab-pane fade" id="fieldset-{{ $fieldset }}">
            <div class="form-horizontal">
                {!! $moduleForm->renderFields($fieldset) !!}
            </div>
        </div>
    @endforeach
</div>
