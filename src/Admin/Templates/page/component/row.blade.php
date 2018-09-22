{{-- Part of earth project. --}}

<script id="row-component-tmpl" type="text/template">
    <div class="page-row__wrapper">
        <div class="page-row__title-bar d-flex mb-2">
            <div class="page-row__title">
                <span class="badge badge-secondary mr-2" style="cursor: move">
                    <span class="fa fa-fw fa-arrows-alt-v row-move-handle"></span>
                </span>
                Row: @{{ content.id }}
            </div>
            <div class="page-row__actions ml-auto">
                <button type="button" class="btn btn-sm btn-primary"
                    @click="addNewColumn()">
                    <span class="fa fa-plus"></span>
                    Add Column
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary"
                    @click="edit()">
                    <span class="fa fa-edit"></span>
                    Edit Row
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger"
                    @click="remove()">
                    <span class="fa fa-trash"></span>
                </button>
            </div>
        </div>

        <div class="card">
            <div is="draggable" class="card-body page-row__body row"
                v-model="columns" @start="drag = true" @end="drag = false"
                :options="{handle: '.column-move-handle', group: 'column'}">
                <column v-for="(column, i) of columns" class="page-row__column column mb-3" :class="[getColumnWidth(column.options)]"
                    @delete="deleteColumn(i)"
                    :index="i"
                    :key="column.id"
                    :content="column">

                </column>
            </div>
        </div>
    </div>
</script>
