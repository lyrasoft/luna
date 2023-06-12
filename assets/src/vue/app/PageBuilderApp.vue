<template>
  <div id="page-builder" class="page-builder card bg-light border-0"
    ref="root">
    <div class="card-header page-builder__topbar d-flex">
      <div class="ms-auto">
        <button type="button" class="btn btn-outline-secondary btn-sm"
          @click="cssEdit"
          style="min-width: 150px">
          <span class="fab fa-css3"></span>
          Edit CSS
        </button>

        <div class="d-inline-block">
          <div class="text-nowrap btn-group dropdown">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="openTemplates(content.length)">
              <div style="display: inline-block; min-width: 120px">
                <span class="fa fa-file-code"></span>
                Insert Template
              </div>
            </button>
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              data-bs-toggle="dropdown"
            >
              <span class="visually-hidden sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-right">
              <button class="dropdown-item" @click="$trigger('tmpl.save', content, 'page')">
                <span class="fa fa-fw fa-save"></span>
                Save as Template
              </button>
            </div>
          </div>
        </div>

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
        <div class="dropdown btn-group text-nowrap">
          <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="addNewRow()">
            Add New Row
          </button>
          <button class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" >
            <span class="visually-hidden sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu dropdown-menu dropdown-menu-right ">
            <div class="dropdown-item" @click="paste">
              <span class="fa fa-fw fa-paste"></span>
              Paste
            </div>
            <div class="dropdown-item" @click="paste">
              <span class="fa fa-fw fa-file-code"></span>
              Insert Template
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <RowEdit ref="rowEditor" />
      <ColumnEdit ref="columnEditor" />
      <AddonEdit ref="addonEditor" />

      <!-- Addon selector -->
      <BsModal :open="addonListShow" @hidden="addonListShow = false" size="lg"
        class="c-modal-addon-select"
        title="New Addon">
        <div class="row c-addon-list">
          <div v-for="addon of addons" class="col-6 col-md-4 mb-2 c-addon-list__item c-addon">
            <a class="d-inline-block p-4 c-addon__link btn btn-outline-dark w-100 text-center"
              href="javascript://"
              v-tooltip
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
      </BsModal>

      <!-- Templates -->
      <TemplateManager ref="tmplManager" />

      <BsModal title="CSS Edit (Support SCSS)"
        size="xl"
        class="c-modal-css-edit"
        :open="cssModalShow"
        @hidden="cssModalShow = false"
        backdrop="static"
      >
        <CssEditor v-model="css" :auto-focus="true"></CssEditor>

        <template #footer>
          <div class="ml-auto ms-auto">
            <button type="button" class="btn btn-outline-dark"
              style="min-width: 150px"
              @click="cssModalShow = false">
              <i class="fa fa-times"></i>
              Close
            </button>
            <button type="button" class="btn btn-primary" style="min-width: 200px"
              @click="savePage"
              :disabled="saving">
              <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
              Save
            </button>
          </div>
        </template>
      </BsModal>
    </div>

    <Store />
  </div>
</template>

<script>
import BsModal from '@/components/page-builder/bootstrap/BsModal';
import { each } from 'lodash-es';
import { nextTick, onMounted, reactive, toRefs, ref, watch, getCurrentInstance, inject } from 'vue';
import * as Vue from 'vue';
import AddonEdit from '@/components/page-builder/AddonEdit';
import ColumnEdit from '@/components/page-builder/ColumnEdit';
import CssEditor from '@/components/page-builder/CssEditor';
import Row from '@/components/page-builder/Row';
import RowEdit from '@/components/page-builder/RowEdit';
import Store from '@/components/page-builder/Store';
import TemplateManager from '@/components/page-builder/templates/TemplateManager';
import {
  addTextToClipboard,
  emptyRow,
  readClipboard,
  savePage as doSavePage,
  bindSaveButton
} from '../services/page-builder/page-builder.service.js';

export default {
  name: 'PageBuilderApp',
  components: {
    BsModal,
    TemplateManager,
    Store,
    AddonEdit,
    ColumnEdit,
    RowEdit,
    Row,
    CssEditor,
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

    const app = inject('app');

    for (const k in state.addons) {
      const addon = state.addons[k];

      if (addon.componentModuleUrl) {
        S.import(addon.componentModuleUrl).then((module) => {
          app.component(addon.componentName, module.default(app, Vue));
        });
      }
    }

    u.trigger('page-builder.created', getCurrentInstance());

    const rowEditor = ref(null);
    const columnEditor = ref(null);
    const addonEditor = ref(null);
    const addonListShow = ref(null);
    const tmplManager = ref(null);

    onMounted(() => {
      if (location.hash === '#css') {
        cssEdit();
      }

      // Prevent CModal close button submit form
      // Todo: Can drop this now
      u.delegate(root.value, '.btn-close', 'click', (e) => {
        e.preventDefault();
      });

      bindSaveButton();

      registerUnicornEvents(
        state,
        {
          rowEditor,
          columnEditor,
          addonEditor,
          addonListShow,
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

      row.columns = handleDuplicateColumns(row.columns);

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
      addonListShow.value = false;

      const addonData = u.data('addons')[type];

      u.trigger('addon:edit', { ...addonData, id: 'addon-' + u.uid(), is: 'addon' }, state.editing.column);

      nextTick(() => {
        u.selectAll('.bs-tooltip-auto', (ele) => {
          ele.parentElement.removeChild(ele);
        });
      });
    }

    // Save
    const contentInput = document.querySelector('#input-item-content');

    watch(() => state.content, () => {
      contentInput.value = JSON.stringify(state.content);
    }, { immediate: true, deep: true });

    const cssInput = document.querySelector('#input-item-css');

    watch(() => state.css, () => {
      cssInput.value = state.css;
    }, { immediate: true, deep: true });

    // Utilities
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
      addonListShow,
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
      emptyRow,
      openTemplates,
      savePage
    };
  },
};

function registerUnicornEvents(state, { rowEditor, columnEditor, addonEditor, addonListShow, tmplManager }) {
  u.on('row:edit', (content) => {
    state.editing.column = {};
    state.editing.addon = {};

    state.editing.row = {};
    state.editing.row = content;
    rowEditor.value.edit(content);
  });

  u.on('row:save', content => {
    each(content, (v, k) => {
      state.editing.row[k] = v;
    });
  });

  u.on('column:edit', content => {
    state.editing.row = {};
    state.editing.addon = {};

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

    addonListShow.value = true;
  });

  u.on('addon:edit', (addon, column) => {
    state.editing.row = {};
    state.editing.column = {};

    state.editing.addon = {};
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

<style lang="scss">
.CodeMirror {
  height: 450px !important;
  font-size: 15px;
}

.form-group label:not(.btn) {
  margin-bottom: .5rem;
}
</style>
