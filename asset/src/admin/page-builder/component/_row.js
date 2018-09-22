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
        columns: [],
        options: {},
        drag: false
      }
    },

    props: {
      content: Object
    },

    created() {
      this.columns = this.content.columns || [];
      this.options = this.content.options || {};
    },

    methods: {
      addNewColumn() {
        this.columns.push(this.getEmptyColumn());
      },

      edit() {
        Phoenix.trigger('row:edit', this.content);
      },

      disable() {

      },

      remove() {
        this.$emit('delete');
      },

      getEmptyColumn() {
        return {
          id: 'col-' + Phoenix.uniqid(),
          addons: [],
          options: {
            html_class: '',
            align: 'center',
            valign: 'top',
            padding: {
              xs: '',
              md: '',
              lg: '',
            },
            margin: {
              xs: '',
              md: '',
              lg: '',
            },
            text_color: '',
            width: {
              xs: '',
              md: '',
              lg: 'col-lg-3',
            },
            display: {
              xs: 'd-block',
              md: 'd-md-block',
              lg: 'd-lg-block'
            },
            box_shadow: {
              enabled: 0,
              color: 'rgba(0, 0, 0, 1)',
              hoffset: 0,
              voffset: 0,
              blur: 0,
              spread: 0
            },
            border: {
              enabled: 0,
              width: {
                lg: 1,
                md: 1,
                xs: 1,
              },
              color: '',
              style: '',
              radius: {
                lg: 0,
                md: 0,
                xs: 0,
              }
            },
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

      getColumnWidth(columnOptions) {
        return underscore.values(columnOptions.width).join(' ');
      },

      deleteColumn(i) {
        this.columns.splice(i, 1);
      }
    },

    watch: {
      content: {
        handler(c) {
          console.log(c);
          this.options = this.content.options;
          this.columns = this.content.columns;
        },
        deep: true
      },
      columns: {
        handler() {
          this.$emit('columns-change', {columns: this.columns});
        },
        deep: true
      }
    },

    computed: {

    }
  });
});
