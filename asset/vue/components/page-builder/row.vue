<template>
  <div class="bg-light" :class="{'p-2': child, 'rounded': child}" :disabled="content.disabled">
    <div class="page-row__title-bar d-flex mb-2">
      <div class="page-row__title d-flex">
        <div class="page-row__move-cursor">
          <span class="badge badge-secondary mr-2" style="cursor: move">
            <span class="fa fa-fw fa-arrows-alt-v"
              :class="[moveHandle]"></span>
          </span>
        </div>
        <div :is="child ? 'strong' : 'h5'">
          {{ options.label === '' ? 'ROW' : options.label }}
        </div>

        <small v-if="$debug" class="ml-3">
          {{ content.id }}
        </small>
      </div>
      <div class="page-row__actions ml-auto text-nowrap">
        <button type="button" class="btn btn-sm btn-primary"
          v-if="!content.disabled"
          @click="addNewColumn()">
          <span class="fa fa-plus"></span>
          <span v-if="!child">
            新增欄
          </span>
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary"
          v-if="!content.disabled"
          @click="edit()">
          <span class="fa fa-edit"></span>
          <span v-if="!child">
            編輯
          </span>
        </button>
        <span class="dropdown">
            <button href="#" class="btn btn-sm btn-outline-secondary"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="fa fa-cog"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click.prevent="toggleDisabled()">
                    <span class="fa" :class="[content.disabled ? 'fa-eye' : 'fa-eye-slash']"></span>
                    {{ content.disabled ? '啟用' : '停用' }}
                </a>
                <a class="dropdown-item" href="#" @click.prevent="duplicate" v-if="!content.disabled">
                    <span class="fa fa-clone"></span>
                    複製一份
                </a>
                <a class="dropdown-item" href="#" @click.prevent="copy" v-if="!content.disabled">
                    <span class="fa fa-copy"></span>
                    複製內容
                </a>
                <a class="dropdown-item" href="#" @click.prevent="paste" v-if="!content.disabled">
                    <span class="fa fa-paste"></span>
                    貼上
                </a>
                <a class="dropdown-item" href="#" @click.prevent="openTemplates" v-if="!content.disabled">
                    <span class="fa fa-file-code"></span>
                    插入模版
                </a>
                <a class="dropdown-item" href="#" @click.prevent="remove()">
                    <span class="fa fa-trash"></span>
                    刪除
                </a>
            </div>
        </span>
      </div>
    </div>

    <div class="card">
      <div is="draggable" class="card-body page-row__body" :class="{'p-2': child}"
        v-model="content.columns" @start="drag = true" @end="drag = false"
        :options="{handle: '.column-move-handle', group: 'column' + (child ? '-child' : ''), animation: 300}"
        style="min-height: 50px;">
        <transition-group v-if="content.columns.length" name="fade" class="row" style="animation-duration: .3s">
          <column v-for="(column, i) of columns" class="page-row__column column mb-2"
            @delete="deleteColumn(i)"
            @duplicate="duplicateColumn($event || column, i)"
            :index="i"
            :key="column.id"
            :value="column"
            :child="child">

          </column>
        </transition-group>

        <a class="page-row__body-placeholder text-center p-4 border text-secondary col-12"
          commented-v-if="addons.length === 0 && !drag"
          href="#" @click.prevent="addNewColumn()">
          <span class="fa fa-plus-square fa-3x"></span>
        </a>
      </div>
    </div>

    <div class="page-row__bottom-toolbar mt-3 text-center">
      <div class="page-builder__bottom-toolbar text-center">
        <b-dropdown variant="outline-secondary" split size="sm" text="Add New Row"
          @click="$emit('add')">
          <b-dropdown-item @click="paste(true)">
            <span class="fa fa-fw fa-paste"></span>
            貼上
          </b-dropdown-item>
          <b-dropdown-item v-if="!child" @click="$emit('open-templates')">
            <span class="fa fa-fw fa-file-code"></span>
            插入模版
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyColumn, emptyRow } from '../../services/empty-data';
import PageBuilderService from '../../services/page-builder-services';
import Column from "./column";
import { each, startsWith } from 'lodash';

export default {
  name: 'row',
  components: {
    Column
  },

  data() {
    return {
      content: {},
      drag: false
    }
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

  created() {
    this.content = this.value;

    if (typeof this.content.id === 'undefined') {
      each(this.getEmptyRow(), (v, k) => {
        Vue.set(this.content, k, v);
      });
    }
  },

  methods: {
    addNewColumn() {
      this.content.columns.push(emptyColumn(this.child));
    },

    copy() {
      PageBuilderService.addToClipboard(this.content);
    },

    paste(append = false) {
      PageBuilderService.paste().then((text) => {
        this.pasteData(text, append);
      });
    },

    pasteData(text, append = false) {
      try {
        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          this.$emit('paste-page', data);
          return;
        }

        if (startsWith(data.id, 'addon-')) {
          alert('Addon 不能貼在這裡');
          return;
        }

        if (startsWith(data.id, 'col-')) {
          this.duplicateColumn(data, this.content.columns.length - 1);
          return;
        }

        if (startsWith(data.id, 'row-')) {
          if (append) {
            this.duplicate(data);
            return;
          }

          swal({
            title: '您貼上的是一個行區塊',
            text: '請選擇動作',
            buttons: {
              add: {
                text: '加上在後',
                value: 'add',
                className: 'btn-info'
              },
              replace: {
                text: '取代',
                value: 'replace',
                className: 'btn-warning'
              },
              append: {
                text: '貼到後方新的列',
                value: 'append',
                className: 'btn-dark'
              }
            }
          })
            .then((v) => {
              switch (v) {
                case 'replace':
                  this.content.columns = [];
                case 'add':
                  data.columns.forEach((column) => {
                    this.duplicateColumn(column, this.columns.length - 1);
                  });
                  break;
                case 'append':
                  this.duplicate(data);
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

    duplicateColumn(column, i) {
      column = JSON.parse(JSON.stringify(column));

      column.id = 'col-' + Phoenix.uniqid();

      column.addons = this.handleDuplicateAddons(column.addons);

      this.content.columns.splice(i + 1, 0, column);
    },

    handleDuplicateAddons(addons) {
      return addons.map(addon => {
        addon = PageBuilderService.duplicateAddon(addon, this.child);

        if (addon === null) {
          return null;
        }

        if (addon.type !== 'row') {
          return addon;
        }

        // Is row
        addon.columns = addon.columns.map(column => {
          column.id = 'col-' + Phoenix.uniqid();

          column.addons = this.handleDuplicateAddons(column.addons);

          return column;
        });

        return addon;
      })
        .filter(addon => addon !== null);
    },

    edit() {
      Phoenix.trigger('row:edit', this.content);
    },

    toggleDisabled() {
      this.content.disabled = !this.content.disabled;
    },

    remove() {
      Phoenix.confirm('確定要刪除嗎?')
        .then(() => this.$emit('delete'));
    },

    getEmptyRow() {
      return emptyRow();
    },

    deleteColumn(i) {
      this.columns.splice(i, 1);
    },

    openTemplates() {
      Phoenix.trigger('tmpl.open', (item, type, i) => {
        this.pasteData(item.content);
      }, 'column,row', this.columns.length);
    }
  },

  watch: {
    columns: {
      handler() {
        this.$emit('columns-change', {columns: this.columns});
      },
      deep: true
    }
  },

  computed: {
    columns() {
      return this.content.columns;
    },
    options() {
      return this.content.options;
    }
  }
};
</script>

<style scoped>

</style>
