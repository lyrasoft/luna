<script lang="ts" setup>
import { simpleAlert, simpleConfirm, useUnicorn } from '@windwalker-io/unicorn-next';
import { defaultsDeep, range, values } from 'lodash-es';
import { computed, ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { usePageBuilderUtilities } from '~luna/services/page-builder/usePageBuilderUtilities';
import { Addon, Column, ColumnEditEvent, Row, TemplateOpenEvent } from '~luna/types';
import AddonBox from './AddonBox.vue';
import RowBox from './RowBox.vue';

const props = withDefaults(
  defineProps<{
    value: Column,
    index: number,
    child?: boolean
  }>(),
  {
    child: false
  }
);

const {
  addTextToClipboard,
  duplicateAddon,
  duplicateAny,
  emptyColumn,
  emptyRow,
  readClipboard,
  isAddon,
  isRow,
  isColumn,
} = usePageBuilderUtilities();

const emit = defineEmits();

const u = useUnicorn();
const content = ref<Column>(props.value);
const drag = ref(false);
const widthMenuOpen = ref(false);

content.value = defaultsDeep(content.value, emptyColumn());

function edit() {
  u.trigger<ColumnEditEvent>('column:edit', content.value);
}

async function paste() {
  const text = await readClipboard();

  pasteData(text);
}

function closeWidthMenu() {
  widthMenuOpen.value = false;
}

async function pasteData(text: string): Promise<void> {
  try {
    const data: Row | Column | Addon = JSON.parse(text);

    if (!data.id) {
      throw new Error('Invalid format');
    }

    if (isAddon(data) || isRow(data)) {
      duplicateThisAddon(data, content.value.addons.length - 1);
      return;
    }

    if (isColumn(data)) {
      let v = await swal({
        title: 'You are pasting a column to another column...',
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
          content.value.addons = [];
        case 'add':
          data.addons.forEach((addon) => {
            duplicateThisAddon(addon, addons.value.length - 1);
          });
          break;
        case 'append':
          duplicate(content.value);
      }

      return;
    }
  } catch (e) {
    console.error(e);
    simpleAlert('Invalid format.');
  }
}

function duplicate(data?: any) {
  emit('duplicate', data);
}

function copy() {
  addTextToClipboard(content.value);
}

function toggleDisabled() {
  content.value.disabled = !content.value.disabled;
}

async function remove() {
  const v = await simpleConfirm('Are you sure you want to delete??');

  if (v) {
    emit('delete');
  }

  return v;
}

function duplicateThisAddon(item: Addon, i: number) {
  const newItem = duplicateAny(item, props.child);

  if (newItem) {
    addons.value.splice(i + 1, 0, newItem);
  }
}

function addAddon() {
  u.trigger('addon:add', content.value);
}

function addNewRow() {
  const row = emptyRow();
  row.type = 'row';
  content.value.addons.push(row);
}

function deleteAddon(i) {
  addons.value.splice(i, 1);
}

function widthRange() {
  return range(1, 13); // 1 to 12 in array
}

function getEmptyColumn() {
  return emptyColumn(props.child);
}

function openTemplates() {
  u.trigger<TemplateOpenEvent>('tmpl.open', (item, type, i) => {
    pasteData(item.content);
  }, 'column,addon', addons.value.length);
}

const addons = computed(() => {
  return content.value.addons;
});

const options = computed(() => {
  return content.value.options;
});

const width = computed(() => {
  return values(options.value.width).join(' ');
});

watch(() => props.value, () => {
  content.value = props.value;
}, { deep: true });

</script>

<template>
  <div class="" :class="width" :disabled="content.disabled ? true : null">
    <div class="card bg-light column__body">
      <!-- Body -->
      <div class="card-body p-2">
        <!-- Top Bar -->
        <div class="column__top-bar d-flex mb-2" :class="{'p-2': child}">
          <div class="column__title mb-2 d-flex align-items-center">
            <div class="column__move">
              <div class="badge bg-secondary column-move-handle me-2" style="cursor: move">
                <span class="fa fa-fw fa-arrows-alt"></span>
              </div>
            </div>
            <h6 class="m-0">COL</h6>
            <code v-if="$debug">{{ content.id }}</code>
          </div>

          <!-- Actions Buttons -->
          <div class="column__actions ml-auto ms-auto text-nowrap">
            <button type="button" class="btn btn-sm px-2 py-0 btn-primary"
              v-if="!content.disabled"
              v-tooltip

              title="New Addon"
              @click="addAddon()">
              <span class="fa fa-plus"></span>
              <!--            <span v-if="!child">-->
              <!--              Addon-->
              <!--            </span>-->
            </button>

            <button type="button" class="btn btn-sm px-2 py-0 btn-outline-secondary"
              @click="edit()"
              v-tooltip
              title="Edit Column"
              v-if="!content.disabled">
              <span class="fa fa-edit"></span>
            </button>

            <div class="dropdown d-inline-block">
              <button type="button" href="#" class="btn btn-sm px-2 py-0 btn-outline-secondary"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
              >
                <span class="fa fa-arrows-alt-h"></span>
              </button>

              <div class="dropdown-menu dropdown-menu-right dropdown-menu-end px-3" :class="widthMenuOpen">
                <div class="form-group mb-3">
                  <label :for="`input-column-edit-width-desktop--${content.id}`" class="d-block">
                    Desktop Width
                  </label>
                  <select :id="`input-column-edit-width-desktop--${content.id}`"
                    @click.stop=""
                    v-model="content.options.width.lg" class="form-select custom-select">
                    <option v-for="w of widthRange()" :value="'col-lg-' + w">
                      col-lg-{{ w }}
                    </option>
                  </select>
                </div>

                <!-- Tablet Layout -->
                <div class="form-group mb-3">
                  <label :for="`input-column-edit-width-tablet--${content.id}`" class="d-block">
                    Tablet Width
                  </label>
                  <select :id="`input-column-edit-width-tablet--${content.id}`"
                    @click.stop=""
                    v-model="content.options.width.md" class="form-select custom-select">
                    <option value="">- None -</option>
                    <option v-for="w of widthRange()" :value="'col-md-' + w">
                      col-md-{{ w }}
                    </option>
                  </select>
                </div>

                <!-- Mobile Layout -->
                <div class="form-group mb-3">
                  <label :for="`input-column-edit-width-mobile--${content.id}`" class="d-block">
                    Mobile Width
                  </label>
                  <select :id="`input-column-edit-width-mobile--${content.id}`"
                    @click.stop=""
                    v-model="content.options.width.xs" class="form-select custom-select">
                    <option value="">- None -</option>
                    <option v-for="w of widthRange()" :value="'col-' + w">
                      col-{{ w }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Topbar Dropdown -->
            <div class="d-inline-block dropdown">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm px-2 py-0"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
              >
                <span class="fa fa-cog"></span>
              </button>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-right">
                <button type="button" class="dropdown-item" @click="duplicate()"
                  v-if="!content.disabled">
                  <span class="fa fa-fw fa-clone"></span>
                  Duplicate
                </button>
                <button type="button" class="dropdown-item" @click="copy()"
                  v-if="!content.disabled">
                  <span class="fa fa-fw fa-copy"></span>
                  Copy
                </button>
                <button type="button" class="dropdown-item" @click="paste()"
                  v-if="!content.disabled">
                  <span class="fa fa-fw fa-paste"></span>
                  Paste
                </button>
                <button type="button" class="dropdown-item" @click="toggleDisabled()">
                  <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                  {{ content.disabled ? 'Enabled' : 'Disabled' }}
                </button>
                <button type="button" class="dropdown-item" @click="addNewRow()"
                  v-if="!content.disabled && !child">
                  <span class="fa fa-fw fa-plus"></span>
                  New Row
                </button>
                <button type="button" class="dropdown-item" @click="openTemplates" v-if="!content.disabled">
                  <span class="fa fa-fw fa-file-code"></span>
                  Insert Template
                </button>
                <button type="button" class="dropdown-item" @click="$trigger('tmpl.save', content, 'column')">
                  <span class="fa fa-fw fa-save"></span>
                  Save as Template
                </button>
                <button type="button" class="dropdown-item" @click="remove()">
                  <span class="fa fa-fw fa-trash"></span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <VueDraggable v-model="content.addons" @start="drag = true" @end="drag = false"
          @add.stop
          v-bind="{handle: '.move-handle', group: 'addon', animation: 300}"
          style="min-height: 50px;"
          class="column__draggable"
          item-key="id"
        >
          <template v-for="(addon, i) in content.addons" :key="addon.id">
            <div class="column__addon mb-2"
              style="animation-duration: .3s">
              <AddonBox v-if="addon.type !== 'row'"
                @delete="deleteAddon(i)"
                @duplicate="duplicateThisAddon(addon, i)"
                :index="i"
                :content="addon"
                :column="content"></AddonBox>
              <RowBox v-else
                :index="i"
                :value="addon"
                :child="true"
                @duplicate="duplicateThisAddon(addon, i)"
                move-handle="move-handle"
                comment-columns-change="columnsChange(addon, $event)"
                @delete="deleteAddon(i)"
                @add-new="addNewRow"
              ></RowBox>
            </div>
          </template>

          <template #footer>
            <a v-if="addons.length === 0"
              class="column__addon-placeholder text-center p-3 border text-secondary bg-white d-block"
              style="text-decoration: none;"
              href="#" @click.prevent="addAddon()">
              <span class="fa fa-plus-circle fa-3x d-inline-block"></span>
            </a>
          </template>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
