<script lang="ts" setup>
import { deleteConfirm, simpleAlert, uid, useUnicorn } from '@windwalker-io/unicorn-next';
import { defaultsDeep } from 'lodash-es';
import swal from 'sweetalert';
import { computed, ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import ColumnBox from '~luna/components/page-builder/ColumnBox.vue';
import { usePageBuilderUtilities } from '~luna/composables';
import type { Addon, Column, Row, RowEditEvent, TemplateOpenEvent } from '~luna/types';

const {
  addTextToClipboard,
  duplicateAddon,
  duplicateAny,
  emptyColumn,
  emptyRow,
  readClipboard,
  isRow,
  isColumn,
  isAddon,
} = usePageBuilderUtilities();

const props = withDefaults(
  defineProps<{
    value: Row,
    child?: boolean,
    moveHandle?: string
  }>(),
  {
    child: false,
    moveHandle: 'move-handle'
  }
);

const emits = defineEmits<{
  'delete': [],
  'duplicate': [data?: Row],
  'columns-change': [{ columns: any[] }],
  'add-new': [],
  'open-templates': [],
  'paste-page': [data: Row[]]
}>();

const u = useUnicorn();
const content = ref<Row>(props.value);
const drag = ref(false);
content.value = defaultsDeep(content.value, emptyRow());

function addNewColumn() {
  content.value.columns.push(emptyColumn(props.child));
}

function copy() {
  addTextToClipboard(content.value);
}

async function paste(append = false) {
  const text = await readClipboard();

  pasteData(text, append);
}

async function pasteData(text: string, append = false) {
  try {
    const data: Row[] | Row | Column | Addon = JSON.parse(text);

    if (Array.isArray(data)) {
      emits('paste-page', data);
      return;
    }

    if (isAddon(data)) {
      simpleAlert('Unable to paste addon here.');
      return;
    }

    if (isColumn(data)) {
      duplicateColumn(data, content.value.columns.length - 1);
      return;
    }

    if (isRow(data)) {
      if (append) {
        duplicate(data);
        return;
      }

      const v = await swal({
        title: 'You are pasting a row to a another row.',
        text: 'Please choose an action.',
        buttons: {
          add: {
            text: 'Merge',
            value: 'add',
            className: 'btn-info'
          },
          replace: {
            text: 'Replace',
            value: 'replace',
            className: 'btn-warning'
          },
          append: {
            text: 'After',
            value: 'append',
            className: 'btn-dark'
          }
        }
      });

      switch (v) {
        case 'replace':
          content.value.columns = [];
        case 'add':
          data.columns.forEach((column) => {
            duplicateColumn(column, data.columns.length - 1);
          });
          break;
        case 'append':
          duplicate(data);
      }

      return;
    }
  } catch (e) {
    console.error(e);
    alert('Invalid format.');
  }
}

function duplicate(data?: any) {
  emits('duplicate', data);
}

function duplicateColumn(column: Column, i: number) {
  column = duplicateAny(column);

  content.value.columns.splice(i + 1, 0, column);
}

function handleDuplicateAddons<T extends Addon | Row>(addons: T[]): T[] {
  return addons.map((addon) => {
    const dup = duplicateAddon(addon, props.child);

    if (dup === null) {
      return null;
    }

    if (isAddon(dup)) {
      return dup;
    }

    // Is row
    dup.columns = dup.columns.map((column) => {
      column.id = 'col-' + uid();

      column.addons = handleDuplicateAddons(column.addons);

      return column;
    });

    return addon;
  })
    .filter(addon => addon !== null);
}

function edit() {
  u.trigger<RowEditEvent>('row:edit', content.value);
}

function toggleDisabled() {
  content.value.disabled = !content.value.disabled;
}

async function remove() {
  const v = await deleteConfirm('Are you sure you want to delete??');

  if (v) {
    emits('delete');
  }

  return v;
}

function getEmptyRow() {
  return emptyRow();
}

function deleteColumn(i: number) {
  columns.value.splice(i, 1);
}

function openTemplates() {
  u.trigger<TemplateOpenEvent>('tmpl.open', (item, type, i) => {
    pasteData(item.content);
  }, 'column,row', columns.value.length);
}

const columns = computed(() => {
  return content.value.columns;
});

const options = computed(() => {
  return content.value.options;
});

watch(() => columns, () => {
  emits('columns-change', { columns: columns.value });
}, { deep: true });

</script>

<template>
  <div class="bg-light p-2" :class="{ 'rounded': child}" :disabled="content.disabled ? true : null">
    <div class="page-row__title-bar d-flex mb-2">
      <div class="page-row__title d-flex">
        <div class="page-row__move-cursor">
          <span class="badge bg-secondary me-2" style="cursor: move">
            <span class="fa fa-fw fa-arrows-alt-v"
              :class="[moveHandle]"></span>
          </span>
        </div>
        <div :is="child ? 'strong' : 'h5'">
          {{ options.label === '' ? 'ROW' : options.label }}
        </div>

        <small v-if="$debug" class="ms-3">
          {{ content.id }}
        </small>
      </div>
      <div class="page-row__actions ml-auto ms-auto text-nowrap">
        <button type="button" class="btn btn-sm btn-primary"
          v-if="!content.disabled"
          @click="addNewColumn()">
          <span class="fa fa-plus"></span>
          <span v-if="!child">
            New Column
          </span>
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary"
          v-if="!content.disabled"
          @click="edit">
          <span class="fa fa-edit"></span>
          <span v-if="!child">
            Edit
          </span>
        </button>
        <div class="dropdown d-inline-block">
            <button href="#" class="btn btn-sm btn-outline-primary"
              data-toggle="dropdown"
              data-bs-toggle="dropdown"
            >
                <span class="fa fa-cog"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right dropdown-menu-end">
                <a class="dropdown-item" href="#" @click.prevent="toggleDisabled()">
                    <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                    {{ content.disabled ? 'Enabled' : 'Disabled' }}
                </a>
                <a class="dropdown-item" href="#" @click.prevent="duplicate()" v-if="!content.disabled">
                    <span class="fa fa-fw fa-clone"></span>
                    Duplicate
                </a>
                <a class="dropdown-item" href="#" @click.prevent="copy" v-if="!content.disabled">
                    <span class="fa fa-fw fa-copy"></span>
                    Copy
                </a>
                <a class="dropdown-item" href="#" @click.prevent="paste" v-if="!content.disabled">
                    <span class="fa fa-fw fa-paste"></span>
                    Paste
                </a>
                <a class="dropdown-item" href="#" @click.prevent="openTemplates" v-if="!content.disabled">
                    <span class="fa fa-fw fa-file-code"></span>
                    Insert Template
                </a>
                <a class="dropdown-item" href="#" @click.prevent="$trigger('tmpl.save', content, 'row')">
                  <span class="fa fa-fw fa-save"></span>
                  Save as Template
                </a>
                <a class="dropdown-item" href="#" @click.prevent="remove()">
                    <span class="fa fa-fw fa-trash"></span>
                    Delete
                </a>
            </div>
        </div>
      </div>
    </div>

    <div class="card">
      <VueDraggable class="card-body page-row__body row"
        :class="[{'p-2': child}, `justify-content-${options.justify_content}`]"
        v-model="content.columns"
        @start="drag = true"
        @end="drag = false"
        @add.stop
        v-bind="{handle: '.column-move-handle', group: 'column', animation: 300}"
        style="min-height: 50px;"
        item-key="id"
      >
        <template v-for="(column, i) of columns" :key="column.id">
          <ColumnBox class="page-row__column column mb-2"
            style="animation-duration: .3s"
            @delete="deleteColumn(i)"
            @duplicate="duplicateColumn($event || column, i)"
            :index="i"
            :value="column"
            :child="child">
          </ColumnBox>
        </template>

        <a v-if="columns.length === 0" class="page-row__body-placeholder text-center p-4 border text-secondary col-12"
          commented-v-if="addons.length === 0 && !drag"
          href="#"
          @click.prevent="addNewColumn()">
          <span class="fa fa-plus-square fa-3x"></span>
        </a>
      </VueDraggable>
    </div>

    <div class="page-row__bottom-toolbar mt-3 text-center">
      <div class="page-builder__bottom-toolbar text-center">
        <div class="btn-group">
          <button type="button" @click="$emit('add-new')"
            class="btn btn-sm btn-outline-secondary">
            Add New Row
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            data-bs-toggle="dropdown">
            <span class="visually-hidden sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-right">
            <button type="button" class="dropdown-item" @click="paste(true)">
              <span class="fa fa-fw fa-paste"></span>
              Paste
            </button>
            <button type="button" class="dropdown-item" v-if="!child" @click="$emit('open-templates')">
              <span class="fa fa-fw fa-file-code"></span>
              Insert Template
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
