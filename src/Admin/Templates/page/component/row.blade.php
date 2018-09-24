{{-- Part of earth project. --}}

<script id="row-component-tmpl" type="text/template">
    <div class="bg-light" :class="{'p-2': child, 'rounded': child}" :disabled="content.disabled">
        <div class="page-row__title-bar d-flex mb-2">
            <div class="page-row__title d-flex">
                <div class="page-row__move-cursor">
                    <span class="badge badge-secondary mr-2" style="cursor: move">
                        <span class="fa fa-fw fa-arrows-alt-v row-move-handle"></span>
                    </span>
                </div>
                <div :is="child ? 'strong' : 'h5'">
                    @{{ options.label === '' ? 'ROW' : options.label }}
                </div>

                @debug
                <small class="ml-3">
                    @{{ content.id }}
                </small>
                @enddebug
            </div>
            <div class="page-row__actions ml-auto text-nowrap">
                <button type="button" class="btn btn-sm btn-primary"
                    v-if="!content.disabled"
                    @click="addNewColumn()">
                    <span class="fa fa-plus"></span>
                    <span v-if="!child">
                        新增欄
                    </span>
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary"
                    v-if="!content.disabled"
                    @click="edit()">
                    <span class="fa fa-edit"></span>
                    <span v-if="!child">
                    編輯
                    </span>
                </button>
                <span class="dropdown">
                    <button href="javascript://" class="btn btn-sm btn-outline-secondary"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="fa fa-cog"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="javascript://" @click="toggleDisabled()">
                                <span class="fa" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                                @{{ content.disabled ? '啟用' : '停用' }}
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="copy()" v-if="!content.disabled">
                                <span class="fa fa-copy"></span>
                                複製
                            </a>
                            <a class="dropdown-item" href="javascript://" @click="remove()">
                                <span class="fa fa-trash"></span>
                                刪除
                            </a>
                        </div>
                </span>
            </div>
        </div>

        <div class="card">
            <div is="draggable" class="card-body page-row__body row" :class="{'p-2': child}"
                v-model="content.columns" @start="drag = true" @end="drag = false"
                :options="{handle: '.column-move-handle', group: 'column' + (child ? '-child' : '')}" style="min-height: 50px;">
                <column v-for="(column, i) of columns" class="page-row__column column mb-2"
                    @delete="deleteColumn(i)"
                    @copy="copyColumn(column, i)"
                    :index="i"
                    :key="column.id"
                    :value="column"
                    :child="child">

                </column>

                <a class="page-row__body-placeholder text-center p-4 border text-secondary col-12"
                {{--v-if="addons.length === 0 && !drag"--}}
                href="javascript://" @click="addNewColumn()">
                <span class="fa fa-plus-square fa-3x"></span>
                </a>
            </div>
        </div>
    </div>
</script>
