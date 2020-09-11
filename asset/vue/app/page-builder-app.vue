<template>
  <div id="page-builder" class="page-builder card bg-light border-0">
    <div class="card-header page-builder__topbar d-flex">
      <div class="ml-auto">
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="copy">
          <span class="fa fa-clone"></span>
          複製全頁內容
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="page-builder__body body">


          <draggable v-model="content" @start="drag = true" @end="drag = false"
            :options="{ handle: '.row-move-handle', animation: 300 }">
            <transition-group name="fade" style="animation-duration: .3s">
              <row v-for="(row, i) of content" class="body__row page-row mb-4"
                :key="row.id"
                :value="row"
                move-handle="row-move-handle"
                @columns-change="columnsChange(row, $event)"
                @add="addNewRow(i)"
                @duplicate="duplicateRow($event || row, i)"
                @paste-page="pastePage($event, i)"
                @delete="deleteRow(i)">
              </row>
            </transition-group>
          </draggable>

      </div>

      <div class="page-builder__bottom-toolbar text-center" v-if="content.length === 0">
        <b-dropdown variant="outline-secondary" split size="sm" text="Add New Row"
          @click="addNewRow()">
          <b-dropdown-item @click="paste">
            <span class="far fa-paste"></span>
            貼上
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <textarea name="item[content]" id="input-item-content" style="display: none;">{{ getSaveValue() }}</textarea>

      <!-- Inline Components -->

      <!-- Modals -->
      <row-edit ref="rowEdit" />
      <column-edit ref="columnEdit" />
      <addon-edit ref="addonEdit" />

      <!-- Addon selector -->
      <div class="modal fade" id="addon-list-modal" tabindex="-1" role="dialog" aria-labelledby="addon-list-modal-label"
        aria-hidden="true" ref="addonList">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="m-0">建立新的 Addon</h3>
              <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">
                <span class="fa fa-times"></span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row c-addon-list">
                <div v-for="addon of addons" class="col-6 col-md-4 mb-2 c-addon-list__item c-addon">
                  <a class="d-block p-4 c-addon__link text-dark text-center rounded has-tooltip"
                    href="#"
                    :title="addon.description"
                    @click.prevent="selectAddon(addon.type)">
                    <div class="c-addon__icon">
                      <span class="fa-3x" :class="addon.icon"></span>
                    </div>
                    <h5 class="m-0">
                      {{ addon.name }}
                    </h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AddonEdit from '../components/page-builder/addon-edit';
import ColumnEdit from '../components/page-builder/column-edit';
import RowEdit from '../components/page-builder/row-edit';
import Row from '../components/page-builder/row';
import { emptyRow } from '../services/empty-data';
import PageBuilderService from '../services/page-builder-services';
import { each, startsWith } from 'lodash';

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
      },
      addons: Phoenix.data('addons')
    }
  },
  components: {
    AddonEdit,
    ColumnEdit,
    RowEdit,
    Row
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
      each(content, (v, k) => {
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
      each(content, (v, k) => {
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

      each(addon, (v, k) => {
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
        this.content.splice(i + 1, 0, this.getEmptyRow());
      } else {
        this.content.push(this.getEmptyRow());
      }
    },
    deleteRow(i) {
      this.content.splice(i, 1);
    },

    copy() {
      PageBuilderService.addToClipboard(this.content);
    },
    paste() {
      PageBuilderService.paste().then((text) => {
        try {
          let data = JSON.parse(text);

          data.forEach((item) => {
            this.duplicateRow(item, this.content.length);
          });
        } catch (e) {
          console.error(e);
          alert('不是正確的格式');
        }
      });
    },

    pastePage(text, i) {
      PageBuilderService.paste().then((text) => {
        try {
          const data = JSON.parse(text);

          data.forEach((item) => {
            this.duplicateRow(item, i++);
          });
        } catch (e) {
          console.error(e);
          alert('不是正確的格式');
        }
      });
    },

    duplicateRow(row, i) {
      row = JSON.parse(JSON.stringify(row));

      row.id = 'row-' + Phoenix.uniqid();

      row.columns = this.handleDuplicateColumns(row.columns);

      this.content.splice(i + 1, 0, row);
    },
    handleDuplicateColumns(columns) {
      return columns.map(column => {
        column.id = 'col-' + Phoenix.uniqid();

        column.addons = this.handleDuplicateAddons(column.addons);

        return column;
      });
    },
    handleDuplicateAddons(addons) {
      return addons.map(addon => {
        if (addon.type !== 'row') {
          addon.id = 'addon-' + Phoenix.uniqid();
          return addon;
        }

        // Is row
        addon.id = 'row-' + Phoenix.uniqid();

        addon.columns = addon.columns.map(column => {
          column.id = 'col-' + Phoenix.uniqid();

          column.addons = this.handleDuplicateAddons(column.addons);

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
      return emptyRow();
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
