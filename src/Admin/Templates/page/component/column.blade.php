{{-- Part of earth project. --}}

<script id="column-component-tmpl" type="text/template">
    <div class="" :class="width" :disabled="content.disabled">
        <div class="card column__body">
            <div class="column__top-bar d-flex card-header" :class="{'p-2': child}">
                <div class="column__title mb-2">
                    <div class="badge badge-secondary column-move-handle mr-2" style="cursor: move">
                        <span class="fa fa-fw fa-arrows-alt"></span>
                    </div>
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

                    <span class="dropdown">
                        <button href="javascript://" class="btn btn-mini btn-outline-secondary"
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
                    </span>
                </div>
            </div>
            <div class="card-body p-2">
                <draggable v-model="content.addons" @start="drag = true" @end="drag = false"
                    :options="{handle: '.move-handle', group: 'addon'}" style="min-height: 50px;" class="column__draggable">
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
