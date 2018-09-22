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
        values: {}
      }
    },

    props: {
      content: Object
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
        Phoenix.trigger('row:save', JSON.parse(JSON.stringify(this.values)));

        this.values = {};

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
