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

    data() {
      return {
        addons: [],
        options: {}
      }
    },

    props: {
      content: Object,
      index: Number
    },

    created() {
      this.addons = this.content.addons;
      this.options = this.content.options;
    },

    methods: {
      edit() {
        Phoenix.trigger('column:edit', this.content);
      },

      disable() {

      },

      remove() {
        this.$emit('delete');
      }
    },

    watch: {
      content: {
        handler() {
          this.addons = this.content.addons;
          this.options = this.content.options;
        },
        deep: true
      }
    },

    computed: {

    }
  });
});
