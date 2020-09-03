/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.trigger('page-builder.before-create');

  const PageBuilder = new Vue({
    el: '#page-builder',
    data: {
      content: Phoenix.data('builder-content') || [],
      drag: false,
      editing: {
        column: {},
        row: {},
        addon: {}
      }
    },
    components: {
      'row': Phoenix.data('component:row'),
      'row-edit': Phoenix.data('component:row-edit'),
      'column': Phoenix.data('component:column'),
      'column-edit': Phoenix.data('component:column-edit'),
      'addon': Phoenix.data('component:addon'),
      'addon-edit': Phoenix.data('component:addon-edit'),
    },
    created() {
      Phoenix.trigger('page-builder.created', this);
    },
    mounted() {
      Phoenix.on('row:edit', (content, column) => {
        this.editing.row = content;
        this.editing.column = content;
        this.$refs.rowEdit.edit(content);
      });

      Phoenix.on('row:save', content => {
        underscore.each(content, (v, k) => {
          this.editing.row[k] = v;
        });

        this.editing.column = {};
        this.editing.row = {};
      });

      Phoenix.on('column:edit', content => {
        this.editing.column = content;
        this.$refs.columnEdit.edit(content);
      });

      Phoenix.on('column:save', content => {
        underscore.each(content, (v, k) => {
          this.editing.column[k] = v;
        });

        this.editing.column = {};
      });

      Phoenix.on('addon:add', (column) => {
        this.editing.column = column;

        $(this.$refs.addonList).modal('show');
      });

      Phoenix.on('addon:edit', (addon, column) => {
        this.editing.addon = addon;
        this.editing.column = column;

        this.$refs.addonEdit.edit(addon);
      });

      Phoenix.on('addon:save', (addon) => {
        if (this.editing.column.addons.filter(item => item.id === addon.id).length === 0) {
          this.editing.column.addons.push(addon);
        }

        underscore.each(addon, (v, k) => {
          this.editing.addon[k] = v;
        });

        this.editing.column = {};
        this.editing.addon = {};
      });

      Phoenix.trigger('page-builder.mounted', this);
    },
    methods: {
      addNewRow(i = null) {
        if (i != null) {
          this.content.splice(i + 1, 0, {});
        } else {
          this.content.push({});
        }
      },
      deleteRow(i) {
        this.content.splice(i, 1);
      },
      copyRow(row, i) {
        row = JSON.parse(JSON.stringify(row));

        row.id = 'row-' + Phoenix.uniqid();

        row.columns = this.handleCopyColumns(row.columns);

        this.content.splice(i + 1, 0, row);
      },
      handleCopyColumns(columns) {
        return columns.map(column => {
          column.id = 'col-' + Phoenix.uniqid();

          column.addons = this.handleCopyAddons(column.addons);

          return column;
        });
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

      columnsChange(row, $event) {
        row.columns = $event.columns;
      },
      selectAddon(type) {
        $(this.$refs.addonList).modal('hide');
        
        const addonData = Phoenix.data('addons')[type];

        setTimeout(() => {
          Phoenix.trigger('addon:edit', { ...addonData, id: 'addon-' + Phoenix.uniqid(), is: 'addon' }, this.editing.column);
          $('body').addClass('modal-open');
        }, 365);
      },
      getEmptyRow() {
        return {
          id: 'row-' + Phoenix.uniqid(),
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
              xl: '',
              md: '',
              xs: ''
            },
            margin: {
              xl: '',
              md: '',
              xs: ''
            },
            display: {
              xs: 'd-block',
              md: 'd-md-block',
              lg: 'd-lg-block'
            },
            text_color: '',
            background: {
              type: 'none',
              color: '',
              image: {
                url: '',
                overlay: '',
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
                url: '',
                overlay: ''
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
      getSaveValue() {
        return JSON.stringify(this.content);
      }
    },
    watch: {

    },
    computed: {
    }
  });
});
