<template>
  <div id="page-builder" class="page-builder card bg-light border-0"
    ref="root">
    <div class="card-header page-builder__topbar d-flex">
      <div class="ms-auto">
        <button type="button" class="btn btn-outline-secondary btn-sm"
          @click="cssEdit"
          style="min-width: 150px">
          <span class="fa fa-css3"></span>
          Edit CSS
        </button>

        <CDropdown class="d-inline-block text-nowrap">
          <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="openTemplates(content.length)">
            <div style="display: inline-block; min-width: 120px">
              <span class="fa fa-file-code"></span>
              Insert Template
            </div>
          </button>
          <CDropdownToggle color="secondary" vaiant="outline" size="sm" split></CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="$trigger('tmpl.save', content, 'page')">
              <span class="fa fa-fw fa-save"></span>
              Save as Template
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <button type="button" class="btn btn-outline-secondary btn-sm" @click="copy"
          style="min-width: 150px">
          <span class="fa fa-clone"></span>
          Copy page content
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="page-builder__body body">

        <draggable v-model="content" @start="drag = true" @end="drag = false"
          v-bind="{ handle: '.row-move-handle', animation: 300 }"
          item-key="id"
        >
          <template #item="{ element: row, index: i }">
            <Row class="body__row page-row mb-4"
              :value="row"
              move-handle="row-move-handle"
              @columns-change="columnsChange(row, $event)"
              @add="addNewRow(i)"
              @duplicate="duplicateRow($event || row, i)"
              @paste-page="pastePage($event, i)"
              @open-templates="openTemplates(i)"
              @delete="deleteRow(i)">
            </Row>
          </template>
        </draggable>

      </div>

      <div class="page-builder__bottom-toolbar text-center" v-if="content.length === 0">
        <CDropdown class="d-inline-block text-nowrap">
          <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="addNewRow()">
            Add New Row
          </button>
          <CDropdownToggle color="secondary" vaiant="outline" size="sm" split></CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="paste">
              <span class="fa fa-fw fa-paste"></span>
              Paste
            </CDropdownItem>
            <CDropdownItem @click="paste">
              <span class="fa fa-fw fa-file-code"></span>
              Insert Template
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>

      <textarea name="item[content]" id="input-item-content" style="display: none;">{{ getSaveValue() }}</textarea>

      <!-- Inline Components -->

      <!-- Modals -->
      <RowEdit ref="rowEditor" />
      <ColumnEdit ref="columnEditor" />
      <!--<AddonEdit ref="addonEditor" />-->

      <!-- Addon selector -->
      <div class="modal fade" id="addon-list-modal" tabindex="-1" role="dialog" aria-labelledby="addon-list-modal-label"
        aria-hidden="true" ref="addonList">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="m-0">New Addon</h3>
              <button type="button" class="btn btn-secondary ml-auto ms-auto" data-dismiss="modal">
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
      <TemplateManager ref="tmplManager" />

      <CModal :visible="cssModalShow" size="xl"
        @close="cssModalShow = false"
        :backdrop="'static'"
      >
        <CModalHeader>
          <CModalTitle>CSS Edit</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CssEditor v-model:value="css"></CssEditor>

          <template v-slot:modal-footer>
            <div class="ml-auto ms-auto">
              <button type="button" class="btn btn-primary" style="min-width: 200px"
                @click="savePage"
                :disabled="saving">
                <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
                Save
              </button>
            </div>
          </template>
        </CModalBody>
      </CModal>

      <textarea name="item[css]" id="input-item-css" style="display: none;">{{ css }}</textarea>
    </div>

    <Store />
  </div>
</template>

<script>
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/vue';
import { each } from 'lodash-es';
import { nextTick, onMounted, reactive, toRefs } from 'vue';
import { ref } from 'vue/dist/vue.esm-browser';
// import AddonEdit from '../components/page-builder/AddonEdit';
import ColumnEdit from '../components/page-builder/ColumnEdit';
import CssEditor from '../components/page-builder/CssEditor';
import Row from '../components/page-builder/Row';
import RowEdit from '../components/page-builder/RowEdit';
import Store from '../components/page-builder/Store';
import draggable from 'vuedraggable';
import TemplateManager from '../components/page-builder/templates/TemplateManager';
import {
  addTextToClipboard,
  emptyRow,
  readClipboard,
  savePage as doSavePage
} from '../services/page-builder/page-builder.service.js';

