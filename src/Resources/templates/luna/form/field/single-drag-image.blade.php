{{-- Part of virtualset project. --}}
<?php
$defaultImage = isset($defaultImage) ? $defaultImage : $asset->path . '/' . \Lyrasoft\Luna\Helper\LunaHelper::getPackage()->name . '/images/default-img.png';
?>
<div id="{{ $attrs['id'] }}-wrap">

    <div class="row">
        <div class="col-md-4">
            <img id="{{ $attrs['id'] }}-preview" class="img-responsive"
                src="{{ $attrs['value'] ? $attrs['value'] . '#' . uniqid() : $defaultImage }}"
                alt="Preview">
        </div>
        <div class="col-md-8">
            <div id="{{ $attrs['id'] . '-area' }}" class="filedrag">
                <button class="btn btn-success btn-xs" type="button" onclick="$('{{ '#' . $attrs['id'] }}-selector').click();">Select File</button> or drop files here
                <img src="{{ $asset->path . '/' . \Lyrasoft\Luna\Helper\LunaHelper::getPackage()->name }}/images/ajax-loader.gif" id="{{ $attrs['id'] . '-loader' }}" alt="Lading" style="display: none;">
            </div>
            <div class="checkbox checkbox-primary">
                <input type="checkbox" name="{{ $attrs['id'] }}-delete-image" id="{{ $attrs['id'] }}-delete-image" />
                <label for="{{ $attrs['id'] }}-delete-image">Delete</label>
            </div>
        </div>
    </div>

    <div style="display: none;">
        <input type="file" id="{{ $attrs['id'] }}-selector" class="cropit-image-input" style="display: none;" />
        <input type="text" id="{{ $attrs['id'] }}-data" name="{{ $attrs['id'] }}-data" value="" />
    </div>

    {{-- Push this modal to page bottom --}}
    @assetTemplate('single-image-upload@' . $attrs['id'])
    <div class="modal fade" id="{{ $attrs['id'] }}-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Crop image</h4>
                </div>
                <div class="modal-body">
                    <div id="{{ $attrs['id'] }}-cropper">

                        <!-- This is where the preview image is displayed -->
                        <div class="cropit-image-preview-container center-block" style="width: {{ $attrs['width'] }}px; height: {{ $attrs['height'] }}px;">
                            <div class="cropit-image-preview" style="width: {{ $attrs['width'] }}px; height: {{ $attrs['height'] }}px;"></div>
                        </div>

                        <!-- This range input controls zoom -->
                        <!-- You can add additional elements here, e.g. the image icons -->
                        <div class="slider-wrapper text-center" style="margin-top: 25px;">
                            <span class="fa fa-picture-o small-image" style="font-size: 15px"></span>
                            <input type="range" class="cropit-image-zoom-input custom" style="width: 130px; display: inline;">
                            <span class="fa fa-picture-o large-image" style="font-size: 25px"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="SingleImageUpload.saveImage('{{ '#' . $attrs['id'] }}')">Save</button>
                </div>
            </div>
        </div>
    </div>
    @endTemplate()
</div>
