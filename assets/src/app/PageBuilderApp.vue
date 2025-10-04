<script lang="ts" setup>
import { data, selectAll, uid, useUnicorn } from '@windwalker-io/unicorn-next';
import { getCurrentInstance, inject, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import { ComponentExposed } from 'vue-component-type-helpers';
import { VueDraggable } from 'vue-draggable-plus';
import {
  Addon,
  AddonAddEvent,
  AddonDefine,
  AddonEditEvent,
  AddonSaveEvent,
  Column,
  ColumnEditEvent,
  ColumnSaveEvent,
  Dictionary,
  PageBuilderCreatedEvent,
  PageBuilderMountedEvent,
  Row,
  RowEditEvent,
  RowSaveEvent,
  TemplateOpenEvent,
  TemplateSaveEvent
} from '~luna/types';
import AddonEdit from '../components/page-builder/AddonEdit.vue';
import BsModal from '../components/page-builder/bootstrap/BsModal.vue';
import ColumnEdit from '../components/page-builder/ColumnEdit.vue';
import CssEditor from '../components/page-builder/CssEditor.vue';
import RowBox from '../components/page-builder/RowBox.vue';
import RowEdit from '../components/page-builder/RowEdit.vue';
import TemplateManager from '../components/page-builder/templates/TemplateManager.vue';
import { usePageBuilderUtilities } from '../services/page-builder/usePageBuilderUtilities';

const {
  addTextToClipboard,
  emptyRow,
  readClipboard,
  savePage: doSavePage,
  bindSaveButton,
  duplicateAny
} = usePageBuilderUtilities();

const u = useUnicorn();
const addonDefines = inject<Dictionary<AddonDefine>>('addons')!;
const app = getCurrentInstance()!;
const content = ref<Row[]>(data('builder-content') || []);
const drag = ref(false);
const editingRow = ref<Row>();
const editingColumn = ref<Column>();
const editingAddon = ref<Addon>();
const css = ref(data<string>('css') || '');
const saving = ref(false);
const cssModalShow = ref(false);

u.trigger<PageBuilderCreatedEvent>('page-builder.created', app);

const rowEditor = useTemplateRef<ComponentExposed<typeof RowEdit>>('rowEditor');
const columnEditor = useTemplateRef<ComponentExposed<typeof ColumnEdit>>('columnEditor');
const addonEditor = useTemplateRef<ComponentExposed<typeof AddonEdit>>('addonEditor');
const addonListShow = ref(false);
const tmplManager = useTemplateRef<ComponentExposed<typeof TemplateManager>>('tmplManager');

onMounted(() => {
  if (location.hash === '#css') {
    cssEdit();
  }

  bindSaveButton();

  registerUnicornEvents();
});

// CSS
// const cssModalShow = ref(false);

function cssEdit() {
  cssModalShow.value = true;
}

// CRUD
function addNewRow(i?: number) {
  if (i != null) {
    content.value.splice(i + 1, 0, emptyRow());
  } else {
    content.value.push(emptyRow());
  }
}

function deleteRow(i: number) {
  content.value.splice(i, 1);
}

// Copy / Paste
function copy() {
  addTextToClipboard(content.value);
}

async function paste() {
  const text = await readClipboard();

  try {
    let data: Row[] = JSON.parse(text);

    for (const item of data) {
      duplicateRow(item, content.value.length);
    }
  } catch (e) {
    console.error(e);
    alert('Invalid format.');
  }
}

async function pastePage(text: any, i: number) {
  const t = await readClipboard();

  return pasteTo(t, i);
}

function pasteTo(text: string, i: number) {
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
function duplicateRow(row: Row, i: number) {
  row = duplicateAny(row);

  content.value.splice(i + 1, 0, row);
}

// function handleDuplicateColumns(columns) {
//   return columns.map(column => {
//     column.id = 'col-' + u.uid();
//
//     column.addons = handleDuplicateAddons(column.addons);
//
//     return column;
//   });
// }
//
// function handleDuplicateAddons(addons) {
//   return addons.map(addon => {
//     if (addon.type !== 'row') {
//       addon.id = 'addon-' + u.uid();
//       return addon;
//     }
//
//     // Is row
//     addon.id = 'row-' + u.uid();
//
//     addon.columns = addon.columns.map(column => {
//       column.id = 'col-' + u.uid();
//
//       column.addons = handleDuplicateAddons(column.addons);
//
//       return column;
//     });
//
//     return addon;
//   });
// }

// Events
function columnsChange(row: Row, $event) {
  row.columns = $event.columns;
}

function selectAddon(type: string) {
  addonListShow.value = false;

  const addonDefine = addonDefines[type];

  u.trigger<AddonEditEvent>('addon:edit', { ...addonDefine, id: 'addon-' + uid(), is: 'addon' }, editingColumn.value);

  nextTick(() => {
    selectAll('.bs-tooltip-auto', (ele) => {
      ele.parentElement?.removeChild(ele);
    });
  });
}

// Save
const contentInput = document.querySelector<HTMLTextAreaElement>('#input-item-content')!;

watch(() => content.value, () => {
  contentInput.value = JSON.stringify(content.value);
}, { immediate: true, deep: true });

const cssInput = document.querySelector<HTMLTextAreaElement>('#input-item-css')!;

watch(() => css.value, () => {
  cssInput.value = css.value;
}, { immediate: true, deep: true });

// Utilities
function openTemplates(i = 0) {
  u.trigger<TemplateOpenEvent>('tmpl.open', (item, type, i) => {
    pasteTo(item.content, i);
  }, 'page,row', i);
}

async function savePage() {
  saving.value = true;

  await nextTick();

  try {
    return await doSavePage();
  } finally {
    saving.value = false;
  }
}

function registerUnicornEvents() {
  u.on<RowEditEvent>('row:edit', (content) => {
    editingColumn.value = undefined;
    editingAddon.value = undefined;

    editingRow.value = content;
    rowEditor.value?.edit(content);
  });

  u.on<RowSaveEvent>('row:save', (content) => {
    if (!editingRow.value) {
      return;
    }

    editingRow.value = { ...editingRow.value, ...content };
  });

  u.on<ColumnEditEvent>('column:edit', content => {
    editingRow.value = undefined;
    editingAddon.value = undefined;

    editingColumn.value = content;
    columnEditor.value?.edit(content);
  });

  u.on<ColumnSaveEvent>('column:save', content => {
    if (!editingColumn.value) {
      return;
    }

    editingColumn.value = { ...editingColumn.value, ...content };
  });

  u.on<AddonAddEvent>('addon:add', (column) => {
    editingColumn.value = undefined;
    editingColumn.value = column;

    addonListShow.value = true;
  });

  u.on<AddonEditEvent>('addon:edit', (addon, column) => {
    editingRow.value = undefined;
    editingColumn.value = undefined;

    editingAddon.value = addon;
    editingColumn.value = column;

    addonEditor.value?.edit(addon);
  });

  u.on<AddonSaveEvent>('addon:save', (addon) => {
    if (!editingColumn.value) {
      return;
    }

    if (editingColumn.value.addons.filter(item => item.id === addon.id).length === 0) {
      editingColumn.value.addons.push(addon);
    }

    editingAddon.value = { ...editingAddon.value, ...addon };
  });

  u.on<TemplateOpenEvent>('tmpl.open', (callback, type, i) => {
    tmplManager.value?.open(callback, type, i);
  });

  u.on<TemplateSaveEvent>('tmpl.save', (content, type) => {
    tmplManager.value?.openSave(content, type);
  });

  u.trigger<PageBuilderMountedEvent>('page-builder.mounted', app);
}
</script>

<template>
  <div id="page-builder" class="page-builder card bg-light border-0">
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
              <button class="dropdown-item" @click="$trigger<TemplateSaveEvent>('tmpl.save', content, 'page')">
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

        <VueDraggable v-model="content" @start="drag = true" @end="drag = false"
          v-bind="{ handle: '.row-move-handle', animation: 300 }"
          item-key="id"
          @add.stop
        >
          <template v-for="(row, i) of content" :key="row.id">
            <RowBox class="body__row page-row mb-4"
              :value="row"
              move-handle="row-move-handle"
              @columns-change="columnsChange(row, $event)"
              @add-new="addNewRow(i)"
              @duplicate="duplicateRow($event || row, i)"
              @paste-page="pastePage($event, i)"
              @open-templates="openTemplates(i)"
              @delete="deleteRow(i)">
            </RowBox>
          </template>
        </VueDraggable>

      </div>

      <div class="page-builder__bottom-toolbar text-center" v-if="content.length === 0">
        <div class="dropdown btn-group text-nowrap">
          <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="addNewRow()">
            Add New Row
          </button>
          <button class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split">
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
          <div v-for="addon of addonDefines" class="col-6 col-md-4 mb-2 c-addon-list__item c-addon">
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
  </div>
</template>

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
