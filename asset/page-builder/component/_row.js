/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:row', {
    name: 'row',
    template: '#row-component-tmpl',
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
  });

  Vue.component('row', Phoenix.data('component:row'));
});
