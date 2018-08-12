/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Phoenix.data('component:column', {
    name: 'row',
    template: '#column-component-tmpl',

    data() {
      return {
        addons: [],
        options: {}
      }
    },

    props: {
      content: Object
    },

    created() {
      this.addons = this.content.addons;
      this.options = this.content.options;
    },

    methods: {

    },

    watch: {

    },

    computed: {

    }
  });
});
