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
      this.columns = this.content.columns;
      this.options = this.content.options;
    },

    methods: {
      addNewColumn() {
        this.columns.push(this.getEmptyColumn());
      },

      getEmptyColumn() {
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
              lg: 'col-lg-3',
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

      getColumnWidth(columnOptions) {
        return underscore.values(columnOptions.width).join(' ');
      }
    },

    watch: {
      // content() {
      //   this.options = this.content.options;
      //   this.columns = this.content.columns;
      // },
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
