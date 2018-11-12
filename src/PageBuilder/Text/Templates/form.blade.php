{{-- Part of earth project. --}}

<script id="addon-tmpl-text" type="text/template">
    <div>
        {{-- Title --}}
        <div class="form-group">
            <label for="input-addon-edit-title-text">主標題</label>
            <textarea id="input-addon-edit-title-text"
                v-model="options.title.text" class="form-control"></textarea>
            <small class="form-text text-muted">這個區塊的標題，不需要的話保持空白即可</small>
        </div>

        <title-options v-if="options.title.text !== ''"
            id="input-addon-edit" v-model="options"></title-options>

        <hr />

        <div class="form-group">
            <label for="addon-edit-content">內文</label>
            <textarea id="addon-edit-content" v-model="options.content" v-tinymce class="form-control"></textarea>
        </div>

        {{-- Content Align --}}
        <div class="form-group">
            <label for="input-addon-edit-title-align">內文靠齊</label>
            <div class="mt-2">
                <radio-buttons v-model="options.align" class="btn-block">
                    <radio-button value="">
                        頁面預設
                    </radio-button>
                    <radio-button value="left">
                        左
                    </radio-button>
                    <radio-button value="center">
                        中
                    </radio-button>
                    <radio-button value="right">
                        右
                    </radio-button>
                </radio-buttons>
            </div>
        </div>

        {{-- Content Font Size --}}
        <rwd-group class-name="c-title-font-size">
            <label slot="label">
                內文字體大小
            </label>
            <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                :class="'c-content-font-size-height__' + size">
                <div class="d-flex">
                    <vue-slide-bar v-model="options.content_font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                        v-model="options.content_font_size[size]" />
                </div>
            </div>
        </rwd-group>

        {{-- Content Line Height --}}
        <rwd-group class-name="c-title-line-height">
            <label slot="label">
                內文行距
            </label>
            <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                :class="'c-content-line-height__' + size">
                <div class="d-flex">
                    <vue-slide-bar v-model="options.content_line_height[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                        v-model="options.content_line_height[size]" />
                </div>
            </div>
        </rwd-group>
    </div>
</script>
