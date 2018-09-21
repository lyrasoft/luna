'use strict';

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:column-edit', {
    name: 'column-edit',

    data: function data() {
      return {
        values: {}
      };
    },


    props: {},

    created: function created() {},


    methods: {
      edit: function edit(data) {
        this.values = JSON.parse(JSON.stringify(data));

        $(this.$refs.modal).modal('show');
      },
      save: function save() {
        $(this.$refs.modal).modal('hide');
      },
      close: function close() {
        this.value = {};
      }
    },

    watch: {},

    computed: {}
  });
});

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:column', {
    name: 'column',
    template: '#column-component-tmpl',

    data: function data() {
      return {
        addons: [],
        options: {}
      };
    },


    props: {
      content: Object
    },

    created: function created() {
      this.addons = this.content.addons;
      this.options = this.content.options;
    },


    methods: {
      edit: function edit() {
        Phoenix.trigger('column:edit', this.content);
      },
      disable: function disable() {},
      remove: function remove() {}
    },

    watch: {},

    computed: {}
  });
});

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:row', {
    name: 'row',
    template: '#row-component-tmpl',
    components: {
      column: Phoenix.data('component:column')
    },

    data: function data() {
      return {
        columns: [],
        options: {},
        drag: false
      };
    },


    props: {
      content: Object
    },

    created: function created() {
      this.columns = this.content.columns;
      this.options = this.content.options;
    },


    methods: {
      addNewColumn: function addNewColumn() {
        this.columns.push(this.getEmptyColumn());
      },
      getEmptyColumn: function getEmptyColumn() {
        return {
          id: 'col-' + Phoenix.uniqid(),
          addons: [],
          options: {
            html_class: '',
            align: 'center',
            valign: 'top',
            padding: '0',
            margin: '0',
            text_color: '',
            width: {
              xs: 'col-3',
              md: 'col-md-3',
              lg: 'col-lg-3'
            },
            box_shadow: {
              color: '',
              hoffset: '',
              voffset: '',
              blur: '',
              spread: ''
            },
            border: {
              width: '',
              color: '',
              style: '',
              radius: ''
            },
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
          }
        };
      },
      getColumnWidth: function getColumnWidth(columnOptions) {
        return underscore.values(columnOptions.width).join(' ');
      }
    },

    watch: {
      // content() {
      //   this.options = this.content.options;
      //   this.columns = this.content.columns;
      // },
      columns: {
        handler: function handler() {
          this.$emit('columns-change', { columns: this.columns });
        },

        deep: true
      }
    },

    computed: {}
  });
});

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  var PageBuilder = new Vue({
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
    mounted: function mounted() {
      var _this = this;

      Phoenix.on('column:edit', function (content) {
        _this.$refs.columnEdit.edit(content);
      });
    },

    methods: {
      addNewRow: function addNewRow() {
        this.content.push(this.getEmptyRow());
      },
      columnsChange: function columnsChange(row, $event) {
        row.columns = $event.columns;
      },
      getEmptyRow: function getEmptyRow() {
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
          columns: []
        };
      },
      getSaveValue: function getSaveValue() {
        return JSON.stringify(this.content);
      }
    },
    watch: {},
    computed: {}
  });
});
//# sourceMappingURL=page-builder.js.map
