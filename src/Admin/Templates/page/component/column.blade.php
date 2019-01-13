{{-- Part of earth project. --}}

<script id="column-component-tmpl" type="text/template">
    <div class="" :class="width" :disabled="content.disabled">
        <div class="card column__body">
            <div class="column__top-bar d-flex card-header" :class="{'p-2': child}">
                <div class="column__title mb-2 d-flex align-items-center">
                    <div class="column__move">
                        <div class="badge badge-secondary column-move-handle mr-2" style="cursor: move">
                            <span class="fa fa-fw fa-arrows-alt"></span>
                        </div>
                    </div>
                    <h6 class="m-0">COL</h6>
                    @debug
                    <code>@{{ content.id }}</code>
                    @enddebug
                </div>

                <div class="column__actions ml-auto text-nowrap">
                    <button type="button" class="btn btn-mini btn-primary"
                        v-if="!content.disabled"
                        @click="addAddon()">
                        <span class="fa fa-plus"></span>
                        <span v-if="!child">
                            Addon
                        </span>
                    </button>

                    <div class="dropdown d-inline-block" :class="widthMenuOpen">
                        <button type="button" href="javascript://" class="btn btn-mini btn-outline-secondary"
                            @click="widthMenuOpen = widthMenuOpen === 'show' ? '' : 'show'">
                            <span class="fa fa-arrows-alt-h"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right px-3" :class="widthMenuOpen">
                            <div class="form-group">
                                <label for="input-column-edit-width-desktop">桌面版寬度 Desktop</label>
                                <select id="input-column-edit-width-desktop"
                                    v-model="content.options.width.lg" class="form-control">
                                    <option v-for="w of widthRange()" :value="'col-lg-' + w">
                                        col-lg-@{{ w }}
                                    </option>
                                </select>
                            </div>

                            {{-- Tablet Layout --}}
                            <div class="form-group">
                                <label for="input-column-edit-width-tablet">平板寬度 Tablet</label>
                                <select id="input-column-edit-width-tablet"
                                    v-model="content.options.width.md" class="form-control">
                                    <option value="">- 不設定 -</option>
                                    <option v-for="w of widthRange()" :value="'col-md-' + w">
                                        col-md-@{{ w }}
                                    </option>
                                </select>
                            </div>

                            {{-- Mobile Layout --}}
                            <div class="form-group">
                                <label for="input-column-edit-width-mobile">手機寬度 Mobile</label>
                                <select id="input-column-edit-width-mobile"
                                    v-model="content.options.width.xs" class="form-control">
                                    <option value="">- 不設定 -</option>
                                    <option v-for="w of widthRange()" :value="'col-' + w">
                                        col-@{{ w }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown d-inline-block">
                        <button type="button" class="btn btn-mini btn-outline-secondary"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="fa fa-cog"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="javascript://" @click="edit()"
                                v-if="!content.disabled">
                                <span class="fa fa-edit"></span>
                                編輯
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="copy()"
                                v-if="!content.disabled">
                                <span class="fa fa-copy"></span>
                                複製
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="toggleDisabled()">
                                <span class="fa" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                                @{{ content.disabled ? '啟用' : '停用' }}
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="addNewRow()"
                                v-if="!content.disabled && !child">
                                <span class="fa fa-plus"></span>
                                新增列
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="remove()">
                                <span class="fa fa-trash"></span>
                                刪除
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-2">
                <draggable v-model="content.addons" @start="drag = true" @end="drag = false"
                    :options="{handle: '.move-handle', group: 'addon', animation: 300}"
                    style="min-height: 50px;" class="column__draggable">
                    <div class="column__addon" v-for="(addon, i) of addons">
                        <addon v-if="addon.type !== 'row'"
                            @delete="deleteAddon(i)"
                            @copy="copyAddon(addon, i)"
                            :index="i"
                            :key="addon.id"
                            :content="addon"
                            :column="content"></addon>
                        <row v-else
                            :index="i"
                            :key="addon.id"
                            :value="addon"
                            :child="true"
                            {{--@columns-change="columnsChange(addon, $event)"--}}
                            @delete="deleteAddon(i)"
                        ></row>
                    </div>

                    <a class="column__addon-placeholder text-center p-3 border text-secondary"
                        {{--v-if="addons.length === 0 && !drag"--}}
                        href="javascript://" @click="addAddon()">
                        <span class="fa fa-plus-circle fa-3x"></span>
                    </a>
                </draggable>
            </div>
        </div>
    </div>
</script>
