{{-- Part of earth project. --}}

<script id="addon-tmpl-button" type="text/template">
    <div>
        {{-- Text --}}
        <div class="form-group">
            <label for="input-addon-edit-text">按鈕文字</label>
            <input id="input-addon-edit-text" type="text"
                v-model="options.text" class="form-control" />
        </div>

        {{-- Align --}}
        <div class="form-group">
            <label for="input-addon-edit-align">靠齊</label>
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

        {{-- LINK --}}
        <div class="form-group">
            <label for="input-addon-edit-link">連結</label>
            <input id="input-addon-edit-link" type="url"
                v-model="options.link" class="form-control" />
        </div>

        {{-- New Window --}}
        <div class="form-group" v-if="options.link !== ''">
            <label for="input-addon-edit-link-target">新頁面開啟</label>
            <div>
                <phoenix-switch name="addon-edit-link-target"
                    v-model="options.link_target"
                    id="input-addon-edit-link-target"
                    shape="circle"
                    color="success"
                    true-value="_blank"
                    false-value=""></phoenix-switch>
            </div>
        </div>

        {{-- Style --}}
        <div class="form-group">
            <label for="input-addon-edit-style">按鈕樣式</label>
            <select id="input-addon-edit-style"
                v-model="options.style" class="form-control" v-select2="{ tags: true, theme: 'bootstrap4', minimumResultsForSearch: 0 }" >
                <option value="_custom">自訂風格</option>
                <option value="btn-primary">btn-primary</option>
                <option value="btn-outline-primary">btn-outline-primary</option>
                <option value="btn-secondary">btn-secondary</option>
                <option value="btn-outline-secondary">btn-outline-secondary</option>
                <option value="btn-success">btn-success</option>
                <option value="btn-outline-success">btn-outline-success</option>
                <option value="btn-info">btn-info</option>
                <option value="btn-outline-info">btn-outline-info</option>
                <option value="btn-warning">btn-warning</option>
                <option value="btn-outline-warning">btn-outline-warning</option>
                <option value="btn-danger">btn-danger</option>
                <option value="btn-outline-danger">btn-outline-danger</option>
                <option value="btn-dark">btn-dark</option>
                <option value="btn-outline-dark">btn-outline-dark</option>
                <option value="btn-light">btn-light</option>
                <option value="btn-outline-light">btn-outline-light</option>
                <option value="btn-link">btn-link</option>
            </select>
            <small class="form-text text-muted">
                對應 <a href="https://getbootstrap.com/docs/4.1/components/buttons/" target="_blank">Bootstrap4 按鈕樣式</a>
                ，可自行輸入客製化 class，按下 Enter 即可。
            </small>
        </div>

        {{-- Size --}}
        <div class="form-group">
            <label for="input-addon-edit-size">按鈕大小</label>
            <select id="input-addon-edit-size"
                v-model="options.size" class="form-control" v-select2="{ tags: true, theme: 'bootstrap4', minimumResultsForSearch: 0 }" >
                <option value="">預設</option>
                <option value="btn-sm">btn-sm (小)</option>
                <option value="btn-lg">btn-lg (大)</option>
            </select>
            <small class="form-text text-muted">
                對應 <a href="https://getbootstrap.com/docs/4.1/components/buttons/" target="_blank">Bootstrap4 按鈕樣式</a>
                ，可自行輸入客製化 class，按下 Enter 即可。
            </small>
        </div>

        {{-- Radius --}}
        <div class="form-group" v-if="prepared">
            <label>
                圓角 Border Radius
            </label>
            <div class="d-flex">
                <vue-slide-bar v-model="options.border_radius" class="flex-grow-1" :max="300"></vue-slide-bar>
                <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                    v-model="options.border_radius" />
            </div>
        </div>

        {{-- Blocked --}}
        <div class="form-group">
            <label for="input-addon-edit-block">左右滿版</label>
            <div>
                <phoenix-switch name="addon-edit-block"
                    v-model="options.block"
                    id="input-addon-edit-block"
                    shape="circle"
                    color="success"
                    :true-value="true"
                    :false-value="false"></phoenix-switch>
            </div>
        </div>

        {{-- Icon --}}
        <div class="form-group">
            <label for="input-addon-edit-icon">圖示 Class 名稱</label>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span :class="options.icon"></span>
                    </span>
                </div>
                <input id="input-addon-edit-icon" type="text"
                    v-model="options.icon" class="form-control" />
            </div>
            <small class="form-text text-muted">
                輸入圖示的 class 名稱，例: <code>fa fa-star</code>，可
                <a target="_blank" href="https://fontawesome.com/icons">在這裡</a> 查詢可用圖示。
            </small>
        </div>

        {{-- Content Align --}}
        <div class="form-group">
            <label for="input-addon-edit-icon_position">圖示位置</label>
            <div class="mt-2">
                <radio-buttons v-model="options.icon_position" class="btn-block">
                    <radio-button value="left">
                        左
                    </radio-button>
                    <radio-button value="right">
                        右
                    </radio-button>
                </radio-buttons>
            </div>
        </div>
    </div>
</script>
