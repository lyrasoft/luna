<template>
  <div class="" :class="width" :disabled="content.disabled ? true : null">
    <div class="card column__body">
      <!-- Top Bar -->
      <div class="column__top-bar d-flex card-header" :class="{'p-2': child}">
        <div class="column__title mb-2 d-flex align-items-center">
          <div class="column__move">
            <div class="badge badge-secondary column-move-handle mr-2 me-2" style="cursor: move">
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
            v-c-tooltip="'New Addon'"
            @click="addAddon()">
            <span class="fa fa-plus"></span>
            <!--            <span v-if="!child">-->
            <!--              Addon-->
            <!--            </span>-->
          </button>

          <button type="button" class="btn btn-sm px-2 py-0 btn-outline-secondary"
            @click="edit()"
            v-c-tooltip="'Edit Column'"
            title="Edit Column"
            v-if="!content.disabled">
            <span class="fa fa-edit"></span>
          </button>

          <div class="dropdown d-inline-block" :class="widthMenuOpen"
            v-click-away="closeWidthMenu">
            <button type="button" href="#" class="btn btn-sm px-2 py-0 btn-outline-secondary"
              v-c-tooltip="'Width'"
              title="Width"
              @click="widthMenuOpen = widthMenuOpen === 'show' ? '' : 'show'"
            >
              <span class="fa fa-arrows-alt-h"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right px-3" :class="widthMenuOpen"
            >
              <div class="form-group mb-3">
                <label :for="`input-column-edit-width-desktop--${content.id}`">Desktop Width</label>
                <select :id="`input-column-edit-width-desktop--${content.id}`"
                  v-model="content.options.width.lg" class="form-select custom-select">
                  <option v-for="w of widthRange()" :value="'col-lg-' + w">
                    col-lg-{{ w }}
                  </option>
                </select>
              </div>

              <!-- Tablet Layout -->
              <div class="form-group mb-3">
                <label :for="`input-column-edit-width-tablet--${content.id}`">Tablet Width</label>
                <select :id="`input-column-edit-width-tablet--${content.id}`"
                  v-model="content.options.width.md" class="form-select custom-select">
                  <option value="">- None -</option>
                  <option v-for="w of widthRange()" :value="'col-md-' + w">
                    col-md-{{ w }}
                  </option>
                </select>
              </div>

              <!-- Mobile Layout -->
              <div class="form-group mb-3">
                <label :for="`input-column-edit-width-mobile--${content.id}`">Mobile Width</label>
                <select :id="`input-column-edit-width-mobile--${content.id}`"
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
          <CDropdown class="d-inline-block">
            <CDropdownToggle
              class="d-inline-block px-2 py-0"
              color="secondary"
              variant="outline"
              size="sm"
              v-c-tooltip="'Manage'"
            >
              <span class="fa fa-cog"></span>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem @click="duplicate()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-clone"></span>
                Clone
              </CDropdownItem>
              <CDropdownItem @click="copy()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-copy"></span>
                Copy
              </CDropdownItem>
              <CDropdownItem @click="paste()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-paste"></span>
                Paste
              </CDropdownItem>
              <CDropdownItem @click="toggleDisabled()">
                <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                {{ content.disabled ? 'Enabled' : 'Disabled' }}
              </CDropdownItem>
              <CDropdownItem @click="addNewRow()"
                v-if="!content.disabled && !child">
                <span class="fa fa-fw fa-plus"></span>
                New Row
              </CDropdownItem>
              <CDropdownItem @click="openTemplates" v-if="!content.disabled">
                <span class="fa fa-fw fa-file-code"></span>
                Insert Template
              </CDropdownItem>
              <CDropdownItem @click="$trigger('tmpl.save', content, 'column')">
                <span class="fa fa-fw fa-save"></span>
                Save as Template
              </CDropdownItem>
              <CDropdownItem @click="remove()">
                <span class="fa fa-fw fa-trash"></span>
                Delete
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>

      <!-- Body -->
      <div class="card-body p-2">
        <draggable v-model="content.addons" @start="drag = true" @end="drag = false"
          v-bind="{handle: '.move-handle', group: 'addon', animation: 300}"
          style="min-height: 50px;"
          class="column__draggable"
          item-key="id"
        >
          <template #item="{ element: addon, index: i }">
            <div class="column__addon mb-2"
              style="animation-duration: .3s">
              <Addon v-if="addon.type !== 'row'"
                @delete="deleteAddon(i)"
                @duplicate="duplicateThisAddon(addon, i)"
                :index="i"
                :key="addon.id"
                :content="addon"
                :column="content"></Addon>
              <Row v-else
                :index="i"
                :key="addon.id"
                :value="addon"
                :child="true"
                @duplicate="duplicateThisAddon(addon, i)"
                move-handle="move-handle"
                comment-columns-change="columnsChange(addon, $event)"
                @delete="deleteAddon(i)"
              ></Row>
            </div>
          </template>

          <template #footer>
            <a v-if="addons.length === 0"
              class="column__addon-placeholder text-center p-3 border text-secondary d-block"
              style="text-decoration: none;"
              href="#" @click.prevent="addAddon()">
              <span class="fa fa-plus-circle fa-3x d-inline-block"></span>
            </a>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, vctooltip } from '@coreui/vue';
