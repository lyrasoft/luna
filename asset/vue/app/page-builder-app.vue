<template>
  <div class="card bg-light border-0">
    <div class="card-body">
      <div class="page-builder__body body">

        <draggable v-model="content" @start="drag = true" @end="drag = false"
          :options="{ handle: '.row-move-handle', animation: 300 }">
          <row v-for="(row, i) of content" class="body__row page-row mb-4"
            :key="row.id"
            :value="row"
            move-handle="row-move-handle"
            @columns-change="columnsChange(row, $event)"
            @add="addNewRow(i)"
            @copy="copyRow(row, i)"
            @delete="deleteRow(i)">
          </row>
        </draggable>

      </div>

      <div class="page-builder__bottom-toolbar text-center" v-if="content.length === 0">
        <button type="button" class="btn btn-outline-secondary btn-sm"
          @click="addNewRow()">
          Add New Row
        </button>
      </div>

      <textarea name="item[content]" id="input-item-content" style="display: none;">{{ getSaveValue() }}</textarea>

      <!-- Inline Components -->

      <!-- Modals -->
      <row-edit />
      <column-edit />
      <addon-edit />
      @include('modal.addons')
    </div>
  </div>
</template>

<script>
import AddonEdit from '../components/page-builder/addon-edit';
import ColumnEdit from '../components/page-builder/column-edit';
import RowEdit from '../components/page-builder/row-edit';
import PageBuilderService from '../services/page-builder-services';

export default {
  name: 'page-builder-app',
  data() {
    return {
      content: Phoenix.data('builder-content') || [],
      drag: false,
      editing: {
        column: {},
        row: {},
        addon: {}
      }
    }
  },
  components: {
    AddonEdit,
    ColumnEdit,
    RowEdit

  },
  created() {
    Phoenix.trigger('page-builder.created', this);
  },
  mounted() {
    Phoenix.on('row:edit', (content, column) => {
      this.editing.row = content;
      this.editing.column = content;
      this.$refs.rowEdit.edit(content);
    });

    Phoenix.on('row:save', content => {
      underscore.each(content, (v, k) => {
        this.editing.row[k] = v;
      });

      this.editing.column = {};
      this.editing.row = {};
    });

    Phoenix.on('column:edit', content => {
      this.editing.column = content;
      this.$refs.columnEdit.edit(content);
    });

    Phoenix.on('column:save', content => {
      underscore.each(content, (v, k) => {
        this.editing.column[k] = v;
      });

      this.editing.column = {};
    });

    Phoenix.on('addon:add', (column) => {
      this.editing.column = column;

      $(this.$refs.addonList).modal('show');
    });

    Phoenix.on('addon:edit', (addon, column) => {
      this.editing.addon = addon;
      this.editing.column = column;

      this.$refs.addonEdit.edit(addon);
    });

    Phoenix.on('addon:save', (addon) => {
      if (this.editing.column.addons.filter(item => item.id === addon.id).length === 0) {
        this.editing.column.addons.push(addon);
      }

      underscore.each(addon, (v, k) => {
        this.editing.addon[k] = v;
      });

      this.editing.column = {};
      this.editing.addon = {};
    });

    Phoenix.trigger('page-builder.mounted', this);
  },
  methods: {
    addNewRow(i = null) {
      if (i != null) {
        this.content.splice(i + 1, 0, {});
      } else {
        this.content.push({});
      }
    },
    deleteRow(i) {
      this.content.splice(i, 1);
    },
    copyRow(row, i) {
      row = JSON.parse(JSON.stringify(row));

      row.id = 'row-' + Phoenix.uniqid();

      row.columns = this.handleCopyColumns(row.columns);

      this.content.splice(i + 1, 0, row);
    },
    handleCopyColumns(columns) {
      return columns.map(column => {
        column.id = 'col-' + Phoenix.uniqid();

        column.addons = this.handleCopyAddons(column.addons);

        return column;
      });
    },
    handleCopyAddons(addons) {
      return addons.map(addon => {
        if (addon.type !== 'row') {
          addon.id = 'addon-' + Phoenix.uniqid();
          return addon;
        }

        // Is row
        addon.id = 'row-' + Phoenix.uniqid();

        addon.columns = addon.columns.map(column => {
          column.id = 'col-' + Phoenix.uniqid();

          column.addons = this.handleCopyAddons(column.addons);

          return column;
        });

        return addon;
      });
    },

    columnsChange(row, $event) {
      row.columns = $event.columns;
    },
    selectAddon(type) {
      $(this.$refs.addonList).modal('hide');

      const addonData = Phoenix.data('addons')[type];

      setTimeout(() => {
        Phoenix.trigger('addon:edit', { ...addonData, id: 'addon-' + Phoenix.uniqid(), is: 'addon' }, this.editing.column);
        $('body').addClass('modal-open');
      }, 365);
    },
    getEmptyRow() {
      return PageBuilderService.rowData();
    },
    getSaveValue() {
      return JSON.stringify(this.content);
    }
  },
  watch: {

  },
  computed: {
  }
};
</script>

<style scoped>

</style>
