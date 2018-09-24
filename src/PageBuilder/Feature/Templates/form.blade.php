{{-- Part of earth project. --}}

<script id="addon-tmpl-feature" type="text/template">
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

        {{-- LINK --}}
        <div class="form-group">
            <label for="input-addon-edit-link">連結</label>
            <input id="input-addon-edit-link" type="url"
                v-model="options.link" class="form-control" />
        </div>

        {{-- LINK ELEMENT --}}
        <div class="form-group" v-if="options.link !== ''">
            <label for="input-addon-edit-link-element">連結位置</label>
            <div>
                <radio-buttons v-model="options.link_element">
                    <radio-button value="title">標題</radio-button>
                    <radio-button value="icon">圖示/圖片</radio-button>
                    <radio-button value="both">兩者</radio-button>
                </radio-buttons>
            </div>
        </div>

        <hr />

        {{-- Layout Type --}}
        <div class="form-group">
            <label for="input-addon-edit-layout-type">版面類型</label>
            <div>
                <radio-buttons v-model="options.layout_type">
                    <radio-button value="icon">圖示 Icon</radio-button>
                    <radio-button value="image">圖片 Image</radio-button>
                </radio-buttons>
            </div>
        </div>
        
        <div v-if="options.layout_type === 'image'">
            {{-- Image --}}
            <div class="form-group">
                <label for="input-addon-edit-image">圖片</label>
                <single-image v-model="options.image"
                    id="input-addon-edit-image"></single-image>
            </div>
        </div>

        <div v-if="options.layout_type === 'icon'">

            {{-- Icon --}}
            <div class="form-group">
                <label for="input-addon-edit-icon-name">圖示 Class 名稱</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <span :class="options.icon.name"></span>
                        </span>
                    </div>
                    <input id="input-addon-edit-icon-name" type="text"
                        v-model="options.icon.name" class="form-control" />
                </div>
                <small class="form-text text-muted">
                    輸入圖示的 class 名稱，例: <code>fa fa-star</code>，可
                    <a target="_blank" href="https://fontawesome.com/icons">在這裡</a> 查詢可用圖示。
                </small>
            </div>

            <!-- Title Font Size -->
            <rwd-group class-name="c-title-font-size">
                <label slot="label">
                    大小
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-title-font-size__' + size">
                    <div class="d-flex">
                        <vue-slide-bar v-model="options.icon.font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.icon.font_size[size]" />
                    </div>
                </div>
            </rwd-group>

            <div class="form-row">
                <div class="col-6">
                    <!-- Title Color -->
                    <div class="form-group">
                        <label for="input-addon-edit-icon-color">顏色</label>
                        <input type="text" id="input-addon-edit-icon-color"
                            v-model.lazy="options.icon.color" v-color class="form-control" />
                    </div>
                </div>
                <div class="col-6">
                    <!-- BG Color -->
                    <div class="form-group">
                        <label for="input-addon-edit-icon-bg_color">背景顏色</label>
                        <input type="text" id="input-addon-edit-icon-bg_color"
                            v-model.lazy="options.icon.bg_color" v-color class="form-control" />
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="col-6">
                    <!-- Title Margin Top -->
                    <rwd-group class-name="c-title-margin_top">
                        <label slot="label">
                            上方間距 Margin Top
                        </label>
                        <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                            :class="'c-title-margin_top__' + size">
                            <input type="number" v-model="options.icon.margin_top[size]" class="form-control" />
                        </div>
                    </rwd-group>
                </div>
                <div class="col-6">
                    <!-- Title Margin Bottom -->
                    <rwd-group class-name="c-title-margin_bottom">
                        <label slot="label">
                            下方間距 Margin Bottom
                        </label>
                        <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                            :class="'c-title-margin_bottom__' + size">
                            <input type="number" v-model="options.icon.margin_bottom[size]" class="form-control" />
                        </div>
                    </rwd-group>
                </div>

                {{-- Padding --}}
                <box-offset v-model="options.icon.padding">
                    <span slot="label">Icon Padding</span>
                </box-offset>
            </div>

            {{-- Border Color --}}
            <div class="form-group">
                <label for="input-addon-edit-border-color">Border Color</label>
                <input id="input-addon-edit-border-color" type="text"
                    v-model.lazy="options.icon.border.color" v-color class="form-control" />
            </div>

            {{-- Border Width --}}
            <rwd-group class-name="c-border-width">
                <label slot="label">
                    Border Width
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-border-width__' + size">
                    <div class="d-flex">
                        <vue-slide-bar v-model="options.icon.border.width[size]" class="flex-grow-1"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.icon.border.width[size]" />
                    </div>
                </div>
            </rwd-group>

            {{-- Border Style --}}
            <div class="form-group">
                <label for="input-addon-edit-border-style">Border Style</label>
                <select id="input-addon-edit-border-style"
                    v-model="options.icon.border.style" class="form-control">
                    <option value="">None</option>
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                    <option value="double">Double</option>
                    <option value="groove">Groove</option>
                    <option value="ridge">Ridge</option>
                </select>
            </div>

            {{-- Border Radius --}}
            <rwd-group class-name="c-border-radius">
                <label slot="label">
                    圓角 Border Radius
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-border-radius__' + size">
                    <div class="d-flex">
                        <vue-slide-bar v-model="options.icon.border.radius[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.icon.border.radius[size]" />
                    </div>
                </div>
            </rwd-group>

        </div>

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
