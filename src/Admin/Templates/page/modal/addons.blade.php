{{-- Part of earth project. --}}
<?php
/**
 * @var $addonTypes \Lyrasoft\Luna\PageBuilder\AddonType[]
 */
?>
<div class="modal fade" id="addon-list-modal" tabindex="-1" role="dialog" aria-labelledby="addon-list-modal-label"
    aria-hidden="true" ref="addonList">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="m-0">建立新的 Addon</h3>
                <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">
                    <span class="fa fa-times"></span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row c-addon-list">
                    @foreach ($addonTypes as $addonType)
                        <div class="col-6 col-md-4 mb-2 c-addon-list__item c-addon">
                            <a class="d-block p-4 c-addon__link text-dark text-center rounded has-tooltip" href="javascript://"
                                title="{{ $addonType->description }}"
                                @click="selectAddon('{{ $addonType->type }}')">
                                <div class="c-addon__icon">
                                    <span class="{{ $addonType->icon }} fa-3x"></span>
                                </div>
                                <h5 class="m-0">
                                    {{ $addonType->name }}
                                </h5>
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>

@foreach ($addonTypes as $addonType)
    @php( $class = $addonType->class )

    {!! $class::getVueComponentTemplate() !!}
@endforeach