import { defaultsDeep, range, startsWith, values } from 'lodash-es';
import { computed, reactive, toRefs, watch } from 'vue';
import draggable from 'vuedraggable';
import {
  addTextToClipboard,
  duplicateAddon,
  emptyColumn,
  emptyRow,
  readClipboard
} from '../../services/page-builder/page-builder.service';
import Addon from './Addon';
import Row from './Row';

export default {
  name: 'Column',
  components: {
    Row,
    Addon,
    draggable,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu,
  },
  directives: {
    'c-tooltip': vctooltip
  },

  props: {
    value: Object,
    index: Number,
    child: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const state = reactive({
      content: {},
      drag: false,
      widthMenuOpen: '',
    });

    state.content = props.value;

    state.content = defaultsDeep(state.content, emptyColumn());

    function edit() {
      u.trigger('column:edit', state.content);
    }

    function paste() {
      readClipboard().then((text) => {
        pasteData(text);
      });
    }

    function closeWidthMenu() {
      state.widthMenuOpen = false;
    }

    function pasteData(text) {
      try {
        const data = JSON.parse(text);

        if (!data.id) {
          throw new Error('Invalid format');
        }

        if (startsWith(data.id, 'addon-') || startsWith(data.id, 'row-')) {
          duplicateThisAddon(data, state.content.addons.length - 1);
          return;
        }

        if (startsWith(data.id, 'col-')) {
          swal({
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
          })
            .then((v) => {
              switch (v) {
                case 'replace':
                  state.content.addons = [];
                case 'add':
                  data.addons.forEach((addon) => {
                    duplicateThisAddon(addon, addons.value.length - 1);
                  });
                  break;
                case 'append':
                  duplicate(state.content);
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

    function copy() {
      addTextToClipboard(state.content);
    }

    function toggleDisabled() {
      state.content.disabled = !state.content.disabled;
    }

    function remove() {
      u.confirm('Are you sure you want to delete?')
        .then(() => emit('delete'));
    }

    function duplicateThisAddon(item, i) {
      const newItem = duplicateAddon(item, props.child);

      if (newItem) {
        addons.value.splice(i + 1, 0, newItem);
      }
    }

    function addAddon() {
      u.trigger('addon:add', state.content);
    }

    function addNewRow() {
      const row = emptyRow();
      row.type = 'row';
      state.content.addons.push(row);
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
      u.trigger('tmpl.open', (item, type, i) => {
        pasteData(item.content);
      }, 'column,addon', addons.value.length);
    }

    const addons = computed(() => {
      return state.content.addons;
    });

    const options = computed(() => {
      return state.content.options;
    });

    const width = computed(() => {
      return values(options.value.width).join(' ');
    });

    watch(() => props.value, () => {
      state.content = props.value;
    }, { deep: true });

    return {
      ...toRefs(state),
      addons,
      options,
      width,

      edit,
      paste,
      closeWidthMenu,
      pasteData,
      duplicate,
      copy,
      toggleDisabled,
      remove,
      duplicateThisAddon,
      addAddon,
      addNewRow,
      deleteAddon,
      widthRange,
      getEmptyColumn,
      openTemplates,
    };
  },

  methods: {},

  watch: {},

  computed: {}
};
</script>

<style scoped>

</style>
