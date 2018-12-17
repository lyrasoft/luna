{{-- Part of earth project. --}}
<?php
$meta = (bool) $field->get('image_meta');
/** @var \Windwalker\Form\Form $form */
$form = $imageMetaForm;
?>

<div v-pre>
    <div id="{{ $attrs['id'] }}-wrap" class="multi-uploader">
        <vue-drag-uploader
            id="{{ $attrs['id'] }}"
            :images="images"
            :url="uploadUrl"
            :max-files="maxFiles"
            placeholder="{{ $attrs['placeholder'] }}"
            @change="images = $event"
            @attr('@item-click', $meta ? 'itemClick' : 'openImage')
        >
            <template slot="extra" slot-scope="{ item, i }">
                @if ($meta)
                    <h5 v-if="item.title !== ''" class="preview-img__title text-white p-4">@{{ item.title }}</h5>
                @endif
                <div class="d-none">
                    @if ($meta)
                        <input type="hidden" :name="`{{ $attrs['name'] }}[${i}][url]`" :value="item.url" />
                        @foreach ($form->getFields() as $field)
                            <input type="hidden" :name="`{{ $attrs['name'] }}[${i}][{{ $field->getName() }}]`" :value="item.{{ $field->getName() }}" />
                        @endforeach
                    @else
                        <input type="hidden" :name="`{{ $attrs['name'] }}[${i}]`" :value="item.url" />
                    @endif
                </div>
            </template>
        </vue-drag-uploader>

        <div class="modal fade" id="{{ $attrs['id'] }}-meta-modal" tabindex="-1" role="dialog"
            aria-labelledby="{{ $attrs['id'] }}-meta-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="{{ $attrs['id'] }}-meta-modal-label">@lang('luna.form.field.multi.image.edit.title')</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-7 text-center">
                                <a :href="current.url" target="_blank">
                                    <img class="img-fluid rounded" :src="current.url" alt="Img preview">
                                </a>
                            </div>
                            <div class="col-lg-5">
                                @foreach ($form->getFields() as $field)
                                <div class="form-group">
                                    {!! $field->render() !!}
                                </div>
                                @endforeach
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary btn-block" data-dismiss="modal">
                                        @lang('luna.form.field.multi.image.meta.button.ok')
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{--<div class="modal-footer">--}}
                        {{----}}
                    {{--</div>--}}
                </div>
            </div>
        </div>

        @if ($field->get('required'))
            <input type="text" class="form-control" style="display: none" required
                @attr('data-value-missing-message', $field->attr('data-value-missing-message'))
                :disabled="images.length > 0" />
        @endif
    </div>
</div>
