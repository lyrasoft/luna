/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:addon-edit', {
    name: 'addon-edit',

    data() {
      return {
        values: {},
        sticky: false
      }
    },

    props: {
    },

    created() {
    },

    methods: {
      edit(data) {
        const editData = JSON.parse(JSON.stringify(data));

        if (typeof editData.options === 'undefined') {
          Vue.set(editData, 'options', this.getAddonBasicOptions());
        }

        if (typeof editData.disabled === 'undefined') {
          Vue.set(editData, 'disabled', false);
        }

        this.values = editData;

        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');

        this.sticky = true;
      },

      save() {
        Phoenix.trigger('addon:save', JSON.parse(JSON.stringify(this.values)));

        this.values = {};

        this.sticky = false;

        $(this.$refs.modal).modal('hide');
      },

      close() {
        $(this.$refs.modal).modal('hide');

        setTimeout(() => {
          this.values = {};
        }, 300);

        this.sticky = false;
      },

      getAddonBasicOptions() {
        return {
          html_class: '',
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
          align: '',
          // valign: 'top',
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
          custom_css: '',
          text_color: '',
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
        };
      }
    },

    watch: {

    },

    computed: {
      options() {
        return this.values.options;
      }
    }
  });
});
