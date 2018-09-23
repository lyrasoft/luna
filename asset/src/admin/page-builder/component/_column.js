/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:column', {
    name: 'column',
    template: '#column-component-tmpl',
    components: {
      addon: Phoenix.data('component:addon'),
    },

    data() {
      return {
        content: {},
        drag: false
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

      if (typeof this.content.id === 'undefined') {
        underscore.each(this.getEmptyColumn(), (v, k) => {
          Vue.set(this.content, k, v);
        });
      }
    },

    methods: {
      edit() {
        Phoenix.trigger('column:edit', this.content);
      },

      toggleDisabled() {
        this.content.disabled = !this.content.disabled;
      },

      remove() {
        Phoenix.confirm('確定要刪除嗎?')
          .then(() => this.$emit('delete'));
      },

      copyAddon(item, i) {
        const newItem = JSON.parse(JSON.stringify(item));

        newItem.id = Phoenix.uniqid();

        this.addons.splice(i, 0, newItem);
      },

      addAddon() {
        Phoenix.trigger('addon:add', this.content);
      },

      addNewRow() {
        this.content.addons.push({ type: 'row' });
      },

      deleteAddon(i) {
        this.addons.splice(i, 1);
      },

      getEmptyColumn() {
        return {
          id: 'col-' + Phoenix.uniqid(),
          disabled: false,
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
              lg: this.child ? 'col-lg-6' : 'col-lg-3',
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
              video: ''
            },
            animation: {
              name: '',
              duration: 300,
              delay: 0
            }
          }
        };
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
        return underscore.values(this.options.width).join(' ');
      }
    }
  });
});
