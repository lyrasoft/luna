<template>
  <div id="page-builder" class="page-builder card bg-light border-0">
    <div class="card-header page-builder__topbar d-flex">
      <div class="ml-auto">
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="cssEdit"
          style="min-width: 150px">
          <span class="fa fa-css3"></span>
          編輯CSS
        </button>

        <b-dropdown variant="outline-secondary" split size="sm"
          @click="openTemplates(content.length)">
          <template v-slot:button-content>
            <div style="min-width: 120px">
              <span class="fa fa-file-code"></span>
              插入模版
            </div>
          </template>
          <b-dropdown-item @click="$trigger('tmpl.save', content, 'page')">
            <span class="fa fa-fw fa-save"></span>
            儲存為模版
          </b-dropdown-item>
        </b-dropdown>

        <button type="button" class="btn btn-outline-secondary btn-sm" @click="copy"
          style="min-width: 150px">
          <span class="fa fa-clone"></span>
          複製全頁內容
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="page-builder__body body">

          <draggable v-model="content" @start="drag = true" @end="drag = false"
            v-bind="{ handle: '.row-move-handle', animation: 300 }">
<!--            <transition-group name="fade" style="animation-duration: .3s">-->
              <row v-for="(row, i) of content" class="body__row page-row mb-4"
                :key="row.id"
                :value="row"
                move-handle="row-move-handle"
                @columns-change="columnsChange(row, $event)"
                @add="addNewRow(i)"
                @duplicate="duplicateRow($event || row, i)"
                @paste-page="pastePage($event, i)"
                @open-templates="openTemplates(i)"
                @delete="deleteRow(i)">
              </row>
<!--            </transition-group>-->
          </draggable>

      </div>

      <div class="page-builder__bottom-toolbar text-center" v-if="content.length === 0">
        <b-dropdown variant="outline-secondary" split size="sm" text="Add New Row"
          @click="addNewRow()">
          <b-dropdown-item @click="paste">
            <span class="fa fa-fw fa-paste"></span>
            貼上
          </b-dropdown-item>
          <b-dropdown-item @click="openTemplates(0)">
            <span class="fa fa-fw fa-file-code"></span>
            插入模版
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

      <!-- Templates -->
      <template-manager ref="tmpl" />

      <b-modal title="CSS" ref="css-modal" size="xl">
        <css-editor v-model="css"></css-editor>

        <template v-slot:modal-footer>
          <div class="ml-auto">
            <button type="button" class="btn btn-primary" style="min-width: 200px"
              @click="savePage"
              :disabled="saving">
              <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
              儲存
            </button>
          </div>
        </template>
      </b-modal>

      <textarea name="item[css]" id="input-item-css" style="display: none;">{{ css }}</textarea>
    </div>
  </div>
</template>

<script>
import AddonEdit from '../components/page-builder/addon-edit';
import ColumnEdit from '../components/page-builder/column-edit';
import CssEditor from '../components/page-builder/css-editor';
import RowEdit from '../components/page-builder/row-edit';
import Row from '../components/page-builder/row';
import TemplateManager from '../components/page-builder/templates/template-manager';
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
      addons: Phoenix.data('addons'),
      css: Phoenix.data('css'),
      saving: false
    };
  },
  components: {
    CssEditor,
    TemplateManager,
    AddonEdit,
    ColumnEdit,
    RowEdit,
    Row
  },
  created() {
    Phoenix.trigger('page-builder.created', this);
  },
  mounted() {
    if (location.hash === '#css') {
      this.cssEdit();
    }

    PageBuilderService.bindSaveButton();

    Phoenix.on('row:edit', (content, column) => {
      this.editing.column = {};
      this.editing.row = {};

      this.editing.row = content;
      this.editing.column = content;
      this.$refs.rowEdit.edit(content);
    });

    Phoenix.on('row:save', content => {
      each(content, (v, k) => {
        this.editing.row[k] = v;
      });
    });

    Phoenix.on('column:edit', content => {
      this.editing.column = {};
      this.editing.column = content;
      this.$refs.columnEdit.edit(content);
    });

    Phoenix.on('column:save', content => {
      each(content, (v, k) => {
        this.editing.column[k] = v;
      });
    });

    Phoenix.on('addon:add', (column) => {
      this.editing.column = {};
      this.editing.column = column;

      $(this.$refs.addonList).modal('show');
    });

    Phoenix.on('addon:edit', (addon, column) => {
      this.editing.addon = {};
      this.editing.column = {};
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
    });

    Phoenix.on('tmpl.open', (callback, type, i) => {
      this.$refs['tmpl'].open(callback, type, i);
    });

    Phoenix.on('tmpl.save', (content, type) => {
      this.$refs['tmpl'].openSave(content, type);
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
        this.pasteTo(text, i);
      });
    },

    pasteTo(text, i) {
      try {
        const data = JSON.parse(text);

        if (!Array.isArray(data)) {
          this.duplicateRow(data, i);
          return;
        }

        data.forEach((item) => {
          this.duplicateRow(item, i++);
        });
      } catch (e) {
        console.error(e);
        alert('不是正確的格式');
      }
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
    },
    openTemplates(i = 0) {
      Phoenix.trigger('tmpl.open', (item, type, i) => {
        this.pasteTo(item.content, i);
      }, 'page,row', i);
    },
    cssEdit() {
      this.$refs['css-modal'].show();
    },

    savePage() {
      this.saving = true;
      this.$nextTick(() => {
        PageBuilderService.save(this.saving)
          .always(() => {
            this.saving = false;
          });
      });
    },
  },
  watch: {

  },
  computed: {
  }
};
</script>

<style scoped>

</style>

<style>
.CodeMirror {
  height: 450px !important;
}
</style>
