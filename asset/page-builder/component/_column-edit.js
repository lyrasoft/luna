/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:column-edit', {
    name: 'column-edit',

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
        this.values = JSON.parse(JSON.stringify(data));

        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');

        this.sticky = true;
      },

      save() {
        Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

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

      widthRange() {
        return underscore.range(1, 13); // 1 to 12 in array
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
