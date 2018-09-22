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
        values: {}
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
      },

      save() {
        $(this.$refs.modal).modal('hide');
      },

      close() {
        this.values = {};

        $(this.$refs.modal).modal('hide');
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