export default {
  name: 'PageBuilderApp',
  components: {
    TemplateManager,
    Store,
    // AddonEdit,
    ColumnEdit,
    RowEdit,
    Row,
    CssEditor,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu,
    draggable,
  },

  setup(props) {
    const root = ref(null);
    const state = reactive({
      content: u.data('builder-content') || [],
      drag: false,
      editing: {
        column: {},
        row: {},
        addon: {}
      },
      addons: u.data('addons') || [],
      css: u.data('css') || '',
      saving: false,
      cssModalShow: false,
    });

    u.trigger('page-builder.created', this);

    const rowEditor = ref(null);
    const columnEditor = ref(null);
    const addonEditor = ref(null);
    const addonList = ref(null);
    const tmplManager = ref(null);

    onMounted(() => {
      if (location.hash === '#css') {
        cssEdit();
      }

      // Prevent CModaal close button submit form
      u.delegate(root.value, '.btn-close', 'click', (e) => {
        e.preventDefault();
      });

      // PageBuilderService.bindSaveButton();

      registerUnicornEvents(
        state,
        {
          rowEditor,
          columnEditor,
          addonEditor,
          addonList,
          tmplManager
        });
    });

    // CSS
    // const cssModalShow = ref(false);

    function cssEdit() {
      state.cssModalShow = true;
    }

    // CRUD
    function addNewRow(i = null) {
      if (i != null) {
        state.content.splice(i + 1, 0, emptyRow());
      } else {
        state.content.push(emptyRow());
      }
    }

    function deleteRow(i) {
      state.content.splice(i, 1);
    }

    // Copy / Paste
    function copy() {
      addTextToClipboard(state.content);
    }

    async function paste() {
      const text = await readClipboard();

      try {
        let data = JSON.parse(text);

        data.forEach((item) => {
          duplicateRow(item, state.content.length);
        });
      } catch (e) {
        console.error(e);
        alert('Invalid format.');
      }
    }

    async function pastePage(text, i) {
      const t = await readClipboard();

      return pasteTo(t, i);
    }

    function pasteTo(text, i) {
      try {
        const data = JSON.parse(text);

        if (!Array.isArray(data)) {
          duplicateRow(data, i);
          return;
        }

        data.forEach((item) => {
          duplicateRow(item, i++);
        });
      } catch (e) {
        console.error(e);
        alert('Invalid format.');
      }
    }

    // Duplicate
    function duplicateRow(row, i) {
      row = JSON.parse(JSON.stringify(row));

      row.id = 'row-' + u.uid();

      row.columns = this.handleDuplicateColumns(row.columns);

      state.content.splice(i + 1, 0, row);
    }

    function handleDuplicateColumns(columns) {
      return columns.map(column => {
        column.id = 'col-' + u.uid();

        column.addons = handleDuplicateAddons(column.addons);

        return column;
      });
    }

    function handleDuplicateAddons(addons) {
      return addons.map(addon => {
        if (addon.type !== 'row') {
          addon.id = 'addon-' + u.uid();
          return addon;
        }

        // Is row
        addon.id = 'row-' + u.uid();

        addon.columns = addon.columns.map(column => {
          column.id = 'col-' + u.uid();

          column.addons = handleDuplicateAddons(column.addons);

          return column;
        });

        return addon;
      });
    }

    // Events
    function columnsChange(row, $event) {
      row.columns = $event.columns;
    }

    function selectAddon(type) {
      addonList.value.hide();

      const addonData = u.data('addons')[type];

      setTimeout(() => {
        u.trigger('addon:edit', { ...addonData, id: 'addon-' + u.uid(), is: 'addon' }, state.editing.column);
        document.body.classList.add('modal-open');
      }, 365);
    }

    // Utilities

    function getSaveValue() {
      return JSON.stringify(this.content);
    }

    function openTemplates(i = 0) {
      u.trigger('tmpl.open', (item, type, i) => {
        pasteTo(item.content, i);
      }, 'page,row', i);
    }

    function savePage() {
      state.saving = true;
      nextTick(() => {
        doSavePage(state.saving)
          .finally(() => {
            state.saving = false;
          });
      });
    }

    return {
      root,
      rowEditor,
      columnEditor,
      addonEditor,
      tmplManager,
      ...toRefs(state),

      cssEdit,
      addNewRow,
      deleteRow,
      copy,
      paste,
      pasteTo,
      pastePage,
      duplicateRow,
      handleDuplicateAddons,
      handleDuplicateColumns,
      columnsChange,
      selectAddon,
      getSaveValue,
      emptyRow,
      openTemplates,
      savePage
    };
  },
};

function registerUnicornEvents(state, { rowEditor, columnEditor, addonEditor, addonList, tmplManager }) {
  u.on('row:edit', (content, column) => {
    state.editing.column = {};
    state.editing.row = {};

    state.editing.row = content;
    state.editing.column = content;
    rowEditor.value.edit(content);
  });

  u.on('row:save', content => {
    each(content, (v, k) => {
      state.editing.row[k] = v;
    });
  });

  u.on('column:edit', content => {
    state.editing.column = {};
    state.editing.column = content;
    columnEditor.value.edit(content);
  });

  u.on('column:save', content => {
    each(content, (v, k) => {
      state.editing.column[k] = v;
    });
  });

  u.on('addon:add', (column) => {
    state.editing.column = {};
    state.editing.column = column;

    addonList.value.show();
  });

  u.on('addon:edit', (addon, column) => {
    state.editing.addon = {};
    state.editing.column = {};
    state.editing.addon = addon;
    state.editing.column = column;

    addonEditor.value.edit(addon);
  });

  u.on('addon:save', (addon) => {
    if (state.editing.column.addons.filter(item => item.id === addon.id).length === 0) {
      state.editing.column.addons.push(addon);
    }

    each(addon, (v, k) => {
      state.editing.addon[k] = v;
    });
  });

  u.on('tmpl.open', (callback, type, i) => {
    tmplManager.value.open(callback, type, i);
  });

  u.on('tmpl.save', (content, type) => {
    tmplManager.value.openSave(content, type);
  });

  u.trigger('page-builder.mounted', this);
}
</script>

<style scoped>

</style>

<style>
.CodeMirror {
  height: 450px !important;
}

.form-group label {
  margin-bottom: .5rem;
}
</style>
