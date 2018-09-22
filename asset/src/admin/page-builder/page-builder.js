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
      drag: false
    },
    components: {
      'row': Phoenix.data('component:row'),
      'column': Phoenix.data('component:column'),
      'column-edit': Phoenix.data('component:column-edit')
    },
    mounted() {
      Phoenix.on('column:edit', content => {
        this.$refs.columnEdit.edit(content);
      });
    },
    methods: {
      addNewRow() {
        this.content.push(this.getEmptyRow());
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
              margin: ''
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
            align: 'center',
            valign: 'top',
            fluid_row: false,
            no_gutter: false,
            padding: '100px 0 100px 0',
            margin: '0',
            text_color: '',
            background: {
              color: '',
              image: '',
              gradient: '',
              video: ''
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
