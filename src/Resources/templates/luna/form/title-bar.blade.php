{{-- Part of earth project. --}}
<?php
$titleField = isset($titleField) ? $titleField : 'title';
$aliasField = isset($aliasField) ? $aliasField : 'alias';
?>
<style>
    .luna-title-field input {
        font-size: 1.3em;
        line-height: 34px;
    }
</style>
<div class="row" style="margin-bottom: 30px;">
    @if ($form->getField($titleField))
        <div class="col-md-6">
            <div class="form-group luna-title-field">
                {!! $form->getField($titleField)->appendAttribute('class', 'form-control')->renderInput() !!}
            </div>
        </div>
    @endif

    @if ($form->getField($aliasField))
        <div class="col-md-3">
            <div class="form-group luna-alias-field">
                {!! $form->getField($aliasField)->appendAttribute('class', 'form-control')->renderInput() !!}
            </div>
        </div>
    @endif
</div>
