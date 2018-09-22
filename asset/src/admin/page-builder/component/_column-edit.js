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
        Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

        this.values = {};

        $(this.$refs.modal).modal('hide');
      },

      close() {
        this.values = {};

        $(this.$refs.modal).modal('hide');
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
