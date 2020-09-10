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

        @debug
        <small class="ml-3">
          {{ content.id }}
        </small>
        @enddebug
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
                            <a class="dropdown-item" href="#" @click.prevent="copy()" v-if="!content.disabled">
                                <span class="fa fa-copy"></span>
                                複製
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
      <div is="draggable" class="card-body page-row__body row" :class="{'p-2': child}"
        v-model="content.columns" @start="drag = true" @end="drag = false"
        :options="{handle: '.column-move-handle', group: 'column' + (child ? '-child' : ''), animation: 300}"
        style="min-height: 50px;">
        <column v-for="(column, i) of columns" class="page-row__column column mb-2"
          @delete="deleteColumn(i)"
          @copy="copyColumn(column, i)"
          :index="i"
          :key="column.id"
          :value="column"
          :child="child">

        </column>

        <a class="page-row__body-placeholder text-center p-4 border text-secondary col-12"
          commented-v-if="addons.length === 0 && !drag"
          href="#" @click="addNewColumn()">
          <span class="fa fa-plus-square fa-3x"></span>
        </a>
      </div>
    </div>

    <div class="page-row__bottom-toolbar mt-3 text-center">
      <button type="button" class="btn btn-outline-secondary btn-sm"
        @click="$emit('add')">
        Add New Row
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'row',
  components: {
    column: Phoenix.data('component:column')
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
      underscore.each(this.getEmptyRow(), (v, k) => {
        Vue.set(this.content, k, v);
      });
    }
  },

  methods: {
    addNewColumn() {
      this.content.columns.push({foo: Phoenix.uniqid()});
    },

    copy() {
      this.$emit('copy');
    },

    copyColumn(column, i) {
      column = JSON.parse(JSON.stringify(column));

      column.id = 'col-' + Phoenix.uniqid();

      column.addons = this.handleCopyAddons(column.addons);

      this.columns.splice(i + 1, 0, column);
    },

    handleCopyAddons(addons) {
      return addons.map(addon => {
        if (addon.type !== 'row') {
          addon.id = 'addon-' + Phoenix.uniqid();
          return addon;
        }

        // Is row
        addon.id = 'row-' + Phoenix.uniqid();

        addon.columns = addon.columns.map(column => {
          column.id = 'col-' + Phoenix.uniqid();

          column.addons = this.handleCopyAddons(column.addons);

          return column;
        });

        return addon;
      });
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
      return {
        id: 'row-' + Phoenix.uniqid(),
        disabled: false,
        options: {
          label: '',
          title: {
            text: '',
            element: 'h3',
            font_size: {
              lg: '',
              md: '',
              xs: ''
            },
            font_weight: '',
            color: '',
            margin_top: {
              lg: '',
              md: '',
              xs: ''
            },
            margin_bottom: {
              lg: '',
              md: '',
              xs: ''
            }
          },
          subtitle: {
            text: '',
            font_size: {
              lg: '',
              md: '',
              xs: ''
            }
          },
          html_id: '',
          html_class: '',
          title_align: 'center',
          valign: 'top',
          fluid_row: false,
          no_gutter: false,
          padding: {
            lg: '',
            md: '',
            xs: ''
          },
          margin: {
            lg: '',
            md: '',
            xs: ''
          },
          display: {
            lg: 'd-lg-block',
            md: 'd-md-block',
            xs: 'd-block'
          },
          text_color: '',
          background: {
            type: 'none',
            color: '',
            overlay: '',
            image: {
              url: '',
              repeat: '',
              position: 'center center',
              attachment: 'inherit',
              size: 'cover'
            },
            gradient: {
              type: 'liner',
              angle: '',
              start_color: '',
              start_pos: '',
              end_color: '',
              end_pos: ''
            },
            video: {
              url: ''
            },
            parallax: false
          },
          animation: {
            name: '',
            duration: 300,
            delay: 0
          }
        },
        columns: [],
      };
    },

    deleteColumn(i) {
      this.columns.splice(i, 1);
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
