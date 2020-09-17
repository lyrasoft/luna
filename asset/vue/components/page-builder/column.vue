<template>
  <div class="" :class="width" :disabled="content.disabled">
    <div class="card column__body">
      <div class="column__top-bar d-flex card-header" :class="{'p-2': child}">
        <div class="column__title mb-2 d-flex align-items-center">
          <div class="column__move">
            <div class="badge badge-secondary column-move-handle mr-2" style="cursor: move">
              <span class="fa fa-fw fa-arrows-alt"></span>
            </div>
          </div>
          <h6 class="m-0">COL</h6>
          <code v-if="$debug">{{ content.id }}</code>
        </div>

        <div class="column__actions ml-auto text-nowrap">
          <button type="button" class="btn btn-mini btn-primary"
            v-if="!content.disabled"
            @click="addAddon()">
            <span class="fa fa-plus"></span>
            <span v-if="!child">
              Addon
            </span>
          </button>

          <div class="dropdown d-inline-block" :class="widthMenuOpen">
            <button type="button" href="#" class="btn btn-mini btn-outline-secondary"
              @click="widthMenuOpen = widthMenuOpen === 'show' ? '' : 'show'">
              <span class="fa fa-arrows-alt-h"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right px-3" :class="widthMenuOpen">
              <div class="form-group">
                <label for="input-column-edit-width-desktop">桌面版寬度 Desktop</label>
                <select id="input-column-edit-width-desktop"
                  v-model="content.options.width.lg" class="form-control">
                  <option v-for="w of widthRange()" :value="'col-lg-' + w">
                    col-lg-{{ w }}
                  </option>
                </select>
              </div>

              <!-- Tablet Layout -->
              <div class="form-group">
                <label for="input-column-edit-width-tablet">平板寬度 Tablet</label>
                <select id="input-column-edit-width-tablet"
                  v-model="content.options.width.md" class="form-control">
                  <option value="">- 不設定 -</option>
                  <option v-for="w of widthRange()" :value="'col-md-' + w">
                    col-md-{{ w }}
                  </option>
                </select>
              </div>

              <!-- Mobile Layout -->
              <div class="form-group">
                <label for="input-column-edit-width-mobile">手機寬度 Mobile</label>
                <select id="input-column-edit-width-mobile"
                  v-model="content.options.width.xs" class="form-control">
                  <option value="">- 不設定 -</option>
                  <option v-for="w of widthRange()" :value="'col-' + w">
                    col-{{ w }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="dropdown d-inline-block">
            <button type="button" class="btn btn-mini btn-outline-secondary"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="fa fa-cog"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" @click.prevent="edit()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-edit"></span>
                編輯
              </a>
              <a class="dropdown-item" href="#" @click.prevent="duplicate()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-clone"></span>
                複製一份
              </a>
              <a class="dropdown-item" href="#" @click.prevent="copy()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-copy"></span>
                複製內容
              </a>
              <a class="dropdown-item" href="#" @click.prevent="paste()"
                v-if="!content.disabled">
                <span class="fa fa-fw fa-paste"></span>
                貼上
              </a>
              <a class="dropdown-item" href="#" @click.prevent="toggleDisabled()">
                <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                {{ content.disabled ? '啟用' : '停用' }}
              </a>
              <a class="dropdown-item" href="#" @click.prevent="addNewRow()"
                v-if="!content.disabled && !child">
                <span class="fa fa-fw fa-plus"></span>
                新增列
              </a>
              <a class="dropdown-item" href="#" @click.prevent="openTemplates" v-if="!content.disabled">
                <span class="fa fa-fw fa-file-code"></span>
                插入模版
              </a>
              <a class="dropdown-item" href="#" @click.prevent="$trigger('tmpl.save', content, 'column')">
                <span class="fa fa-fw fa-save"></span>
                儲存為模版
              </a>
              <a class="dropdown-item" href="#" @click.prevent="remove()">
                <span class="fa fa-fw fa-trash"></span>
                刪除
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body p-2">
        <draggable v-model="content.addons" @start="drag = true" @end="drag = false"
          v-bind="{handle: '.move-handle', group: 'addon', animation: 300}"
          style="min-height: 50px;" class="column__draggable">
<!--          <transition-group v-if="addons.length" name="fade">-->
            <div class="column__addon" v-for="(addon, i) of addons" :key="addon.id"
              style="animation-duration: .3s">
              <addon v-if="addon.type !== 'row'"
                @delete="deleteAddon(i)"
                @duplicate="duplicateAddon(addon, i)"
                :index="i"
                :key="addon.id"
                :content="addon"
                :column="content"></addon>
              <row v-else
                :index="i"
                :key="addon.id"
                :value="addon"
                :child="true"
                @duplicate="duplicateAddon(addon, i)"
                move-handle="move-handle"
                comment-columns-change="columnsChange(addon, $event)"
                @delete="deleteAddon(i)"
              ></row>
            </div>
<!--          </transition-group>-->

          <a class="column__addon-placeholder text-center p-3 border text-secondary"
            comment-v-if="addons.length === 0 && !drag"
            href="#" @click.prevent="addAddon()">
            <span class="fa fa-plus-circle fa-3x"></span>
          </a>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { each, range, startsWith, values, defaultsDeep } from 'lodash';
import { emptyColumn, emptyRow } from '../../services/empty-data';
import PageBuilderService from '../../services/page-builder-services';
import Addon from "./addon";

export default {
  name: 'column',
  components: {
    Addon
  },

  data() {
    return {
      content: {},
      drag: false,
      widthMenuOpen: ''
    }
  },

  props: {
    value: Object,
    index: Number,
    child: {
      type: Boolean,
      default: false
    }
  },

  created() {
    this.content = this.value;

    this.content = defaultsDeep(this.content, emptyColumn());

    if (typeof this.content.id === 'undefined') {
      each(this.getEmptyColumn(), (v, k) => {
        Vue.set(this.content, k, v);
      });
    }
  },

  methods: {
    edit() {
      Phoenix.trigger('column:edit', this.content);
    },

    paste() {
      PageBuilderService.paste().then((text) => {
        this.pasteData(text);
      });
    },

    pasteData(text) {
      try {
        const data = JSON.parse(text);

        if (!data.id) {
          throw new Error('Invalid format');
        }

        if (startsWith(data.id, 'addon-') || startsWith(data.id, 'row-')) {
          this.duplicateAddon(data, this.content.addons.length - 1);
          return;
        }

        if (startsWith(data.id, 'col-')) {
          swal({
            title: '您在一個欄位貼上另一個欄位',
            text: '請選擇動作',
            buttons: {
              add: {
                text: '貼上內容',
                value: 'add',
                className: 'btn-info'
              },
              replace: {
                text: '取代內容',
                value: 'replace',
                className: 'btn-warning'
              },
              append: {
                text: '貼到後方新的欄',
                value: 'append',
                className: 'btn-dark'
              }
            }
          })
            .then((v) => {
              switch (v) {
                case 'replace':
                  this.content.addons = [];
                case 'add':
                  data.addons.forEach((addon) => {
                    this.duplicateAddon(addon, this.addons.length - 1);
                  });
                  break;
                case 'append':
                  this.duplicate(this.content);
              }
            });
          return;
        }
      } catch (e) {
        console.error(e);
        alert('不是正確的格式');
      }
    },

    duplicate(data = null) {
      this.$emit('duplicate', data);
    },

    copy() {
      PageBuilderService.addToClipboard(this.content);
    },

    toggleDisabled() {
      this.content.disabled = !this.content.disabled;
    },

    remove() {
      Phoenix.confirm('確定要刪除嗎?')
        .then(() => this.$emit('delete'));
    },

    duplicateAddon(item, i) {
      const newItem = PageBuilderService.duplicateAddon(item, this.child);

      if (newItem) {
        this.addons.splice(i + 1, 0, newItem);
      }
    },

    addAddon() {
      Phoenix.trigger('addon:add', this.content);
    },

    addNewRow() {
      const row = emptyRow();
      row.type = 'row';
      this.content.addons.push(row);
    },

    deleteAddon(i) {
      this.addons.splice(i, 1);
    },

    widthRange() {
      return range(1, 13); // 1 to 12 in array
    },

    getEmptyColumn() {
      return emptyColumn(this.child);
    },

    openTemplates() {
      Phoenix.trigger('tmpl.open', (item, type, i) => {
        this.pasteData(item.content);
      }, 'column,addon', this.addons.length);
    }
  },

  watch: {
  },

  computed: {
    addons() {
      return this.content.addons;
    },
    options() {
      return this.content.options;
    },
    width() {
      return values(this.options.width).join(' ');
    }
  }
};
</script>

<style scoped>

</style>
