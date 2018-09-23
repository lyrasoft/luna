{{-- Part of earth project. --}}

<script id="row-component-tmpl" type="text/template">
    <div class="page-row__wrapper bg-light" :class="{'p-2': child, 'rounded': child}">
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
            <div class="page-row__actions ml-auto">
                <button type="button" class="btn btn-sm btn-primary"
                    @click="addNewColumn()">
                    <span class="fa fa-plus"></span>
                    <span v-if="!child">
                        Add Column
                    </span>
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary"
                    @click="edit()">
                    <span class="fa fa-edit"></span>
                    <span v-if="!child">
                    Edit Row
                    </span>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger"
                    @click="remove()">
                    <span class="fa fa-trash"></span>
                </button>
            </div>
        </div>

        <div class="card">
            <div is="draggable" class="card-body page-row__body row" :class="{'p-2': child}"
                v-model="content.columns" @start="drag = true" @end="drag = false"
                :options="{handle: '.column-move-handle', group: 'column' + (child ? '-child' : '')}" style="min-height: 50px;">
                <column v-for="(column, i) of columns" class="page-row__column column mb-2"
                    @delete="deleteColumn(i)"
                    :index="i"
                    :key="column.id"
                    :value="column"
                    :child="child">

                </column>
            </div>
        </div>
    </div>
</script>
