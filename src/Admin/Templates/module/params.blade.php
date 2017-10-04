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
    @foreach ($fieldsets as $i => $fieldset)
        <li role="presentation" class="nav-item {{ $i !== 0 ? null : 'active' }}">
            <a class="nav-link" href="#fieldset-{{ $fieldset }}" aria-controls="home" role="tab" data-toggle="tab">
                @translate($module->getLangPrefix() . 'module.edit.fieldset.' . $fieldset)
            </a>
        </li>
    @endforeach
</ul>

<div class="tab-content">
    @foreach ($fieldsets as $i => $fieldset)
        <div role="tabpanel" class="tab-pane fade {{ $i !== 0 ? null : 'in active' }}" id="fieldset-{{ $fieldset }}">
            <div class="form-horizontal" style="margin-top: 40px; margin-bottom: 40px;">
                {!! $moduleForm->renderFields($fieldset) !!}
            </div>
        </div>
    @endforeach
</div>
