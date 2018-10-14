/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:row-edit', {
    name: 'row-edit',

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
        Phoenix.trigger('row:save', JSON.parse(JSON.stringify(this.values)));

        $(this.$refs.modal).modal('hide');

        this.sticky = false;
      },

      close() {
        $(this.$refs.modal).modal('hide');

        this.sticky = false;

        setTimeout(() => {
          this.values = {};
        }, 300);
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
