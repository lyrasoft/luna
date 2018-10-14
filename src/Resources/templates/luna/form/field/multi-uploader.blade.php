{{-- Part of earth project. --}}
<?php
$meta = $field->get('image_meta');
?>

<div v-pre>
    <div id="{{ $attrs['id'] }}-wrap" class="multi-uploader">
        <vue-drag-uploader
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
                        <input type="hidden" :name="`{{ $attrs['name'] }}[${i}][title]`" :value="item.title" />
                        <input type="hidden" :name="`{{ $attrs['name'] }}[${i}][alt]`" :value="item.alt" />
                        <input type="hidden" :name="`{{ $attrs['name'] }}[${i}][description]`" :value="item.description" />
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
                                <div class="form-group">
                                    <label for="current.title" id="{{ $attrs['id'] }}-meta-title">@lang('luna.form.field.multi.image.meta.title')</label>
                                    <input type="text" v-model="current.title" class="form-control" id="{{ $attrs['id'] }}-meta-title"/>
                                </div>
                                <div class="form-group">
                                    <label for="current.alt" id="{{ $attrs['id'] }}-meta-alt">@lang('luna.form.field.multi.image.meta.alt')</label>
                                    <input type="text" v-model="current.alt" class="form-control" id="{{ $attrs['id'] }}-meta-alt"/>
                                </div>
                                <div class="form-group">
                                    <label for="current.description" id="{{ $attrs['id'] }}-meta-description">@lang('luna.form.field.multi.image.meta.description')</label>
                                    <textarea v-model="current.description" class="form-control" id="{{ $attrs['id'] }}-meta-description"
                                        rows="5"></textarea>
                                </div>
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
    </div>
</div>
