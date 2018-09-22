/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  const PageBuilder = new Vue({
    el: '#page-builder',
    data: {
      content: Phoenix.data('builder-content') || [],
      drag: false,
      editing: {
        column: {},
        row: {}
      }
    },
    components: {
      'row': Phoenix.data('component:row'),
      'row-edit': Phoenix.data('component:row-edit'),
      'column': Phoenix.data('component:column'),
      'column-edit': Phoenix.data('component:column-edit')
    },
    mounted() {
      Phoenix.on('row:edit', content => {
        this.editing.row = content;
        this.$refs.rowEdit.edit(content);
      });

      Phoenix.on('row:save', content => {
        underscore.each(content, (v, k) => {
          this.editing.row[k] = v;
        });

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
    },
    methods: {
      addNewRow() {
        this.content.push(this.getEmptyRow());
      },
      deleteRow(i) {
        this.content.splice(i, 1);
      },
      columnsChange(row, $event) {
        row.columns = $event.columns;
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
