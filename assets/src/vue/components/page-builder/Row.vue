<template>
  <div class="bg-light" :class="{'p-2': child, 'rounded': child}" :disabled="content.disabled ? true : null">
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
        <span class="dropdown">
            <button href="#" class="btn btn-sm btn-outline-primary"
              data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="fa fa-cog"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
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
        </span>
      </div>
    </div>

    <div class="card">
      <draggable class="card-body page-row__body row"
        :class="[{'p-2': child}, `justify-content-${options.justify_content}`]"
        v-model="content.columns"
        @start="drag = true"
        @end="drag = false"
        @add.stop
        v-bind="{handle: '.column-move-handle', group: 'column', animation: 300}"
        style="min-height: 50px;"
        item-key="id"
      >
        <template #item="{ element: column, index: i }">
          <Column class="page-row__column column mb-2"
            style="animation-duration: .3s"
            @delete="deleteColumn(i)"
            @duplicate="duplicateColumn($event || column, i)"
            :index="i"
            :value="column"
            :child="child">cssed

          </Column>
        </template>

        <template #footer>
          <a class="page-row__body-placeholder text-center p-4 border text-secondary col-12"
            commented-v-if="addons.length === 0 && !drag"
            href="#" @click.prevent="addNewColumn()">
            <span class="fa fa-plus-square fa-3x"></span>
          </a>
        </template>
      </draggable>
    </div>

    <div class="page-row__bottom-toolbar mt-3 text-center">
      <div class="page-builder__bottom-toolbar text-center">
        <CDropdown>
          <button type="button" @click="$emit('add')"
            class="btn btn-sm btn-outline-secondary">
            Add New Row
          </button>
          <CDropdownToggle size="sm" split color="secondary" variant="outline"></CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="paste(true)">
              <span class="fa fa-fw fa-paste"></span>
              Paste
            </CDropdownItem>
            <CDropdownItem v-if="!child" @click="$emit('open-templates')">
              <span class="fa fa-fw fa-file-code"></span>
              Insert Template
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/vue';
import { defaultsDeep, startsWith } from 'lodash-es';
import { computed, reactive, toRefs, watch } from 'vue';
import draggable from 'vuedraggable';
import {
  addTextToClipboard,
  emptyColumn,
  emptyRow,
  readClipboard,
  duplicateAddon
} from '../../services/page-builder/page-builder.service';

export default {
  name: 'Row',
  components: {
    // Column,
    draggable,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu,
  },

  props: {
    value: Object,
    child: {
      type: Boolean,
      default: false
    },
    moveHandle: {
      type: String,
      default: 'move-handle'
    }
  },

  setup(props, { emit }) {
    const state = reactive({
      content: {},
      drag: false,
    });

    state.content = props.value;
    state.content = defaultsDeep(state.content, emptyRow());

    function addNewColumn() {
      state.content.columns.push(emptyColumn(props.child));
    }

    function copy() {
      addTextToClipboard(state.content);
    }

    function paste(append = false) {
      readClipboard().then((text) => {
        pasteData(text, append);
      });
    }

    function pasteData(text, append = false) {
      try {
        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          emit('paste-page', data);
          return;
        }

        if (startsWith(data.id, 'addon-')) {
          alert('Unable to paste addon here.');
          return;
        }

        if (startsWith(data.id, 'col-')) {
          duplicateColumn(data, state.content.columns.length - 1);
          return;
        }

        if (startsWith(data.id, 'row-')) {
          if (append) {
            duplicate(data);
            return;
          }

          swal({
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
          })
            .then((v) => {
              switch (v) {
                case 'replace':
                  state.content.columns = [];
                case 'add':
                  data.columns.forEach((column) => {
                    duplicateColumn(column, state.columns.length - 1);
                  });
                  break;
                case 'append':
                  duplicate(data);
              }
            });
          return;
        }
      } catch (e) {
        console.error(e);
        alert('Invalid format.');
      }
    }

    function duplicate(data = null) {
      emit('duplicate', data);
    }

    function duplicateColumn(column, i) {
      column = JSON.parse(JSON.stringify(column));

      column.id = 'col-' + u.uid();

      column.addons = handleDuplicateAddons(column.addons);

      state.content.columns.splice(i + 1, 0, column);
    }

    function handleDuplicateAddons(addons) {
      return addons.map(addon => {
          addon = duplicateAddon(addon, props.child);

          if (addon === null) {
            return null;
          }

          if (addon.type !== 'row') {
            return addon;
          }

          // Is row
          addon.columns = addon.columns.map(column => {
            column.id = 'col-' + u.uid();

            column.addons = handleDuplicateAddons(column.addons);

            return column;
          });

          return addon;
        })
        .filter(addon => addon !== null);
    }

    function edit() {
      u.trigger('row:edit', state.content);
    }

    function toggleDisabled() {
      state.content.disabled = !state.content.disabled;
    }

    function remove() {
      u.confirm('Are you sure you want to delete??')
        .then(() => emit('delete'));
    }

    function getEmptyRow() {
      return emptyRow();
    }

    function deleteColumn(i) {
      columns.value.splice(i, 1);
    }

    function openTemplates() {
      u.trigger('tmpl.open', (item, type, i) => {
        pasteData(item.content);
      }, 'column,row', columns.value.length);
    }

    const columns = computed(() => {
      return state.content.columns;
    });

    const options = computed(() => {
      return state.content.options;
    });

    watch(() => columns, () => {
      emit('columns-change', { columns: columns.value });
    }, { deep: true });

    return {
      ...toRefs(state),
      columns,
      options,

      addNewColumn,
      copy,
      paste,
      pasteData,
      duplicate,
      duplicateColumn,
      handleDuplicateAddons,
      edit,
      toggleDisabled,
      remove,
      getEmptyRow,
      deleteColumn,
      openTemplates
    };
  },
};
</script>

<style scoped>

</style>
